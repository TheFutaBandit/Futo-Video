'use client'

import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Loader from '../loader'
import {Folder as FolderIcon} from 'lucide-react'

type Props = {
  name: string,
  id: string,
  optimistic?: boolean,
  count?: number
}

const Folder= ({name, id, optimistic, count}: Props) => {
    const path_name = usePathname()
    const router = useRouter();


  return (
    <div
      className = {cn('flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-3 px-4 rounded-lg border-[1px]')}
    >
      <Loader status = {false} color='white'>
        <div className = "flex flex-col gap-[1px]">
            <p className = "text-neutral-300">{name}</p>
            <span className = "text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderIcon />
    </div>
  )
}

export default Folder 