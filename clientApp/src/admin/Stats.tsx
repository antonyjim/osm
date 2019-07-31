import * as React from 'react'
import API from '../lib/API'
import { Field } from '../common/FormControls/TextField'
import { IServerStats } from '../types/server'
import { number } from 'prop-types'

export default function Stats() {
  const [stats, setStats]: [
    IServerStats,
    React.Dispatch<IServerStats>
  ] = React.useState({
    os: {
      cpuCount: 0,
      architecture: '',
      openMem: 0,
      totMem: 0,
      host: '',
      OS: '',
      processMem: {
        rss: 0,
        heapTotal: 0,
        heapUsed: 0,
        external: 0
      }
    },
    db: {
      poolLimit: 0,
      dbName: '',
      NODE_ENV: '',
      version: [{}]
      // version: { VERSION: string }[]
    }
  })

  React.useEffect(() => {
    API.get({ path: '/stats' })
      .then((serverStats: IServerStats) => {
        console.log(serverStats)
        setStats({ ...serverStats, loaded: true })
      })
      .catch((err: Error) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      {stats && stats.loaded && (
        <div className='row m-5'>
          <div className='col' />
          <div className='col-lg-6 col-md-8 col-sm-11'>
            <h2>Server Status</h2>
            <hr />
            <Field
              id='cpuCount'
              name='cpuCount'
              value={stats.os.host}
              label='Node Hostname'
              type='text'
              readOnly={true}
            />
            <Field
              value={stats.os.OS}
              label='Operating System'
              name='os'
              type='text'
              readOnly={true}
            />
            <Field
              value={stats.os.cpuCount}
              label='CPU Count'
              type='text'
              name='cpu'
              readOnly={true}
            />
            <Field
              name='architecture'
              value={stats.os.architecture}
              label='Architecture'
              type='text'
              readOnly={true}
            />
            <Field
              value={~~(stats.os.openMem / 1e6)}
              label={
                'Available Memory (MB) (' +
                ~~(
                  (~~(stats.os.openMem / 1e6) / ~~(stats.os.totMem / 1e6)) *
                  100
                ) +
                '%)'
              }
              name='open'
              type='text'
              readOnly={true}
            />
            <Field
              value={~~(stats.os.processMem.rss / 1e6)}
              label={
                'Memory Used By Node (' +
                ~~(
                  (~~(stats.os.processMem.rss / 1e6) /
                    ~~(stats.os.totMem / 1e6)) *
                  100
                ) +
                '%)'
              }
              name='used'
              type='text'
              readOnly={true}
            />
            <Field
              id='openMem'
              value={~~(stats.os.totMem / 1e6)}
              label='Total Memory (MB)'
              type='text'
              name='openMem'
              readOnly={true}
            />
            <Field
              value={stats.db.NODE_ENV}
              label='Node Environment'
              type='text'
              name='env'
              readOnly={true}
            />

            <h2>Database Status</h2>
            <hr />
            <Field
              value={stats.db.version[0].VERSION}
              label='Version'
              type='text'
              name='dbVersion'
              readOnly={true}
            />
            <Field
              value={stats.db.poolLimit}
              label='Pool Limit'
              type='text'
              name='poolLimit'
              readOnly={true}
            />
            <Field
              value={stats.db.dbName}
              label='Database Name'
              type='text'
              name='dbName'
              readOnly={true}
            />
          </div>
          <div className='col' />
        </div>
      )}
    </>
  )
}
