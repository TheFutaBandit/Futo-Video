import { cn } from '@/lib/utils'
import { ArrowRight, Folder as FolderIcon } from 'lucide-react'
import React from 'react'
import Folder from '../Folder'

type Props = {
    workspaceId: string
}

const Folders = ({workspaceId}: Props) => {
    
  return (
    <div 
        className = "flex flex-col gap-4"
    >
        <div className = "flex items-center justify-between">
            <div className = "flex items-center gap-4">
                <FolderIcon color = "#707070"/>
                <h2 className = "text-[#BDBDBD] text-xl">Folders</h2>
            </div>
            <div className ="flex items-center gap-2">
                <p className = 'text-[#BDBDBD]'>See All</p>
                <ArrowRight color = "#707070"/>
            </div>
        </div>
        <section
            className = {cn('flex items-center gap-4 overflow-x-auto w-full')}
        >
            <Folder name = {'Folder 1'} id = {"adf"}/>
        </section>
    </div>

  )
}

export default Folders 