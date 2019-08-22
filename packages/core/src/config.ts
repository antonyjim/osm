/**
 * config.ts
 * Provide configuration data to use across app
 */

// Node Modules
import { resolve } from 'path'

// NPM Modules

// Local Modules

// Constants and global variables
const clientPath: string = resolve(__dirname, '..', '..', 'client')
const version: string = '0.1.0a'
const domain: string = 'osm'

export { clientPath, version, domain }
