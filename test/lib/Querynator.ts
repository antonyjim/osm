import { getServerStatus } from '../../src/server/lib/utils'
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

// export async function getServerStatus() {
//     const cpuCount = cpus().length
//     const architecture = arch()
//     const processMem = process.memoryUsage()
//     const openMem = freemem()
//     const totMem = totalmem()
//     const host = hostname()
//     const OS = platform()
//     return await {
//       os: {
//         cpuCount,
//         architecture,
//         openMem,
//         totMem,
//         host,
//         OS,
//         processMem
//       },
//       db: {
//         poolLimit: process.env.DB_POOL_LIMIT || '1',
//         dbName: process.env.DB_DB || 'thq',
//         NODE_ENV: process.env.NODE_ENV || 'development',
//         version: await new Querynator().createQ(
//           { query: 'SELECT VERSION() AS VERSION' },
//           'CALL'
//         )
//       }
//     }
//   }
