export const logger = {
  info(message: string, ...parms: any[]): void {
    return console.log('[TOWEL] ' + message, ...parms)
  }
}
