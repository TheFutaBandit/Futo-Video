import React from 'react';
import { onAuthenticateUser } from '@/actions/user';
import { verifyAccessToWorkspace } from '@/actions/workspace';
import { redirect } from 'next/navigation';
import {
    QueryClient,
    HydrationBoundary,
    dehydrate
} from '@tanstack/react-query';
import { getWorkspaceFolders, getWorkspaceVideos, getUserWorkspaces,  } from '@/actions/workspace';
import { getUserNotifications } from '@/actions/notifications';
import Sidebar from '@/components/global/sidebar';
import InfoBar from '@/components/global/info-bar';
import GlobalCard from '@/components/global/global-card';
import GlobalHeader from '@/components/global/global-header';

type Props = {
    params: {workspaceid: string}
    children: React.ReactNode;
}

const layout = async ({params: {workspaceid}, children}: Props) => {
    const auth = await onAuthenticateUser();

    if(!auth.user?.Workspace || auth.user?.Workspace.length === 0) {
        return { status: 400 }
    } 

    const hasAccess = await verifyAccessToWorkspace(workspaceid);

    if(hasAccess.status !== 200) {
        redirect(`/dashboard/${auth.user?.Workspace[0].id}`)
    }

    if(!hasAccess.data?.workspace) {
        return null;
    }

    const queryClient = new QueryClient();

    const folders = await queryClient.prefetchQuery({
        queryKey: ["workspace-folders"],
        queryFn: () => getWorkspaceFolders(workspaceid)
    })
    
    const videos = await queryClient.prefetchQuery({
        queryKey: ["user-videos"],
        queryFn: () => getWorkspaceVideos(workspaceid)
    })

    const workspace = await queryClient.prefetchQuery({
        queryKey: ["user-workspaces"],
        queryFn: () => getUserWorkspaces()
    })

    const notifications = await queryClient.prefetchQuery({
        queryKey: ["user-notifications"],
        queryFn: () => getUserNotifications()
    })
    
  return (
    <HydrationBoundary state = {dehydrate(queryClient)}>
        <div className = "flex h-screen w-screen">
            <Sidebar activeWorkspaceId={workspaceid} />
            <div className = "w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
                <GlobalHeader workspace = {hasAccess.data!.workspace} />
                {children}
            </div>
        </div>
    </HydrationBoundary>
  )
}

export default layout;