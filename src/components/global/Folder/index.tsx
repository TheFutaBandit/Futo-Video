'use client'

import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Loader from '../loader'
import {Folder as FolderIcon} from 'lucide-react'
import { useMutationData } from '@/hooks/useMutationData'
import { renameFolder } from '@/actions/workspace'
import { Input } from '@/components/ui/input'

type Props = {
  name: string,
  id: string,
  optimistic?: boolean,
  count?: number
}

const Folder= ({name, id, optimistic, count}: Props) => {
    const path_name = usePathname()
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const folderRef = useRef<HTMLDivElement | null>(null);

    const [onRename, setOnRename] = useState(false);

    const Rename = () => setOnRename(true);

    const Renamed = () => setOnRename(false);

    const {mutate, isPending} = useMutationData(
      ['rename-folders'],
      (data : {name : string}) => renameFolder(id, data.name),
      'workspace-folders',
      Renamed, 
    )


    const handleFolderClick = () => {
      router.push(`${path_name}/folder/${id}`);
    }

    const handleNameDoubelClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
      e.stopPropagation();
      Rename();
    }

    const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
      
     if(inputRef.current) {
      if(inputRef.current.value) {
        mutate({name: inputRef.current.value})
      } else Rename();
     }
    }


  return (
    <div
      onClick = {handleFolderClick}
      ref = {folderRef}
      className = {
        cn(optimistic && 'opacity-60',
          'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-3 px-4 rounded-lg border-[1px]'
        )
      }
    >
      <Loader status = {false} color='white'>
        <div className = "flex flex-col gap-[1px]">
            {onRename ? (
              <Input 
                  onBlur = {(e: React.FocusEvent<HTMLInputElement>) => updateFolderName(e)}
                  autoFocus
                  placeholder = {name} 
                  className = "border-none text-base outline-none w-full text-neutral bg-transparent" 
                  ref = {inputRef}
                /> 
            ) : (
              <p 
                onClick = {(e) => e.stopPropagation()}
                onDoubleClick = {handleNameDoubelClick} 
                className = "text-neutral-300"
              >
                {name}
              </p>
          )}
          <span className = "text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderIcon />
    </div>
  )
}

export default Folder 