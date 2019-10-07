/**
 * config.ts
 * Provide configuration data to use across app
 */

// Node Modules
import { resolve } from 'path'
import { ConnectionConfig, PoolConfig } from 'mysql'

// NPM Modules

// Local Modules

// Constants and global variables
const clientPath: string = resolve(__dirname, '..', '..', 'client')
const version: string = '0.1.0a'
const domain: string = 'osm'
const resourceDir: string = resolve(__dirname, '..', 'resources')
const staticDir: string = resolve(__dirname, '..', 'static')
const databaseConfig: ConnectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'node',
  password: process.env.DB_PASS || 'development',
  database: process.env.DB_DB || 'osm',
  port: parseInt(process.env.DB_PORT, 10) || 3306
}
const poolConfig: PoolConfig = {
  ...databaseConfig,
  connectionLimit: parseInt(process.env.DB_POOL_LIMIT, 10) || 1
}

const MAX_SQL_COL: number = 750

export {
  clientPath,
  version,
  domain,
  resourceDir,
  databaseConfig,
  poolConfig,
  staticDir,
  MAX_SQL_COL
}
