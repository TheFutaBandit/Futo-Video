'use client'

import { getUserWorkspaces } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import Modal from "../modal"
import { Button } from '@/components/ui/button'
import { FolderPlusIcon } from 'lucide-react'

type Props = {}

const CreateWorkspace = (props: Props) => {
    const {data} = useQueryData(['user-workspaces'], getUserWorkspaces);

    const { data: plan } = data as {
        status: number,
        data : {
            subscription : {
                plan : 'PRO' | 'FREE'
            } | null
        }
    }

    if(plan.subscription?.plan === 'PRO') {
        return (<></>)
    }
    //FIX THIS
    
    return (
            <Modal
                heading = "Create a Workspace"
                description='Workspaces are good they are poggers. You have been assigned a default one poggers'
                trigger = {<Button className = "bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4">
                    <FolderPlusIcon />
                    Create a workspace
                </Button>}
            >
                <WorkspaceForm />
            </Modal>
        )
}

export default CreateWorkspace 