import React from 'react'
import Spinner from './spinner'
import { cn } from '@/lib/utils'

type Props = {
    status: boolean,
    color?: string,
    className?: string,
    children?: React.ReactNode
}

const Loader = ({status, color, children, className}: Props) => {

    return (status === false ? <div className={cn(className)}><Spinner color = {color}/></div> : children)
}

export default Loader