;`
Get the response from the /api/conversion path
`

export function submitValue(
  question?: string,
  value?: string
): Promise<string> {
  return new Promise(
    (
      resolveResponse: (results: string) => void,
      rejectResponse: (err: Error) => void
    ) => {
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'text'
      xhr.onloadend = function() {
        if (xhr.status === 200) {
          resolveResponse(xhr.responseText)
        } else {
          rejectResponse(new Error(xhr.responseText))
        }
      }

      xhr.onerror = function(ev) {
        rejectResponse(new Error('An unknown error occurred'))
      }

      if (question && !value) {
        xhr.open('GET', '/api/convert/' + question)
      } else if (question && value) {
        xhr.open('GET', '/api/convert/' + question + '?v=' + value)
      } else {
        xhr.open('GET', '/api/convert/')
      }

      xhr.send()
    }
  )
}
