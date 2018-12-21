/**
 * connection.ts
 * Provide the sql connection string
*/

// Node Modules


// NPM Modules
import { Pool, PoolConfig, createPool } from 'mysql'


// Local Modules


// Constants and global variables
const poolConfig: PoolConfig = {
    host    : 'localhost',
    user    : 'node',
    password: '0735f1c3-c220-4bd7-9c28-53a8945dbe6f',
    database: 'thq',
    connectionLimit: 1
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

let pool: Pool
function getPool(): Pool {
    if (pool) {return pool}
    pool = createPool(poolConfig)
    return pool
}

export { getPool, transporterSettings, jwtSecret }