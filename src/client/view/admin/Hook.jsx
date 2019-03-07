import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js'
import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js'
import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js'
import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js'
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js'
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js'
import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js'
import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'
import React, { Component, useState } from 'react'

import { Field } from '../common/forms.jsx'
import { TowelRecord } from '../lib/API.js'

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    return '/public/scripts/bundles/ts.worker.bundle.js'
  }
}

export default class Hook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hook: '',
      hook_table: '',
      sys_id: props.id,
      table: 'sys_db_hook'
    }

    if (props.id !== 'new') this.getData()
  }

  getData() {
    new TowelRecord(this.state.table)
      .get({
        fields: 'hook_table,hook,code,description,sys_id,hook_table_display',
        id: this.state.sys_id
      })
      .then((res) => {
        if (res && res.data && res.data[this.state.table]) {
          let state = { ...this.state }
          for (let field in res.data[this.state.table]) {
            if (field === 'code') {
              monaco.editor
                .getModels()[0]
                .setValue(res.data[this.state.table][field])
            }
            state[field] = res.data[this.state.table][field]
          }
          this.setState(state)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  handleChange(e) {
    let state = { ...this.state }
    state[e.target.name] = e.target.value

    console.log(state)
    this.setState(state)
  }

  handleSubmit(e) {
    e.preventDefault()
    let TowelQuery
    if (this.props.id === 'new') {
      TowelQuery = new TowelRecord('sys_db_hook').create(
        {
          description: this.state.description,
          hook_table: this.state.hook_table,
          hook: this.state.hook,
          code: monaco.editor.getModels()[0].getValue()
        },
        'hook_table,hook,code,description,sys_id'
      )
    } else {
      TowelQuery = new TowelRecord('sys_db_hook').update(this.props.id, {
        description: this.state.description,
        hook_table: this.state.hook_table,
        hook: this.state.hook,
        code: monaco.editor.getModels()[0].getValue()
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

  componentDidMount() {
    monaco.editor.create(document.getElementById('monaco'), {
      value: `#!/bin/env/node
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
`,
      language: 'javascript',
      theme: 'vs-dark'
    })

    monaco.editor.EndOfLinePreference = 'LF'
  }

  componentWillUnmount() {
    monaco.editor.getModels()[0].dispose()
  }

  render() {
    return (
      <form className='row'>
        <div className='col' />
        <div className='col-lg-10 col-md-8 mt-4'>
          <button
            className='btn btn-primary float-right'
            onClick={this.handleSubmit.bind(this)}
          >
            Save
          </button>
          <h4>Hook</h4>
          <hr />
          <div className='row'>
            <Field
              id='description'
              onChange={this.handleChange.bind(this)}
              value={this.state.description}
              className='col-lg-6 col-md-12'
              label='Description'
            />
            <Field
              id='hook_table'
              name='hook_table'
              label='Table'
              value={this.state.hook_table}
              display={this.state.hook_table_display}
              onChange={this.handleChange.bind(this)}
              setValue={this.setFormFields}
              className='col-lg-6 col-md-12'
              type='text'
              references='sys_db_object'
            />
            <Field
              id='hook'
              onChange={this.handleChange.bind(this)}
              value={this.state.hook}
              className='col-lg-6 col-md-12'
              label='Hook'
            />
            <div
              id='monaco'
              style={{
                width: '100%',
                height: '600px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        </div>
        <div className='col' />
      </form>
    )
  }
}
