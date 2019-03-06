/**
 * src/lib/ql/hooks/generateHooks.ts
 * Generate hooks from the sys_db_hook table
 * and save the output files to dist/hooks
 */

// Node Modules
import { writeFile } from 'fs'

// NPM Modules

// Local Modules
import Towel from './../../towel'
import { resolve } from 'path'

// Constants and global variables

export default function() {
  ;(async () => {
    const hooks = await new Towel({
      table: 'sys_db_hook',
      fields: ['code', 'hook', 'hook_table', 'hook_table_display']
    })
      .get()
      .catch((err) => {
        console.error(err)
      })

    if (hooks && hooks.data.length > 0) {
      hooks.data.map((hook) => {
        console.log(
          `[HOOK_GENERATOR] Generating hook ${hook.hook}_${
            hook.hook_table_display
          }.js`
        )
        console.log(resolve(__dirname, '../../'))
      })
    } else {
      console.log('[HOOK_GENERATOR] NO HOOKS FOUND')
    }
  })()
}
