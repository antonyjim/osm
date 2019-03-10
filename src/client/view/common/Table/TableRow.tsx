import * as React from 'react'
import { MouseEventHandler, ChangeEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox } from '../FormControls'

interface ITableRowProps {
  showSelect?: boolean
  cells: any
  id: string
  onSelectKey?: MouseEventHandler
  cols: any
  permissions?: any
  handleInlineUpdate?: ChangeEventHandler
}

export function TableRow(props: ITableRowProps) {
  function handleValReturn(e) {
    e.preventDefault()
  }

  const cells = []
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
          <td key={Math.floor(Math.random() * 1000000)}>
            <a
              href='#'
              data-key={props.cells[props.id]}
              onClick={props.onSelectKey}
              className='align-middle'
            >
              {val || ''}
            </a>
          </td>
        )
      } else if (props.onSelectKey && thisCol.reference) {
        cells.push(
          <td
            key={Math.floor(Math.random() * 1000000)}
            className='align-middle'
          >
            {val || ''}
          </td>
        )
      } else if (thisCol.display) {
        cells.push(
          <td key={Math.floor(Math.random() * 1000000)}>
            <Link
              to={`/f/${thisCol.display}/${props.cells[props.id] || '#'}`}
              className='align-middle'
            >
              {val || ''}
            </Link>
          </td>
        )
      } else {
        const refCol = props.cols[col + '_display']
        const refTab = refCol ? refCol.tableRef : '#'
        cells.push(
          <td key={Math.floor(Math.random() * 1000000)}>
            <Link
              to={`/f/${refTab}/${val || '#'}`}
              title={props.cols[col].label}
              className='align-middle'
            >
              {props.cells[col + '_display'] || ''}
            </Link>
          </td>
        )
      }
    } else if (type && type.toLowerCase() === 'date') {
      cells.push(
        <td
          key={'table-data-' + ~~(Math.random() * 100000)}
          className='align-middle'
        >
          {new Date(val).toDateString() || ''}
        </td>
      )
    } else if (type && type.toLowerCase() === 'boolean') {
      if (props.permissions && props.permissions.edit) {
        cells.push(
          <td
            key={'table-data-' + ~~(Math.random() * 100000)}
            style={{ textAlign: 'center' }}
          >
            <Checkbox
              id={col + ~~(Math.random() * 100000)}
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
            key={'table-data-' + ~~(Math.random() * 100000)}
            style={{ textAlign: 'center' }}
            className='align-middle'
          >
            {val === true || (val === 1 && '×') || ''}
          </td>
        )
      }
    } else {
      cells.push(
        <td
          key={'table-data-' + ~~(Math.random() * 100000)}
          className='align-middle'
        >
          {typeof val === 'string' ? val : ''}
        </td>
      )
    }
  })
  return <tr>{cells}</tr>
}
