import { QueryValueTypes } from '../../Towel'

/**
 * Allow operators to be used with graphql queries in the format {field: "operator|value"}
 * @param fields Object containing field operators
 */
export function evaluateFieldOperator(
  field: QueryValueTypes,
  operator?: string
): { operator: string; value: QueryValueTypes; not: boolean } {
  if (!field) return null
  if (operator) {
    switch (operator.toLowerCase()) {
      case '=':
      case 'eq': {
        return {
          operator: '=',
          value: field,
          not: false
        }
      }
      case '<':
      case 'lt': {
        return {
          operator: '<',
          value: field,
          not: false
        }
      }
      case '>':
      case 'gt': {
        return {
          operator: '>',
          value: field,
          not: false
        }
      }
      case '<=':
      case 'lte': {
        return {
          operator: '<=',
          value: field,
          not: false
        }
      }
      case '>=':
      case 'gte': {
        return {
          operator: '>=',
          value: field,
          not: false
        }
      }
      case 'like':
      case 'lk': {
        return {
          operator: 'LIKE',
          value: `%${field}%`, // op[1].replace('*', '%')
          not: false
        }
      }
      case '!=':
      case 'ne': {
        return {
          operator: '=',
          value: field,
          not: true
        }
      }
      default: {
        return {
          operator: '=',
          value: field,
          not: false
        }
      }
    }
  } else if (typeof field === 'string') {
    const op = field.split('|')
    // Test for the existence of an operator
    if (op[1] && op[1] !== null && op[1].length > 0) {
      switch (op[0]) {
        case 'lt': {
          return {
            operator: '<',
            value: op[1],
            not: false
          }
        }
        case 'gt': {
          return {
            operator: '>',
            value: op[1],
            not: false
          }
        }
        case 'lte': {
          return {
            operator: '<=',
            value: op[1],
            not: false
          }
        }
        case 'gte': {
          return {
            operator: '>=',
            value: op[1],
            not: false
          }
        }
        case 'lk': {
          return {
            operator: 'LIKE',
            value: `%${op[1]}%`, // op[1].replace('*', '%')
            not: false
          }
        }
        case 'ne': {
          return {
            operator: '=',
            value: op[1],
            not: true
          }
        }
        default: {
          return {
            operator: '=',
            value: op[1],
            not: false
          }
        }
      }
    } else {
      return {
        operator: '=',
        value: field,
        not: false
      }
    }
  } else {
    return null
  }
}
