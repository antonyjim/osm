/**
 * utils.ts
 * Provide a list of utilities to improve the server
*/

// Node Modules


// NPM Modules


// Local Modules


// Constants and global variables

export function LoginException(message: string, details?: Error) {
    this.message = message
    this.details = details
    this.error = true
}
