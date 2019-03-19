/**
 * utils.ts
 * Provide a list of utilities to improve the server
 */

// Node Modules
import { cpus, arch, freemem, hostname, platform, totalmem } from 'os'
import { simpleQuery } from './queries'
import { IServerStats } from '../../types/server'
import {
  existsSync,
  mkdirSync,
  lstatSync,
  readdirSync,
  copyFileSync,
  unlinkSync,
  rmdirSync
} from 'fs'
import { resolve } from 'path'

// NPM Modules

// Local Modules

// Constants and global variables

export function LoginException(message: string, details?: Error) {
  this.message = message
  this.details = details
  this.error = true
}

export async function getServerStatus(): Promise<IServerStats> {
  const cpuCount = cpus().length
  const architecture = arch()
  const processMem = process.memoryUsage()
  const openMem = freemem()
  const totMem = totalmem()
  const host = hostname()
  const OS = platform()
  return await {
    os: {
      cpuCount,
      architecture,
      openMem,
      totMem,
      host,
      OS,
      processMem
    },
    db: {
      poolLimit: parseInt(process.env.DB_POOL_LIMIT, 10) || 1,
      dbName: process.env.DB_DB || 'thq',
      NODE_ENV: process.env.NODE_ENV || 'development',
      version: await simpleQuery('SELECT VERSION() AS VERSION')
    }
  }
}

export function deleteDirSync(dir: string) {
  /**
   * Copy the contents of a directory
   * @param dir Directory of the file
   * @param relDir Position relative to the destination dir
   */
  function deleteDirContents(delDir: string) {
    const files = readdirSync(delDir)
    files.forEach((file) => {
      const thisFile = resolve(delDir, file)
      if (lstatSync(thisFile).isDirectory()) {
        deleteDirContents(resolve(delDir, file))
      } else {
        unlinkSync(resolve(delDir, file))
      }
    })
    rmdirSync(delDir)
  }

  // Make sure that the directory being copied from exists
  if (existsSync(dir)) {
    const subFiles = readdirSync(dir)

    // In order to make the copy recursive, first recreate the file structure
    subFiles.forEach((file) => {
      const thisFile = `${dir}/${file}`
      if (lstatSync(thisFile).isDirectory()) {
        deleteDirContents(thisFile)
      } else {
        unlinkSync(thisFile)
      }
    })
    rmdirSync(dir)
  } else {
    throw new Error(`${dir} does not exist.`)
  }
}

export function copyDirSync(sourceDir: string, destinationDir: string) {
  /**
   * Copy the contents of a directory
   * @param dir Directory of the file
   * @param relDir Position relative to the destination dir
   */
  function copyDirContents(dir: string, relDir: string) {
    const files = readdirSync(dir)
    try {
      const newDir = resolve(destinationDir, relDir)
      console.log('[FILE_COPY] Attempting to create directory %s', newDir)
      mkdirSync(resolve(destinationDir, relDir))
    } catch (e) {
      console.log('[FILE_COPY] Directory already exists')
    }
    files.forEach((file) => {
      const thisFile = resolve(dir, file)
      if (lstatSync(thisFile).isDirectory()) {
        mkdirSync(resolve(destinationDir, relDir, file))
        copyDirContents(thisFile, [relDir, file].join('/'))
      } else {
        const destFile = resolve(destinationDir, relDir, file)
        copyFileSync(thisFile, destFile)
      }
    })
  }

  // Make sure that the directory being copied from exists
  if (existsSync(sourceDir)) {
    if (
      !existsSync(destinationDir) ||
      !lstatSync(destinationDir).isDirectory()
    ) {
      mkdirSync(destinationDir)
    }
    const subFiles = readdirSync(sourceDir)

    // In order to make the copy recursive, first recreate the file structure
    subFiles.forEach((file) => {
      const thisFile = `${sourceDir}/${file}`
      if (lstatSync(thisFile).isDirectory()) {
        copyDirContents(thisFile, file)
      } else {
        copyFileSync(thisFile, `${destinationDir}/${file}`)
      }
    })
  } else {
    throw new Error(`${sourceDir} does not exist.`)
  }
}
