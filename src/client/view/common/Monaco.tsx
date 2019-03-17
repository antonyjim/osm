// import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
// import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js'
// import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js'
// import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js'
// import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js'
// import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js'
// import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js'
// import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
// import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js'
// import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js'
// import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js'
// import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js'
// const monaco = React.lazy(() => import('./Monaco'))

// import 'monaco-editor/esm/vs/editor/editor.worker'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.worker'

// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
// import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'
import * as React from 'react'
import { useLayoutEffect, useEffect, useState } from 'react'

export function Monaco(props: { value: string }) {
  const [scriptReady, setScriptReady] = useState(
    window.monaco.editor ? true : false
  )
  useLayoutEffect(() => {
    window.require = { paths: { vs: '/public/scripts/bundles/min/vs' } }
    const scripts = [
      '/public/scripts/bundles/min/vs/loader.js',
      '/public/scripts/bundles/min/vs/editor/editor.main.nls.js',
      '/public/scripts/bundles/min/vs/editor/editor.main.js'
      // '/public/scripts/bundles/min/vs/basic-languages/javascript/javascript.js'
      // '/public/scripts/bundles/ts.worker.js'
    ]
    if (!scriptReady) {
      scripts.map((scriptSrc) => {
        if (document.querySelector('script[src="' + scriptSrc + '"]'))
          return true
        const scriptTag: HTMLScriptElement = document.createElement('script')
        scriptTag.addEventListener('load', (e) => {
          setTimeout(() => {
            setScriptReady(window.monaco && window.monaco.editor ? true : false)
          }, 1000)
        })
        scriptTag.src = scriptSrc
        return document.head.appendChild(scriptTag)
      })
      return
    }
    // self.MonacoEnvironment = {
    //   getWorkerUrl: (moduleId, label) => {
    //     return '/public/scripts/bundles/ts.worker.js'
    //   }
    // }
    window.monaco.editor.create(document.getElementById('monaco'), {
      value: props.value,
      language: 'javascript',
      theme: 'vs-dark'
    })

    return () => {
      window.monaco.editor && window.monaco.editor.getModels
        ? window.monaco.editor.getModels()[0].dispose()
        : console.log('Monaco not found')
    }
  }, [scriptReady])

  useEffect(() => {
    if (!scriptReady) return
    window.monaco.editor.getModels()[0].setValue(props.value)
  }, [props.value])

  return (
    <>
      <div
        id='monaco'
        style={{
          width: '100%',
          height: '600px',
          border: '1px solid #ccc'
        }}
      />
    </>
  )
}
