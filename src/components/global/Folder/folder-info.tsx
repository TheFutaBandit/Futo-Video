'use client'

import { getFolderInfo } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { FolderProps } from '@/types/index.types'
import React from 'react'


type Props = {
    folderId: string
}

const FolderInfo= ({folderId}: Props) => {
    const { data } = useQueryData(["folder-info"], () => getFolderInfo('folderId'));

    const {data: folder} = data as FolderProps;
  return (
    <div className = "flex items-center">
        <h2 className = "text-[#BdBdBd] text-2xl">HELLOL</h2>
    </div>
  )
}

export default FolderInfo