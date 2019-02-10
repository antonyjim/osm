/**
 * app.ts
 * Provide an entry point for the THQ application
*/

// Node Modules
import * as cluster from 'cluster'
import { cpus } from 'os'

// NPM Modules
import * as express from 'express'

// Local Modules
import { router } from './routes/index'
import { Log } from './lib/log';

export default function routes() {
    if (process.env.NODE_ENV === 'production') {
        const cores: number = cpus().length
        if (cluster.isMaster) {
            console.log('Started cluster, master process as ' + process.pid)
            let i: number = parseInt(process.env.CLUSTER_COUNT) || cores
            while(i >= 0) {
                cluster.fork()
                i--
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log(`Worker process ${worker.process.pid} crashed`)
            })
        } else {
            listen()
        }
    } else {
        listen()
    }

    function listen() {
        // Constants and global variables
        const app = express()
        const port = parseInt(process.env.SERVER_PORT) || 8020
        // Routes
        app.disable('x-powered-by')
        app.use('/', router)

        app.listen(port, function() {
            new Log(`Listening at port ${port} on process ${process.pid}`).info()
        })
    }
}