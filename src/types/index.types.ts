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

// Example usage:
// const userWorkspaces: UserWorkspacesType = await client.user.findUnique({...});
