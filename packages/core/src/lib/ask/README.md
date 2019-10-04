# Ask Module

### Usage

The `Ask` module is used to prompt users before continuing with an action.

An application will often come across a situation where a user will need to either confirm their action or answer a question before continuing.

An example of such usage is shown here:

```ts
import { confirmPrompt } from '@lib/ask'

express().get(
  '/someroute',
  confirmPrompt(
    'Are you sure you would like to continue?',
    (answer, req, res) => {
      // Do something with req and res
    }
  )
)
```

### Implementation

`Ask` works by storing the raw http request in the `sys_pending_request` database table. Along with the raw request, the module also generates a random hash that is used to reply to the question. e.g. `a43rtj3D`. When the user answers the prompt, the response is sent to `/api/ask/reply/a43rtj3D?response=${some_response_data}`. This link will expire after a predetermined amount of time (180 seconds by default) and can only be accessed by the original user. The callback function is then applied by mocking the request through express.
