import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

/**
 * src/lib/customComponents/designer/getLibs.ts
 *
 * When we are developing custom components, the component contents
 * are of course stored in the database. This is particularly troublesome
 * when it comes to developing new components in typescript using common
 * libraries developed already. To get around this, we need to send the
 * declaration files of **every** module to the client.
 *
 * When we build the components, typescript will automatically resolve
 * the components.
 */

export function getCustomComponentLibs(libType: 'client' | 'server') {
  if (libType === 'server') {
    const allNpmTypes = readdirSync(
      join(__dirname, '../../../../node_modules/@types')
    )
    const allLibs: { filePath: string; contents: string }[] = []
    allNpmTypes.forEach((libFolder: string) => {
      allLibs.push({
        filePath: join('server/node_modules/@types', libFolder, 'index.d.ts'),
        contents: readFileSync(
          join(
            __dirname,
            '../../../../node_modules/@types',
            libFolder,
            'index.d.ts'
          )
        ).toString()
      })
    })
    return allLibs
  } else {
    const allNpmTypes = readdirSync(
      join(
        __dirname,
        '../../../../../service-tomorrow-client/node_modules/@types'
      )
    )
    const allLibs: { filePath: string; contents: string }[] = []
    allNpmTypes.forEach((libFolder: string) => {
      allLibs.push({
        filePath: join('client/node_modules/@types', libFolder, 'index.d.ts'),
        contents: readFileSync(
          join(
            __dirname,
            '../../../../../service-tomorrow-client/node_modules/@types',
            libFolder,
            'index.d.ts'
          )
        ).toString()
      })
    })
    return allLibs
  }
}
