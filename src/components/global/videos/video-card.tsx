import React from 'react'
import Loader from '../loader'

type Props = {
    User : {
        firstname: string | null,
        lastname: string | null,
        image: string | null
    } | null
    id: string,
    Foler: {
        id: string,
        name: string
    } | null
    processing: boolean,
    Folder: {
        id: string,
        name: string
    } | null
    createdAt: Date
    title: string | null
    source : string
    workspaceId: string
}

const VideoCard= (props: Props) => {
    
  return (
    <Loader status = {false}>

    </Loader>
  )
}

export default VideoCard