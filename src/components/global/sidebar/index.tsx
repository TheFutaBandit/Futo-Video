"use client"

import React from 'react'
import { CircleOff, PlusCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { getUserWorkspaces } from '@/actions/workspace';
import { UserWorkspacesType } from '@/types/index.types';
import { useRouter } from 'next/navigation';
import { SelectGroup, SelectLabel, Separator } from '@radix-ui/react-select'
import Modal from '../modal';

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {

  const router = useRouter();

  const changeActiveWorkspaceId = (workspaceId: string) => {
    router.push(`/dashboard/${workspaceId}`);
  }

  const {data, isFetched} = useQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getUserWorkspaces()
  })

  if(isFetched) {
    console.log(data);
  }

  const workspace = data?.data;
  
  return (
    <div className = "h-full w-[250px] bg-[#111111] flex flex-none relative flex-col p-4 items-center overflow-hidden gap-4">
      <div className = "logo-section bg-[#111111] flex items-center justify-center items-center gap-2">
        <CircleOff 
          height={40}
          width={40}
          className = "text-white" 
        />
        <p className = "text-2xl">Futo</p>
      </div>
      <Select
          defaultValue={activeWorkspaceId}
          onValueChange={changeActiveWorkspaceId}
      >
          <SelectTrigger className="w-full bg-transparent text-neutral-400 border-neutral-800">
            <SelectValue placeholder="Select a workspace" className="text-neutral-400"/>
          </SelectTrigger>
          <SelectContent className="bg-[#111111] backdrop-blur-xl fborder-neutral-800">
            <SelectGroup className="text-xs p-1">
              <SelectLabel className="mb-2 text-neutral-400">User Workspaces</SelectLabel>
              <Separator />
              {workspace?.Workspace?.map((workspace) => (
                <SelectItem 
                  key={workspace.id} 
                  value={workspace.id}
                  className="text-neutral-400 focus:bg-neutral-800 focus:text-neutral-400"
                >
                  {workspace.name}
                </SelectItem> 
              ))}
            </SelectGroup>
            <SelectGroup className="text-xs p-1">
              <SelectLabel className="mb-2 text-neutral-400">Member Workspaces</SelectLabel>
              <Separator />
              {(workspace?.members?.length !== 0) && workspace?.members?.map((member) => (
                <SelectItem 
                  key={member.Workspace?.id} 
                  value={member.Workspace?.id || ''}
                  className="text-neutral-400 focus:bg-neutral-800 focus:text-neutral-400"
                >
                  {member.Workspace?.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
      </Select>
      <Modal
        trigger = {
        <span className = "cursor-pointer flex justify-center items-center w-full bg-neutral-800/90 hover:bg-neutral-800/60 rounded-sm text-sm w-full p-[4px] gap-2">
          <PlusCircle size={15} className="text-neutral-400/80 fill-neutral-500"/>
          <span className = "text-neutral-400/80 font-semibold text-xs">Invite to workspace</span>
        </span>}
        heading="Invite To Workspace"
        description='Invite other users to your workspace'
      >
        <div></div>
      </Modal>
      Sidebar
    </div>
  )
}

export default Sidebar