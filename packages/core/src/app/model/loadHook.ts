/**
 * src/server/lib/hooks/loadHook.ts
 * Check for existence of hook, and load and execute if exists
 */

// Node Modules
import { existsSync } from 'fs'
import { resolve } from 'path'
import { HOOKS_DIR } from '../../lib/connection'

// NPM Modules

// Local Modules

// Constants and global variables

const loadedModules = []

export default function loadModule(table, hook) {
  const hookFile = `${hook}_${table}.js`
  const hookPath = resolve(HOOKS_DIR, hookFile)
  if (existsSync(hookPath)) {
    console.log('[HOOK_LOADER] FOUND HOOK AT ' + hookFile)
    loadedModules.push(hookPath)
    return require(hookPath)
  } else return null
}

export function release(table, hook): void {
  const hookFile = `${hook}_${table}.js`
  const hookPath = resolve(HOOKS_DIR, hookFile)
  // TODO unload after finish
  /*
  if (loadedModules.includes(hookPath)) {
    require.cache
  }
  */
}
