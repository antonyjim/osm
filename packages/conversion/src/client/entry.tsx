// This file is the entry point for webpack to bundle your
// solution into something that can be required by the core.
// It is expected that there will be one default export
// which contains your app's entry component along with routing.

import React, { useEffect } from 'react'
import { submitValue } from './api'

function noop() {}

export default function ConvertModule(props: any) {
  const [chuckinsCode, setChuckinsCode] = React.useState<string>()
  const [inpVal, setInpVal] = React.useState<string>('')
  const [q, setQ] = React.useState<string | null>()
  const [err, setErr] = React.useState<Error>()

  useEffect(() => {
    setInpVal('')
  }, [chuckinsCode])

  useEffect(() => {
    submitValue()
      .then(setChuckinsCode)
      .catch(setErr)
  }, [])

  function handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      let makeReq: Promise<string>
      // If we have a question selected, then we can submit the query with both things
      if (q) {
        makeReq = submitValue(q, inpVal)
        setQ(null)
      } else {
        // Otherwise we need to submit the query with just the question
        setQ(inpVal)
        makeReq = submitValue(inpVal)
      }
      makeReq.then(setChuckinsCode).catch(setErr)
    } else if (e.keyCode > 43 && e.keyCode < 90) {
      setInpVal(inpVal + e.key)
    } else if (e.keyCode === 8) {
      setInpVal(inpVal.slice(0, -1))
    }
  }

  return (
    <div className='row py-5'>
      <div className='col'></div>
      <div className='col-sm-10 col-md-8'>
        {err && <div className='alert alert-danger'>{err}</div>}
        <pre>{chuckinsCode}</pre>
        <input
          // style={{
          //   width: '100%',
          //   height: '1.4em',
          //   background: 'transparent',
          //   border: 'none',
          //   outline: 'none'
          // }}
          className='form-control w-100'
          autoFocus={true}
          onKeyDown={handleInput}
          onChange={noop}
          value={inpVal}
        />
      </div>
      <div className='col'></div>
    </div>
  )
}
