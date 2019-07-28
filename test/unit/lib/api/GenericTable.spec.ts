/**
 * test/unit/lib/api/GenericTable.spec.ts
 *
 * Validates the following attributes of the GenericTable class:
 *  - Data validation using hooks
 *  - Authorization
 *  - Error handling
 */

import {
  genericTableQuery,
  genericTableCreate,
  genericTableDelete,
  genericTableUpdate
} from '../../../../src/lib/api/schema/GeneralTable'
import { getQuery } from '../../../utils/getRawDbQuery'

describe('will be able to query any ala-carte table', function() {
  it('should select all records', function(done) {
    getQuery('SELECT')
  })
})
