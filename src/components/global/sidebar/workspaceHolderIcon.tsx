import React from 'react'

type Props = {
    strokeWidth?: number
    color?: string
    title?: string
}

const workspaceHolderIcon = ({strokeWidth, color, title}: Props) => {
    
  return (
    <div className = "flex items-center justify-center bg-[#545454] text-[#1D1D1D] font-bold w-6 h-6 rounded">
        {title ? title.charAt(0).toUpperCase() : 'E'}
    </div>
  )
}

export default workspaceHolderIcon