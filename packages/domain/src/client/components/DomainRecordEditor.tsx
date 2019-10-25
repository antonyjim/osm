;`
Provide a modal to modify domain records
`

import * as React from 'react'

interface IDomainRecord {
  data: string
  name: string
  ttl: string
  type: string
}

export default function DomainRecordEditor(domainRecordEditorProps: {
  open: boolean
  record?: IDomainRecord
}) {
  return <>{domainRecordEditorProps.open && <div className='modal'></div>}</>
}
