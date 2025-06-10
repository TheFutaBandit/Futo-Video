import { MenuIcon, CircleOff, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}

const LandingPageNavBar = (props: Props) => {
  return (
    <div className = "flex w-full justify-between items-center">
        <div className = "text-3xl font-semibold flex gap-x-3 items-center">
            <MenuIcon className = "w-6 h-6 text-white" />
            <CircleOff className = "w-[40] h-[40] text-white" />
            Futo
        </div>
        <div className = "hidden lg:flex gap-x-10 items-center">
            <Link 
                href = "/"
                className = "bg-[#7320DD] px-5 py-2 rounded-full text-lg hover:bg-[#7320DD]/80 transition-all duration-300"
            >Home</Link>
            <Link href = "/">About</Link>
            <Link href = "/">Contact</Link>
        </div>
        <Link href = "/auth/sign-in">
            <Button className = "text-base flex gap-x-2">
                <User fill="#000" />login
            </Button>
        </Link>
    </div>
  )
}

export default LandingPageNavBar