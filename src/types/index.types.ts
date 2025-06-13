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

// Example usage:
// const userWorkspaces: UserWorkspacesType = await client.user.findUnique({...});
