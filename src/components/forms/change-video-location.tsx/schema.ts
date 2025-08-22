import {z} from 'zod'

export const moveVideoSchema =  z.object({
    folder_id: z.string().nullable().optional(),
    workspace_id: z.string()
})