// Dependencies
var express = require('express')
var Router = express.Router
var path = require('path')
var join = path.join
var resolve = path.resolve
var fs = require('fs')

// Local vars
module.exports = (function () {
  var routes = Router()

  // routes.use('/public', express.static(join(__dirname, 'build')))
  // routes.use('/static', express.static(join(__dirname, 'build/static')))

  routes.get('*', (req, res) => {
    if (req.auth.iA && req.auth.u) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
      })
      const fileStream = fs.createReadStream(
        resolve(__dirname, './build/index.html')
      )
      fileStream.on('data', (data) => {
        res.write(data)
      })
      fileStream.on('end', () => {
        res.end()
        return
      })
    } else {
      res.redirect('/auth/login?returnUrl=' + encodeURI(req.originalUrl))
    }
  })
  return routes
})()