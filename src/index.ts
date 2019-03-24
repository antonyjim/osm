/**
 * Start the web server
 */

import { readFile } from 'fs'

// Load environment variables
readFile('../dot.env', { encoding: 'utf8' }, (err: Error, data: string) => {
  if (err) {
    console.error(err)
    console.error(
      '[STARTUP] dot.env not found in cwd. Defaulting to environment variables.'
    )
    for (const envVar in process.env) {
      if (!envVar.startsWith('npm')) {
        console.log(
          '[STARTUP] Setting environment variable %s to value %s',
          envVar,
          process.env[envVar]
        )
      }
    }
    // Start the web server
    require('./server/app').routes()
    return
  }
  const lines: string[] | number[] = data.split('\n')
  lines.map((line: string) => {
    const key: string = line.split('=')[0]
    const value: string = line.split('=')[1]
    if (value[0] === "'") {
      console.log(
        '[STARTUP] Setting environment variable %s to value %s',
        key,
        value
      )
      process.env[key] = value.slice(1, -1)
    } else {
      process.env[key] = value
    }
  })
  // Start the web server
  require('./server/app').routes()
})
