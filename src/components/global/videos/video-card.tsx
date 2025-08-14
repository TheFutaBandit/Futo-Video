import React from 'react'
import Loader from '../loader'
import CardMenu from './menu'

type Props = {
    User : {
        firstname: string | null,
        lastname: string | null,
        image: string | null
    } | null
    id: string,
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
        <div className = "overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
           <div className = "absolute top-3 right-3 z-50 flex flex-col gap-y-3">
             <CardMenu 
              videoId={props.id} 
              currentFolderName = {props.Folder?.name}
              currentWorkspace = {props.workspaceId}
              currentFolder={props.Folder?.id}
             />
           </div>
        </div>
    </Loader>
  )
}

export default VideoCard