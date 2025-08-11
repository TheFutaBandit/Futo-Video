export type WorkspaceType = {
    id: string;
    name: string;
    type: string;
};

export type SubscriptionType = {
    plan: string;
};

export type MemberWorkspaceType = {
    Workspace: WorkspaceType;
};

export type UserWorkspacesType = {
    id: string;
    Workspace: WorkspaceType[];
    Subscription: SubscriptionType;
    members: {
        Workspace: WorkspaceType;
    }[];
};

export type UserNotificationsType = {
    Notification: {
        id: string;
        userId: string | null;
        content: string;
    }[];
    _count: {
        Notification: number;
    };
}

export type FolderProps = {
    status: number,
    data: {
        name: string,
        _count : {
            videos: number
        }
    }
}

export type VideosProps = {
    status: number,
    data: {
        User : {
            firstname: string | null,
            lastname: string | null,
            image: string | null
        } | null
        id: string,
        processing: boolean,
        Folder: {
            id: string,
            name: string
        } | null
        createdAt: Date
        title: string | null
        source : string
    }[]
}

// Example usage:
// const userWorkspaces: UserWorkspacesType = await client.user.findUnique({...});
