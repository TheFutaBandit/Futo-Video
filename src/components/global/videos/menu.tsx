import { Move } from 'lucide-react'
import Modal from '../modal'
import React from 'react'
import ChangeVideoLocation from '@/components/forms/change-video-location.tsx'

type Props = {
    videoId: string,
    currentWorkspace?: string,
    currentFolder?: string,
    currentFolderName?: string
}

const CardMenu= ({
    videoId,
    currentWorkspace,
    currentFolder,
    currentFolderName
}: Props) => {
    
  return (
    <Modal 
        title = "Move to new workspace/folder"
        description=  "This will move your video"
        trigger = {
            <Move 
                size = {20}
                fill = "#a4a4a4"
                className = "text-[#a4a4a4]"
            />
        }
    >
        <ChangeVideoLocation 
            currentFolder = {currentFolder}
            currentWorkspace = {currentWorkspace}
            videoId={videoId}
            currentFolderName = {currentFolderName}
        />
    </Modal>
  )
}

export default CardMenu