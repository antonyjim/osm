import * as React from 'react'
import { MouseEventHandler, ChangeEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox } from '../FormControls'
import { generateKeyHash } from '../../lib/util'

interface ITableRowProps {
  showSelect?: boolean
  cells: any
  id: string
  onSelectKey?: MouseEventHandler
  cols: any
  permissions?: any
  handleInlineUpdate: ChangeEventHandler
}

export function TableRow(props: ITableRowProps) {
  function handleValReturn(e) {
    e.preventDefault()
  }

  const cells: JSX.Element[] = []
  if (props.showSelect) {
    cells.push(
      <td key={Math.floor(Math.random() * 10000)} className='align-middle'>
        <input
          className='position-static'
          type='checkbox'
          value={props.cells && props.cells[props.id]}
        />
      </td>
    )
  }
  Object.keys(props.cols).map((col) => {
    if (col === props.id) return false
    const thisCol = props.cols[col]
    const val = props.cells[col]
    const type = thisCol.type
    if (thisCol.reference || thisCol.display) {
      if (props.onSelectKey && thisCol.display) {
        cells.push(
          <td key={generateKeyHash()} tabIndex={0}>
            <div className='data-table-text-cell'>
              <a
                href='#'
                data-key={props.cells[props.id]}
                onClick={props.onSelectKey}
                className='align-middle'
              >
                {val || ''}
              </a>
            </div>
          </td>
        )
      } else if (props.onSelectKey && thisCol.reference) {
        cells.push(
          <td key={generateKeyHash()} className='align-middle' tabIndex={0}>
            {val || ''}
          </td>
        )
      } else if (thisCol.display) {
        cells.push(
          <td key={generateKeyHash()} tabIndex={0}>
            <div className='data-table-text-cell'>
              <Link
                to={`/f/${thisCol.display}/${props.cells[props.id] || '#'}`}
                className='align-middle'
              >
                {val || ''}
              </Link>
            </div>
          </td>
        )
      } else {
        const refCol = props.cols[col]
        const refTable = refCol ? refCol.refTable : '#'
        cells.push(
          <td key={generateKeyHash()} tabIndex={0}>
            <div className='data-table-text-cell'>
              <Link
                to={`/f/${refTable}/${val || '#'}`}
                title={props.cols[col].label}
                className='align-middle'
              >
                {props.cells[col + '_display'] || ''}
              </Link>
            </div>
          </td>
        )
      }
    } else if (type && type.toLowerCase() === 'date') {
      cells.push(
        <td key={generateKeyHash()} className='align-middle' tabIndex={0}>
          <div className='data-table-text-cell'>
            {new Date(val).toDateString() || ''}
          </div>
        </td>
      )
    } else if (type && type.toLowerCase() === 'boolean') {
      if (props.permissions && props.permissions.edit) {
        cells.push(
          <td
            key={generateKeyHash()}
            style={{ textAlign: 'center' }}
            tabIndex={0}
          >
            <Checkbox
              id={col + props.cells[props.id]}
              name={col}
              value={props.cells[props.id]}
              onChange={props.handleInlineUpdate}
              title={props.cols[col].label}
              label=''
              checked={val === true || val === 1}
            />
          </td>
        )
      } else {
        cells.push(
          <td
            key={generateKeyHash()}
            style={{ textAlign: 'center' }}
            className='align-middle'
            tabIndex={0}
          >
            <div className='data-table-text-cell'>
              {val === true || (val === 1 && '×') || ''}
            </div>
          </td>
        )
      }
    } else {
      cells.push(
        <td key={generateKeyHash()} className='align-middle' tabIndex={0}>
          <div className='data-table-text-cell'>
            {typeof val === 'string' ? val : ''}
          </div>
        </td>
      )
    }
  })
  return <tr>{cells}</tr>
}
