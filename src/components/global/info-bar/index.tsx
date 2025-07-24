import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { CameraIcon, Search, Upload } from 'lucide-react'
import React from 'react'

type Props = {}

const InfoBar = (props: Props) => {
    
  return (
    <header className = "pl-20 md:pl-[250px] fixed p-4 w-full flex justify-between items-center gap-4 ">
        <div className="flex gap-4 justify-center items-center border-2 rounded-full w-full px-4 max-w-lg">
            <Search
                size = {25}
                className = "text-[#707070]"
            />
            <Input
                className = "!bg-transparent focus:!border-none border-none !placeholder-neutral-500"
                placeholder = "search for people, workspaces, anything"
            />
        </div>
        <div className = "flex items-center gap-4">
            <Button className = "bg-[#9D9D9D] flex items-center  justify-center">
                <Upload
                    size = {20}
                />
                <span className = "flex items-center gap-20">Upload</span>
            </Button>
            <Button className = "bg-[#9D9D9D] flex items-center  justify-center">
                <CameraIcon
                    size = {20}
                />
                <span className = "flex items-center gap-20">Record</span>
            </Button>
            <UserButton />
        </div>
    </header>
  ) 
}

export default InfoBar 