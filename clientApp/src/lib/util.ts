/**
 * Generates a random hash. By default will return 6 alpha-numeric chars.
 * @param length Optional parameter representing length of hash
 */
export function generateKeyHash(length: number = 6) {
  let result: string = ''
  const characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength: number = characters.length
  for (var i = 1; i <= length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * Do nothing
 */
export function noop() {}
