/**
 * Special generateKeyHash that ignores NODE_ENV variable
 * @param length Length of hash to generate
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
