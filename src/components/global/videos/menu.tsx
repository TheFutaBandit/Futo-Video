import { Move } from 'lucide-react'
import React from 'react'

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
        className = "flex item-center cursor-pointer gap-x-2"
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
        
    </Modal>
  )
}

export default CardMenu