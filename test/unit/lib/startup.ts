import constructSchema from '../../../src/server/lib/api/schema/constructSchema'
import { constructForms } from '../../../src/server/lib/api/forms/constructForms'
import generateHooks from '../../../src/server/lib/api/hooks/generateHooks'

constructSchema()
generateHooks()
constructForms()
