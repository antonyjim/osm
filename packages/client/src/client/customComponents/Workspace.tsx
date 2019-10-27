import { FileExplorerContainer } from './FileExplorer/FileExplorerContainer'
import { Monaco } from '../common/Monaco'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import API from '../lib/API'
import { Alert } from '../common/Alerts'

export interface ICustomComponentDetails {
  sys_id: string
  name: string
  title?: string
  metadata?: any
  version_of?: number
}

export function Workspace(
  props: RouteComponentProps<{ componentTitle: string }>
) {
  const [customComponentDetails, setCustomComponentDetails] = useState<
    ICustomComponentDetails
  >()

  const [errors, setErrors] = useState<{ message: string }[]>()

  useEffect(() => {
    API.get({
      path: '/api/c/customComponentBuilder/' + props.match.params.componentTitle
    }).then((details) => {
      if (details.success) {
        setCustomComponentDetails(details.data)
      } else {
        setErrors(details.errors)
      }
    })
  }, [props.match.params.componentTitle])

  return (
    <>
      <link
        href='/public/c/customComponentDesigner/assets/styles/file-explorer.css'
        type='text/css'
        rel='stylesheet'
      />
      <div>
        <div className='row'>
          <div className='col-sm-12 col-lg-6 col-md-10 py-3'>
            {errors && <Alert alertType='danger' message={errors[0].message} />}
            <h2>{customComponentDetails && customComponentDetails.title}</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3 col-lg-2' style={{ padding: '0' }}>
            {customComponentDetails && (
              <FileExplorerContainer
                fileStructureLocation={
                  '/api/c/customComponentBuilder/tree/' +
                  customComponentDetails.name
                }
              />
            )}
          </div>
          <div className='col-md-9 col-lg-10' style={{ padding: '0' }}>
            <Monaco
              value='test string'
              language='typescript'
              libs={[
                '/api/c/customComponentBuilder/libs/server',
                '/api/c/customComponentBuilder/libs/client'
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
