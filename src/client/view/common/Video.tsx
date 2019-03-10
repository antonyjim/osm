import * as React from 'react'

interface IVideoProps {
  href: string
}

export default function Video(props: IVideoProps) {
  return (
    <video controls width='100%'>
      <source src={props.href} type='video/mp4' />
    </video>
  )
}
