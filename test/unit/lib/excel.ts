import sheet from '../../../src/server/lib/excel/cell'
import { expect } from 'chai'

export default function() {
  describe('excel spreadsheet creator', function() {
    it('should not throw an error', function() {
      expect(sheet()).to.not.throw()
    })
  })
}
