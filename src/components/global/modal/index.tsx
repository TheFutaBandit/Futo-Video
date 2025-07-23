import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'

type Props = {
    children: React.ReactNode,
    trigger: React.ReactNode,
    heading: string,
    description: string,
}

const modal = ({children, trigger, heading, description}: Props) => {
    
  return (
    <Dialog>
        <DialogTrigger className ="" asChild>
            { trigger }
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {heading}
                </DialogTitle>
                <DialogDescription>
                    {description}
            </DialogDescription>
            </DialogHeader>
                {children}
        </DialogContent>
    </Dialog>
  )
}

export default modal