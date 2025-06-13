"use server"

import { client } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";

export const getUserNotifications = async () => {
    try {
        const user = await currentUser();

    if(!user) {
        return {status: 400, message: "user doesn't exist"};
    }

    const notifications = client.user.findUnique({
        where : {
            clerkid: user.id
        }, 
        select : {
            Notification : true,
            _count : {
                select : {
                    Notification : true
                }
            }
        }
    })

    if(notifications && notifications.Notification.length > 0) {
        return { status: 200, data: notifications}
    } else {
        return {status: 400, data: []}
    }
    

    } catch(error) {
        return {
            status: 403, 
            data: 'not found'
        }
    }
}