"use server"

import { client } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";



export const verifyAccessToWorkspace = async (workspaceId : string) => {
    try {
        const user = await currentUser();

    if(!user) {
        return {status: 400, message: "user doesn't exist"};
    }

    const isUserInWorkspace = await client.workspace.findUnique({
        where : {
            id: workspaceId,
            OR : [
                {
                    User : {
                        clerkid: user.id
                    }
                },
                {
                    members: {
                        some: {
                            User : {
                                clerkid: user.id
                            }
                        }
                    }
                }
            ]
        }
    })
    return { status: 200, data: { workspace: isUserInWorkspace }}
    } catch(error) {
        return {
            status: 403, 
            data: {workspace: null}
        }
    }
    
}

export const getWorkspaceFolders = async (workspaceId: string) => {
    try {
        const user = await currentUser();
    
        if(!user) {
            return {status: 400, message: "user doesn't exist"};
        }

        const folders = await client.folder.findMany({
            where : {
                workspaceId
            },
            include : {
                _count : {
                    select : {
                        videos: true
                    }
                }
            }
        })

        if(folders && folders.length > 0) {
            return {status: 200, data: folders}
        }

        return {status: 400, message: "folders not found"}


    } catch (error) {
        return {status: 500, message: "error retrieving folders"}
    }
}

export const getWorkspaceVideos = async (workspaceId: string) => {
    try {
        const user = await currentUser();
    
        if(!user) {
            return {status: 404, message: "user doesn't exist"};
        }

        const videos = await client.video.findMany({
            where : {
                OR: [{workspaceId}, {folderId: workspaceId}],
            },
            select : {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                source: true,
                views: true,
                processing: true,
                Folder : {
                    select : {
                        id: true,
                        name: true
                    }
                },
                User : {
                    select : {
                        firstname: true,
                        lastname: true,
                        image: true
                    }
                }
            },
            orderBy : {
                createdAt: 'asc'
            }
        })

        if(videos && videos.length > 0) {
            return {status: 200, data: videos}
        }

        return {status: 400, message: "videos not found"}


    } catch (error) {
        return {status: 500, message: "error retrieving videos"}
    }
}

export const getUserWorkspaces = async () => {
    try {
        const user = await currentUser();

    if(!user) {
        return {status: 404, message: "user doesn't exist"};
    }

    const userWorkspaces = await client.user.findUnique({
        where : {
            clerkid: user.id
        }, 
        select : {
            Workspace : {
                select : {
                    id: true,
                    name: true,
                    type: true
                }
            },
            Subscription : {
                select : {
                    plan: true
                }
            },
            members : {
                select : {
                    Workspace : {
                        select : {
                            id: true,
                            name: true,
                            type: true
                        }
                    } 
                }
            }
        }
    });

    return { status: 200, data: userWorkspaces }

    } catch(error) {
        return {
            status: 404, 
            message: "workspaces not found"
        }
    }
}