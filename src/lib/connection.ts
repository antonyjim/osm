/**
 * connection.ts
 * Provide the sql connection string
*/

// Node Modules


// NPM Modules
import { ConnectionConfig } from 'mysql'
import { TransportOptions } from 'nodemailer';


// Local Modules


// Constants and global variables
const connectionSettings: ConnectionConfig = {
    host    : 'localhost',
    user    : 'node',
    password: '0735f1c3-c220-4bd7-9c28-53a8945dbe6f',
    database: 'thq'
}

const transporterSettings = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tz7enfexgeicjpfo@ethereal.email',
        pass: 'Qw6SnGJy33Gumm5BgY'
    }
}

const jwtSecret = '33adcbf2-f404-482a-9ca6-6c1f091a7416'

export { connectionSettings, transporterSettings, jwtSecret }