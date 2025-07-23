import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    
    Icon: React.ElementType
    title: string
    href: string
    select: boolean
    notifications?: number
}

const Sidebaritem= ({Icon, title, href, select, notifications} : Props) => {
    
  return (
    <li className = "my-[5px] cursor-pointer">
        <Link 
            className = {
                cn(
                    "flex items-center justify-center rounded-lg group hover:bg-[#1D1D1D]",
                    select ? "bg-[#1D1D1D]" : ""
                )}
            href = {href}
        >
            <div className = "flex items-center">
                <Icon strokeWidth={1.5} color={select ? '#9D9D9D' : '#545454'}/>
                <span className = {cn(
                    'font-bold group-hover:text-[#9D9D9D] transition-all truncate w-32',
                    select ? 'text-[#9D9D9D]' : 'text-[#545454]'
                )}>{title}</span>
            </div>
        </Link>
    </li>
  )
}

export default Sidebaritem;