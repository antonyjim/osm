import { IDictionary } from '@osm/server'
import { TowelTypes } from '../types/towel'
import { replaceStringOperator } from './builder/evalOperator'

/**
 *
 * @param { Object } argObj Object representing query argument
 */
function fromObject(argObj: IDictionary<TowelTypes.QueryValueTypes>) {
  const columnKeys = Object.keys(argObj)
  columnKeys.forEach((columnKey: string) => {
    const match = /(\[.?.\])/.exec(columnKey)
    let operator: {
      operator: string
      value: TowelTypes.QueryValueTypes
      not: boolean
    }

    if (match) {
      operator = {
        ...replaceStringOperator(match[0].replace(/[\[\]\s]/g, '')),
        value: argObj[columnKey]
      }
    } else {
      operator = {
        operator: '=',
        not: false,
        value: argObj[columnKey]
      }
    }
  })
}

// Transform arguments into standard sql
export default function parseArgs(
  args:
    | IDictionary<TowelTypes.QueryValueTypes>
    | IDictionary<TowelTypes.QueryValueTypes>[]
) {}
