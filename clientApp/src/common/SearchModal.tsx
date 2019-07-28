import * as React from 'react'
import { MouseEventHandler } from 'react'
import { Table } from './Table'
// import * as $ from 'jquery'
// Importing bootstrap here... causes issues...
// import 'bootstrap'

interface ISearchModalProps {
  table: string
  handleSelectKey: MouseEventHandler
  title: string
}

export function SearchModal(props: ISearchModalProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // @ts-ignore
    jQuery('#' + props.table + '_search_modal').modal('hide')
    props.handleSelectKey(e)
  }
  return (
    <>
      <div
        className='modal modal-xl fade'
        tabIndex={-1}
        role='dialog'
        id={props.table + '_search_modal'}
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{props.title || 'Search'}</h5>
              <button
                type='button'
                id={props.table + '_search_modal_close'}
                className='close'
                data-dismiss='modal'
                aria-label='close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col'>
                  <Table
                    table={props.table + '_list'}
                    onSelectKey={handleClick}
                    hideActions={true}
                    showSearch={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
