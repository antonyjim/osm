#!/usr/bin/node

(function osm(args) {
  const help = `
Modify OSM installation

Usage: osm <modification> <package> <action>

  <modification>: One of: mod, add, install, test
`
  switch (args[0]) {
    case '--help': {
      console.log(help)
      process.exit()
    }

    case 'mod': {
      require('./cli/modify-package')(args[1], args[2], args.slice(3), function (err, message) {
        if (err) {
          console.error(err)
          process.exit(1)
        } else if (message) {
          console.log(message)
          process.exit()
        } else {
          process.exit()
        }
      })
      break
    }

    default: {
      console.error(new Error('Unknown modification \'' + args[0] + '\''))
      process.exit(1)
    }
  }
})(process.argv0 === 'osm' ? process.argv.slice(1) : process.argv.slice(2))