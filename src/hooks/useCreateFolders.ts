import { useMutationData } from "./useMutationData"

export const useCreateFolders = (workspaceId: string) =>  {
    const {mutate} = useMutationData(
        ['create-folder'], 
        () => createFolder(), 
        "workspace-folders"
     )
} 