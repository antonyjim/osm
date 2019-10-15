/**
 * utils.ts
 * Provide a list of utilities to improve the server
 */

// Node Modules
import { cpus, arch, freemem, hostname, platform, totalmem } from 'os'
import { simpleQuery } from './queries'
import { IServerStats } from '@osm/server'
import { v4 } from 'uuid'
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

const isTestEnv = process.env.NODE_ENV === 'test'

export function isTest() {
  return isTestEnv
}

export function LoginException(message: string, details?: Error) {
  this.message = message
  this.details = details
  this.error = true
}

export function handleError(err) {
  return Promise.reject(err)
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

export function getHostname(): string {
  return hostname()
}

export function isBool(value): boolean {
  if (typeof value === 'boolean') {
    return true
  } else if (value === 0 || value === 1) {
    return true
  } else {
    return false
  }
}

/**
 * Generates an array of specified length from specified index
 * @param fromOrTo Start of array (or end of `to` is not provided)
 * @param to End of array
 */
export function range(fromOrTo: number, to?: number) {
  let from: number = 0
  let arr: number[] = []
  if (to) {
    from = fromOrTo
  }

  let i: number = 0
  while (from + i < to) {
    arr[i] = from + i
    i++
  }

  return arr
}

/**
 * Generates a random key hash
 * @param length Length of hash to generate
 */
export function generateKeyHash(length: number = 6) {
  /**
   * Check for test env. If found, look for special env
   * variable called OVERRIDE_KEY_HASH. This allows for special
   * hashes to be generated for predictable test results.
   */
  if (isTest) {
    if (process.env.OVERRIDE_KEY_HASH) {
      return process.env.OVERRIDE_KEY_HASH
    }
  }
  let result: string = ''
  const characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength: number = characters.length
  for (var i = 1; i <= length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const generateHash = generateKeyHash

export function uuid() {
  return v4()
}
