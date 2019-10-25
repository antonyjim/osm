import * as React from 'react'
import { instanceOf } from 'prop-types'
import API from '../../lib/API'

interface IFileUploadProps {
  destination: string
  name: string
  id?: string
  addAdditional?: boolean
}

export default function FileUpload(props: IFileUploadProps) {
  if (!props.destination) {
    throw new Error('Must pass destination address to <FileUpload/> component.')
  } else {
    // We need to keep the file in the local state
    const [file, setFile] = React.useState({})

    /**
     * Delete the requested file
     * @param e React click event
     */
    const handleFileDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.target instanceof HTMLButtonElement) {
        const thisFileHref: string | null = e.target.getAttribute('data-href')
        const thisIndex: string | null = e.target.getAttribute('data-index')

        if (thisFileHref && thisIndex !== null) {
          API.del(thisFileHref).then((res) => {
            if (res.success && thisIndex !== null) {
              const allInputs = inputElements
              allInputs.splice(parseInt(thisIndex, 10), 1)
              setInputElements(allInputs)
            }
          })
        }
      }
    }

    const FileElFactory = (fileElProps: {
      location: string
      index: string
      name: string
      type: string
    }) => {
      return (
        <div
          className='card text-center'
          style={{ width: '18rem' }}
          data-index={fileElProps.index}
        >
          <div className='card-body'>
            <span className='mini-preview-thumbnail' />
            <a target='__blank' href={fileElProps.location}>
              {fileElProps.name}
            </a>
            <button
              className='btn btn-sm btn-danger mx-2'
              data-href={fileElProps.location}
              data-index={fileElProps.index}
              onClick={handleFileDelete}
            >
              &times;
            </button>
          </div>
        </div>
      )
    }

    // Here, we automatcially upload the file to the specified directory
    const handleFileUpload = (e: React.FormEvent<HTMLInputElement>) => {
      if (e.target instanceof HTMLInputElement && e.target.files) {
        let index: string = e.target.getAttribute('data-index') || '0'
        const thisFile: File = e.target.files[0]

        if (index) index = index.toString()
        setFile({
          ...file,
          [index]: thisFile
        })

        const body = new FormData()
        body.append('file_1', thisFile)

        // fetch(props.destination + '?file_index=' + index, {
        fetch(
          '/api/attachments/anonymous/' +
            thisFile.name +
            '?token=' +
            window.OSM.session.token,
          {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // },
            body
          }
        ).then((res) => {
          if (res.ok) {
            const currEls: JSX.Element[] = inputElements
            currEls[index] = (
              <FileElFactory
                location={res.headers.get('location') || '#'}
                index={index}
                name={thisFile.name}
                type={thisFile.type}
              />
            )
            setInputElements(currEls)
          }
        })
      }
    }

    // If we are allowing multiple file uploads, then we need to create a new file input for each
    // file we are going to upload
    const createNewInputs = () => {
      if (props.addAdditional || Object.keys(file).length === 0) {
        setInputElements([
          ...inputElements,
          <input
            type='file'
            name='name'
            key={Object.keys(file).length}
            data-index={Object.keys(file).length}
            onInput={handleFileUpload}
          />
        ])
      }
    }

    const [inputElements, setInputElements]: [
      JSX.Element[],
      React.Dispatch<JSX.Element[]>
    ] = React.useState<JSX.Element[]>([
      // <input
      //   type='file'
      //   name='name'
      //   data-index='0'
      //   onInput={handleFileUpload}
      // />
    ])

    React.useEffect(createNewInputs, [file])

    return <div>{inputElements}</div>
  }
}
