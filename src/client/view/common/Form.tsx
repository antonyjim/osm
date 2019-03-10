import * as React from 'react'
import { Component } from 'react'
import API, { TowelRecord } from '../lib/API'
// import Customer from '../admin/Customer'
import UserProfile from '../home/UserProfile'
import Column from '../admin/Column'
import { TableModifier } from '../admin/TableMaint'
// import Authorization from '../admin/Authorization'
import { Checkbox, Field } from './FormControls'
import Pills from './PillLayout'
const Hook = React.lazy(() => import('../admin/Hook'))

const specialForms = {
  //   sys_customer: Customer,
  sys_user: UserProfile,
  sys_db_dictionary: Column,
  sys_db_object: TableModifier,
  //   sys_authorization: Authorization,
  sys_db_hook: Hook
}

export default class Form extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      fields: { ...props.values },
      title: props.title,
      table: props.match.params.table,
      id: props.match.params.id,
      loaded: specialForms[props.match.params.table] ? true : false,
      modifiedFields: []
    }
  }

  private fetchFormDetails() {
    API.get({
      path: `/api/describe/form/${this.state.table}`
    })
      .then((res: any) => {
        if (res && res.tabs) {
          if (this.state.id !== 'new' && res.tabs[0].fields) {
            const fields = []
            for (const fieldToFetch of res.tabs[0].fields) {
              fields.push(fieldToFetch.name)
            }
            new TowelRecord(this.state.table)
              .get({ fields, id: this.state.id })
              .then((fetchedFields: any) => {
                this.setState({
                  fields: fetchedFields.data[this.state.table],
                  form: res,
                  loaded: true
                })
              })
              .catch((err) => {
                this.setState({ form: res, loaded: true })
                console.error(err)
              })
          } else {
            this.setState({ form: res, loaded: true })
          }
        }
      })
      .catch((err) => {
        this.setState({ error: err, loaded: true })
      })
  }

  private formControlFromJson(jsonData) {
    switch (jsonData.type) {
      case 'string': {
        return {
          component: Field,
          props: {
            label: jsonData.label,
            id: jsonData.name,
            onChange: this.handleChange.bind(this),
            value: this.state.fields[jsonData.name],
            className: 'col-lg-6 col-md-12'
          }
        }
      }
      case 'boolean': {
        return {
          component: Checkbox,
          props: {
            label: jsonData.label,
            id: jsonData.name,
            onChange: this.handleChange.bind(this),
            value: this.state[jsonData.name],
            checked: this.state.fields[jsonData.name],
            className: 'col-lg-6 col-md-12'
          }
        }
      }
      default: {
        return (
          <Field
            label={jsonData.label}
            id={jsonData.name}
            name={jsonData.name}
            type='text'
            onChange={this.handleChange.bind(this)}
            value={this.state.fields[jsonData.name]}
          />
        )
      }
    }
  }

  private handleChange(e) {
    const oldState = { ...this.state }
    oldState.fields[e.target.id] = e.target.value
    if (e.target.type === 'checkbox') {
      oldState.fields[e.target.id] = e.target.checked
    }
    if (!oldState.modifiedFields.includes(e.target.id)) {
      oldState.modifiedFields.push(e.target.id)
    }
    oldState.saveDisabled = {}
    this.setState(oldState)
  }

  private handleSubmit(e) {
    if (this.props.sys_id === 'new') {
      new TowelRecord(this.state.table).create({ body: this.state.fields })
    } else {
      const body = { sys_id: this.state.sys_id }
      this.state.modifiedFields.forEach((field) => {
        body[field] = this.state.fields[field]
      })
      new TowelRecord(this.state.table)
        .update(this.state.sys_id, body)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          this.props.handleErrorMessage(err)
        })
    }
  }

  private createNew(e) {
    API.post({
      path: `${API.TABLE}${this.state.table}`,
      query: {
        fields: this.props.fields.join(',')
      },
      body: this.state.fields
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.match.params.table !== this.props.match.params.table) {
      console.log('Updated forms')
      this.render()
    }
  }

  public componentDidMount() {
    if (!specialForms[this.state.table]) {
      this.fetchFormDetails()
    }
  }

  public render() {
    if (specialForms[this.state.table]) {
      const ThisForm = specialForms[this.state.table]
      return <ThisForm id={this.state.id} />
    }
    if (!this.state.loaded) return null
    if (!this.state.form || !this.state.form.tabs) {
      throw new Error('No fields provided for form ' + this.state.table)
    }
    const displayFields = []
    const pills = {}
    for (const tab of this.state.form.tabs) {
      /* If the tab has a fields property, map out the form control boxes */
      const name = tab.name
      if (tab.fields) {
        pills[name] = {
          id: name,
          label: name
        }
        tab.fields.map((field, i) => {
          if (tab.fields[i].name === tab.primaryKey) {
            return displayFields.push(
              <input
                type='hidden'
                id={tab.primaryKey}
                value={this.state.fields[tab.primaryKey]}
                onChange={this.handleChange.bind(this)}
                key={`form-field-${tab.primaryKey}`}
              />
            )
          }
          const thisField: any = this.formControlFromJson(tab.fields[i])
          const FormField = thisField.component
          const theseProps = thisField.props
          displayFields.push(
            <FormField
              {...theseProps}
              key={`form-field-${thisField.props.id}`}
            />
          )
        })

        pills[name].body = (
          <>
            <button
              className='btn btn-primary float-right'
              onClick={this.handleSubmit.bind(this)}
            >
              Save
            </button>
            <h4>{tab.title || 'General Information'}</h4>
            <hr />
            <form className='form-row' name='generalInformation'>
              {displayFields}
            </form>
          </>
        )
      } else if (tab.table) {
        // Render table
      }
    }
    return (
      <>
        <Pills pills={pills} />
      </>
    )
  }
}
