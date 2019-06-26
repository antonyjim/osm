import { getServerStatus } from '../../../../src/lib/utils'
import { expect } from 'chai'
import * as mocha from 'mocha'

export default function() {
  describe('return host environment details', function() {
    it('should get the number of CPUS', async function() {
      const stats = await getServerStatus()
      expect(stats.os.cpuCount).to.be.a('number')
    })
    it('should get the architecture', async function() {
      const stats = await getServerStatus()
      expect(stats.os.architecture).to.be.a('string')
    })
  })
}
