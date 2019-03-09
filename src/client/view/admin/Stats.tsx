import * as React from 'react'
import API from '../lib/API'
import { Field } from '../common/FormControls/TextField'

export default function Stats() {
  let loaded = false
  const getStats = () => {
    API.get({ path: '/stats' })
      .then((stats) => {
        console.log(stats)
        loaded = true
      })
      .catch((err: Error) => {
        console.error(err)
      })
  }

  return (
    <>
      {loaded && (
        <div className='row m-5'>
          <div className='col' />
          <div className='col-lg-6 col-md-8 col-sm-11'>
            <h2>Server Status</h2>
            <hr />
            <Field
              id='cpuCount'
              name='cpuCount'
              value={this.state.stats.os.host}
              label='Node Hostname'
              type='text'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              value={this.state.stats.os.OS}
              label='Operating System'
              name='os'
              type='text'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              value={this.state.stats.os.cpuCount}
              label='CPU Count'
              type='text'
              name='cpu'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              name='architecture'
              value={this.state.stats.os.architecture}
              label='Architecture'
              type='text'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              value={~~(this.state.stats.os.openMem / 1e6)}
              label={
                'Available Memory (MB) (' +
                ~~(
                  (~~(this.state.stats.os.openMem / 1e6) /
                    ~~(this.state.stats.os.totMem / 1e6)) *
                  100
                ) +
                '%)'
              }
              name='open'
              type='text'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              value={~~(this.state.stats.os.processMem.rss / 1e6)}
              label={
                'Memory Used By Node (' +
                ~~(
                  (~~(this.state.stats.os.processMem.rss / 1e6) /
                    ~~(this.state.stats.os.totMem / 1e6)) *
                  100
                ) +
                '%)'
              }
              name='used'
              type='text'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              id='openMem'
              value={~~(this.state.stats.os.totMem / 1e6)}
              label='Total Memory (MB)'
              type='text'
              name='openMem'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              value={this.state.stats.db.NODE_ENV}
              label='Node Environment'
              type='text'
              name='env'
              attributes={{ readOnly: 'readonly' }}
            />

            <h2>Database Status</h2>
            <hr />
            <Field
              value={this.state.stats.db.version[0].VERSION}
              label='Version'
              type='text'
              name='dbVersion'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              value={this.state.stats.db.poolLimit}
              label='Pool Limit'
              type='text'
              name='poolLimit'
              attributes={{ readOnly: 'readonly' }}
            />
            <Field
              value={this.state.stats.db.dbName}
              label='Database Name'
              type='text'
              name='dbName'
              attributes={{ readOnly: 'readonly' }}
            />
          </div>
          <div className='col' />
        </div>
      )}
    </>
  )
}
