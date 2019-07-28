export function submitForm({
  body,
  action,
  method,
  cb
}) {
  $.ajax(action, {
    method,
    data: JSON.stringify(body),
    headers: {
      'Content-Type': 'Application/json'
    },
    success: (data) => {
      cb(null, data)
    },
    error: cb
  })
}