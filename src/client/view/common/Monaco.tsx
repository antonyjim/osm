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

import * as monaco from 'monaco-editor'

// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
// import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'
import { useEffect } from 'react'

export default function(props: { value: string }) {
  useEffect(() => {
    monaco.editor.create(document.getElementById('monaco'), {
      value: props.value,
      language: 'javascript',
      theme: 'vs-dark'
    })

    return () => {
      monaco.editor.getModels()[0].dispose()
    }
  }, [])

  self.MonacoEnvironment = {
    getWorkerUrl: (moduleId, label) => {
      return '/public/scripts/bundles/ts.worker.bundle.js'
    }
  }

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
      <script src='/public/script/bundles/typescript.worker.js' />
      <script src='/public/script/bundles/editor.worker.js' />
    </>
  )
}
