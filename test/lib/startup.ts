import constructSchema from '../../src/server/lib/ql/schema/constructSchema'
import { constructForms } from '../../src/server/lib/ql/schema/constructForms'
import generateHooks from '../../src/server/lib/ql/hooks/generateHooks'

constructSchema()
generateHooks()
constructForms()
