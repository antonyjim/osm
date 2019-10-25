import * as React from 'react'
import { MouseEventHandler } from 'react'
import { Table } from './Table'
import { generateKeyHash } from '../lib/util'
// import * as $ from 'jquery'
// Importing bootstrap here... causes issues...
// import 'bootstrap'

interface ISearchModalProps {
  table: string
  handleSelectKey: MouseEventHandler
  title: string
  id?: string
  onClose: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export function SearchModal(props: ISearchModalProps) {
  const id: string = props.id + '_search_modal' || generateKeyHash()
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // @ts-ignore
    jQuery(`#${id}`).modal('hide')
    props.handleSelectKey(e)
  }

  React.useEffect((): void => {
    /*
      Show the modal after it is rendered
    */
    // @ts-ignore
    jQuery(`#${id}`).modal('show')
  }, [])

  return (
    <>
      <div className='modal modal-xl fade' tabIndex={-1} role='dialog' id={id}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{props.title || 'Search'}</h5>
              <button
                type='button'
                id={id + '_search_modal_close'}
                className='close'
                data-dismiss='modal'
                aria-label='close'
                onClick={props.onClose}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col'>
                  <Table
                    table={props.table + '_list'}
                    selectReference={handleClick}
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
