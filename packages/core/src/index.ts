/**
 * Start the web server.
 *
 * First, we need to verify the database connection.
 *
 * If we cannot establish a connection, we start the
 * fallback http listener from ./app
 */

// Set up aliases
require('module-alias/register')
;(function startApplication() {
  // Read environment variables
  require('dotenv').config()

  // Check installation
  require('../../install')((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    // After checking install files, test database connection
    require('./lib/connection')
      .testConnection()
      .then((status) => {
        if (status) {
          // Start the web server
          console.log(
            '[STARTUP] Successfully established database connection. Starting http listener'
          )
          require('./app/app').initOsmHttpListener()
        } else {
          console.log(
            '[STARTUP] Failed to establish database connection. Defaulting to fallback http listener'
          )
          require('./app/app').internalError()
        }
      })
      .catch((dbConnectionErr) => {
        console.error(dbConnectionErr)
        console.log(
          '[STARTUP] Failed to establish database connection with error %s. Defaulting to fallback http listener',
          dbConnectionErr
        )
        require('./app/app').internalError()
      })
  })
})()
