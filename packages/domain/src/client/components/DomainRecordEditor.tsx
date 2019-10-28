;`
Provide a modal to modify domain records
`

import * as React from 'react'
import { Field, SelectField } from '@components/FormControls'
import { SelectOpt } from '@components/FormControls/Select'

interface IDomainRecord {
  data: string
  name: string
  ttl: number
  // Yeah yeah, I know this isn't all of them but these are the only ones
  // that will be allowed to be modified by any administrator
  type: 'A' | 'AAAA' | 'CNAME' | 'NS' | 'MX'
}

export default function DomainRecordEditor(domainRecordEditorProps: {
  open: boolean
  domain: string
  record?: IDomainRecord
}) {
  const [domainInfo, setDomainInfo]: [
    IDomainRecord,
    React.Dispatch<IDomainRecord>
  ] = React.useState({
    name: '',
    data: '',
    ttl: 3600,
    type: 'A',
    ...domainRecordEditorProps.record
  })
  const typeOpts: SelectOpt = [
    {
      text: 'IPV4 Address',
      value: 'A'
    },
    {
      text: 'IPV6 Address',
      value: 'AAAA'
    },
    {
      text: 'Redirection',
      value: 'CNAME'
    },
    {
      text: 'Name-Server',
      value: 'NS'
    },
    {
      text: 'Mail Exchange',
      value: 'MX'
    }
  ]

  function setVal(e: React.ChangeEvent<HTMLInputElement>) {
    setDomainInfo({ ...domainInfo, [e.target.id]: e.target.value })
  }

  return (
    <>
      {domainRecordEditorProps.open && (
        <div className='modal' tabIndex={-1} role='dialog'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>
                  {/* Conditionally render input field */}
                  {domainRecordEditorProps.record &&
                  domainRecordEditorProps.record.name ? (
                    <span>{domainRecordEditorProps.record.name}</span>
                  ) : (
                    <input
                      onChange={setVal}
                      id='name'
                      className='form-control'
                    />
                  )}
                  .{domainRecordEditorProps.domain}
                </h5>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-md-4 col-sm-12'>
                    <div className='card'>
                      <div className='card-body'>
                        <Field
                          name='data'
                          type='text'
                          value={domainInfo.data}
                          label='Data'
                          caption='IP Address for subdomain'
                          onChange={setVal}
                        />
                        <Field
                          name='ttl'
                          type='number'
                          value={domainInfo.ttl}
                          label='Time-To-Live'
                          onChange={setVal}
                        />
                        <SelectField
                          name='type'
                          opts={typeOpts}
                          onChange={setVal}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='card'>
                      <div className='card-body'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
