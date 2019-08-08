/**
 * {{componentTitle}}/lib/index.ts
 */

import { simpleQuery } from 'common/connection'

export function getSomeValue(): Promise<any[]> {
  return new Promise((resolveSomeValue, rejectSomeValue) => {
    simpleQuery('SELECT something FROM somewhere')
      .then((results: any[]) => {
        resolveSomeValue(results)
      })
      .catch(rejectSomeValue)
  })
}
