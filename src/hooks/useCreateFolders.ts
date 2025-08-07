import { createFolder } from "@/actions/workspace"
import { useMutationData } from "./useMutationData"

export const useCreateFolders = (workspaceId: string) =>  {

    console.log("THE WORKSPACE ID IS ", workspaceId);
    const {mutate} = useMutationData(
        ['create-folder'], 
        () => createFolder(workspaceId), 
        "workspace-folders"
    )

    const onCreateNewFolder = () => mutate({name: 'untitled', id: 'optimistic--id'})
    
        

    return {onCreateNewFolder};
} 