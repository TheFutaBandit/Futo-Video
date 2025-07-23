"use server"

import { client } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser();

        if(!user) {
            return { status: 403 };
        }

        const userExist = await client.user.findUnique({
            where : {
                clerkid: user.id
            }, 
            include : {
                Workspace : {
                    where : {
                        User : {
                            clerkid: user.id
                        }
                    }
                }
            }
        })
        //fishy thing here, we are only returning the workspace, not any other extra details
        //let's see
        if(userExist) {
            return { status: 200, user: userExist };
        }
        

        const newUser = await client.user.create({
            data : {
                email: user.emailAddresses[0].emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                clerkid: user.id,
                image: user.imageUrl,
                Studio: {
                    create: {}
                },
                Subscription: {
                    create: {}
                },
                Workspace: {
                    create: {
                        name: `${user.firstName}'s Workspace`,
                        type: "PRIVATE"
                    }
                }
            },
            include : {
                Workspace : {
                    where : {
                        User : {
                            clerkid: user.id
                        }
                    }
                },
                Subscription : {
                    select : {
                        plan: true
                    }
                }
            }
        })

        if(newUser) {
            return { status: 201, user: newUser }
        }

        return {status: 400}

    } catch (error) {
        return {status: 500, message: "error in creating user"};
    }
}

export const getUserData = async (query: string) => {
    try {
        const user = await currentUser();

        if(!user) {
            return {status: 404, data: null};
        }

        const userList = await client.user.findMany({
            where : {
                OR : [
                    {firstname : {contains: query}},
                    {email : {contains: query }}, 
                    {lastname : {contains: query }}
                ],
                NOT: {
                    clerkid: user.id
                }
            },
            select : {
                id: true,   
                firstname: true,
                lastname: true,
                email: true,
                image: true,
                Subscription : {
                    select: {
                        plan: true
                    }
                }
            }
        })

        return {status: 200, data: userList}
    } catch(err) {
        return {status: 500, data: null}
    }
}