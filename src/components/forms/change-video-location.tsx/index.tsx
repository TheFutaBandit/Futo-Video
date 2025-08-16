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
    return (
        <form className = "flex flex-col gap-y-5">
            <div className = "border-[1px] rounded-xl p-5">
                <h2 className = "text-xs mb-5 text-[#a4a4a4]">Current</h2>
                {workspace && <p className ="text-[#a4a4a4]"}
            </div>
        </form>
    )
}

export default ChangeVideoLocation;