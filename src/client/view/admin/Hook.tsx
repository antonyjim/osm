import * as React from 'react'
import { Field, Reference } from '../common/FormControls'
import { TowelRecord } from '../lib/API'
// import Monaco from '../common/Monaco'
const Monaco = React.lazy(() => import('./../common/Monaco'))
// import * as monaco from 'monaco-editor'

export function Hook(props: { id: string }) {
  const [hookInfo, setHookInfo] = React.useState({
    hook: '',
    hook_table: '',
    sys_id: props.id,
    table: 'sys_db_hook',
    description: '',
    hook_table_display: '',
    code: `#!/bin/env/node
/**
 * Script hook for {HOOK GOES HERE} on table {TABLE NAME GOES HERE}
 * 
 * The Towel API should provide everything that is needed to verify any fields.
 * Documentation can be found at /public/docs/Towel.md
 * 
 * Please follow best practices when coding, making sure to use JSDOC comments
 * whenever possible. JSDOC documentation can be found at https://devdocs.io/jsdoc/
 * 
 * NOTE: This script will run in an isolated environment. You cannot call on any
 * standard node modules or NPM modules. This script will be called using the Function()
 * constructor and will be passed the folowing 2 parameters:
 * 
 * @param {string} sysId The ID of the record being modified
 * @param {object} incomingFields The fields that are in the request body (if applicable)
 * 
 * If this function throws any errors, the request will be aborted and returned to the client
 * with an error 500 response. This function should return an object with the following keys:
 * 
 * @returns {status: string, confirmedFields: object, warnings: object | object[]}
 */
var Towel = require('./../towel')

module.exports = function(sysId, action, incomingFields) {
  this.status = 'OK'
  this.confirmedFields = {...incomingFields}
  this.warnings = []

  // Do stuff

  return this
}
`
  })

  const getData = () => {
    new TowelRecord(hookInfo.table)
      .get({
        fields: 'hook_table,hook,code,description,sys_id,hook_table_display',
        id: hookInfo.sys_id
      })
      .then((res: any) => {
        if (res && res.data && res.data[hookInfo.table]) {
          const state = { ...hookInfo }
          for (const field in res.data[hookInfo.table]) {
            if (field === 'code') {
              window.monaco.editor
                .getModels()[0]
                .setValue(res.data[hookInfo.table][field])
              state[field] = res.data[hookInfo.table][field]
            }
          }
          setHookInfo(state)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let TowelQuery
    if (props.id === 'new') {
      TowelQuery = new TowelRecord('sys_db_hook').create(
        {
          description: hookInfo.description,
          hook_table: hookInfo.hook_table,
          hook: hookInfo.hook,
          code: getEditorValue()
        },
        'hook_table,hook,code,description,sys_id'
      )
    } else {
      TowelQuery = new TowelRecord('sys_db_hook').update(props.id, {
        description: hookInfo.description,
        hook_table: hookInfo.hook_table,
        hook: hookInfo.hook,
        code: getEditorValue()
      })
    }
    TowelQuery.then((res) => {
      if (res.okay()) {
        console.log('Created or updated')
      }
    }).catch((err) => {
      console.error(err)
    })
  }

  if (props.id !== 'new') getData()

  const getEditorValue = () => {
    return window.monaco.editor.getModels()[0].getValue()
  }

  return (
    <form className='row'>
      <div className='col' />
      <div className='col-lg-10 col-md-8 mt-4'>
        <button
          className='btn btn-primary float-right'
          onClick={handleSubmit.bind(this)}
        >
          Save
        </button>
        <h4>Hook</h4>
        <hr />
        <div className='row'>
          <Field
            id='description'
            type='text'
            name='description'
            onChange={handleChange.bind(this)}
            value={hookInfo.description}
            className='col-lg-6 col-md-12'
            label='Description'
          />
          <Reference
            id='hook_table'
            name='hook_table'
            label='Table'
            value={hookInfo.hook_table}
            display={hookInfo.hook_table_display}
            onChange={handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='text'
            references='sys_db_object'
          />
          <Field
            id='hook'
            name='hook'
            type='text'
            onChange={handleChange.bind(this)}
            value={hookInfo.hook}
            className='col-lg-6 col-md-12'
            label='Hook'
          />
          <Monaco value={hookInfo.code} />
        </div>
      </div>
      <div className='col' />
    </form>
  )
}
