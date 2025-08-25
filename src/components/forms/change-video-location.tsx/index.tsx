import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hooks/useMoveVideos";
import React from "react";

type PropType = {
    videoId: string,
    currentFolder?: string,
    currentWorkspace?: string,
    currentFolderName?: string,
}


const ChangeVideoLocation = ({
    videoId,
    currentFolder,
    currentFolderName,
    currentWorkspace
} : PropType) => {
    const {register, isPending, folders,  onFormSubmit, workspaces, isFetching, isFolders} = useMoveVideos(videoId, currentWorkspace!)

    const folder = folders.find((f) => f.id === currentFolder)

    const workspace = workspaces.find(((f) => f.id === currentWorkspace))
    return (
        <form className = "flex flex-col gap-y-5">
            <div className = "border-[1px] rounded-xl p-5">
                <h2 className = "text-xs mb-5 text-[#a4a4a4]">Current</h2>
                {workspace && <p className = "text-[#a4a4a4]">{workspace.name} Workspace</p>}
                <p className = "text-[#a4a4a4] text-sm">This video has no fodler</p>
            </div>
            <Separator orientation="horizontal" />
            <div className = "flex flex-col gap-y-5 border-[1px] rounded-xl">
                <h2 className = "text-xs text-[#a4a4a4]">To</h2>
                <Label className=  "flex-col gap-y-2 flex">
                    <p className = "text-xs">Workspace</p>
                    <select
                        // {...register("workspace_id")}
                        className = "rounded-xl text-base bg-transparent"
                    >
                        <option
                            className = "text-[#a4a4a4]"
                            value = "move"
                        ></option>
                    </select>
                </Label>
            </div>
        </form>
    )
}

export default ChangeVideoLocation;