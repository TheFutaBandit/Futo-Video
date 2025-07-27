import { CreateWorkspace } from "@/actions/workspace"
import { useMutation } from "@tanstack/react-query"

export const useCreateWorkspace = () => {
    return useMutation({
        mutationKey: ['create-workspace', 'user-workspaces'],
        mutationFn: (data: { name: string }) => CreateWorkspace(data.name),
    })
}