import sheet from '../../../src/lib/excel/cell'
import { expect } from 'chai'

export default function() {
  describe('excel spreadsheet creator', function() {
    it('should not throw an error', async function() {
      expect(await sheet()).to.not.throw()
    })
  })
}
