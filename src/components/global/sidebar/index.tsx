"use client"

import React from 'react'
import { CircleOff, Menu, PlusCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { getUserWorkspaces } from '@/actions/workspace';
import { UserNotificationsType, UserWorkspacesType } from '@/types/index.types';
import { usePathname, useRouter } from 'next/navigation';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select'
import { Separator } from '@/components/ui/separator'
import Modal from '../modal';
import workspaceHolderIcon from "./workspaceHolderIcon"

import Search from '../search/search';
import { MENU_ITEMS } from '@/constants';
import Sidebaritem from './sidebar-items';
import { getUserNotifications } from '@/actions/notifications';
import GlobalCard from '../global-card';
import { Button } from '@/components/ui/button';
import Loader from '../loader';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {

  const router = useRouter();
  const pathname = usePathname();

  const changeActiveWorkspaceId = (workspaceId: string) => {
    router.push(`/dashboard/${workspaceId}`);
  }

  const {data: notifications} = useQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getUserNotifications()
  })

  const notificationCount = notifications?.data?._count;

  const menu_items = MENU_ITEMS(activeWorkspaceId);

  const {data, isFetched} = useQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getUserWorkspaces()
  })


  if(isFetched) {
    console.log(data);
  }

  const workspace = data?.data;

  const currentWorkspacePlan = workspace?.Workspace.find((item) => {item.id === activeWorkspaceId})?.type;
  
  const SidebarSection = (
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
      {currentWorkspacePlan === 'PUBLIC' && workspace?.Subscription?.plan === 'PRO' && (<Modal
        trigger = {
        <span className = "cursor-pointer flex justify-center items-center w-full bg-neutral-800/90 hover:bg-neutral-800/60 rounded-sm text-sm w-full p-[4px] gap-2">
          <PlusCircle size={15} className="text-neutral-400/80 fill-neutral-500"/>
          <span className = "text-neutral-400/80 font-semibold text-xs">Invite to workspace</span>
        </span>}
        heading="Invite To Workspace"
        description='Invite other users to your workspace'
      >
        <Search></Search>
      </Modal>)}
      <p className = "w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className = "w-full">
        <ul>
          {menu_items.map((item, index) => <Sidebaritem key={item.title} Icon = {item.Icon} title = {item.title} href = {item.href} select = {pathname === item.href} notifications={item.title === 'notifications' && (notificationCount?.Notification ?? 0) || 0}/>)}
        </ul>
      </nav>
      <Separator className='w-4/5'/>
      <p className = "w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>

      {
        workspace && 
        workspace.Workspace.length === 1 && 
        workspace.members.length === 0 
        && 
        <div className = "w-full mt-[-10px]">
          <p className = "text-sm text-[#3c3c3c]">{workspace.Subscription?.plan === 'FREE' ? 'Upgrade to create workspaces' : 'No workspaces'}</p>
        </div>
      }
      
      {/* workspaces user own */}
      {/* <nav className = "w-full">
        <ul className = " h-[250px] overflow-x-hidden overflow-y-auto fade-layer">
          {workspace && 
            workspace.Subscription!.plan !== 'FREE' &&
            workspace?.Workspace.length > 0 && 
            workspace.Workspace.map((item, index) => 
              <Sidebaritem 
                key = {index}
                title = {item.name}
                href = {`/dashboard/${item.id}`}
                select = {pathname === `/dashboard/${item.id}`}
                Icon = {workspaceHolderIcon}
              />
           )
          }
          {workspace && workspace?.members.length > 0 && 
            workspace.members.map((item, index) => 
              <Sidebaritem 
                key = {item.Workspace!.name}
                title = {item.Workspace!.name}
                href = {`/dashboard/${item.Workspace!.id}`}
                select = {pathname === `/dashboard/${item.Workspace!.id}`}
                Icon = {workspaceHolderIcon}
              />
           )
          }
        </ul>
      </nav> */}

      <Separator className = "w-4/5" />
      {workspace?.Subscription?.plan === "FREE" && 
      <GlobalCard
        title = "Upgrade to Pro"
        description = "Unlock AI features like damn many idk"
        footer = {<Button className = "text-sm w-full"><Loader>Upgrade</Loader></Button>}
      />}
    </div>
  )

  return (
  <div className = "full">
    <div className = "md:hidden fixed my-4">
      <Sheet>
        <SheetTrigger
          asChild
          className = "ml-2"
        >
          <Button 
          variant={'ghost'}
          className = "mt-[2px]"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side = {'left'}
          className = "p-0 w-fit h-full"
        >
            {SidebarSection}
        </SheetContent>
      </Sheet>
    </div>
    <div className = "md:block hidden h-full">
      {SidebarSection}
    </div>
  </div>
  )
}

export default Sidebar