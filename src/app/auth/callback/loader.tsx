import React from 'react'
import Spinner from '@/components/global/loader/spinner'

type Props = {}

const AuthLoader = (props: Props) => {
    
  return (
    <div className = "h-screen w-full flex justify-center items-center"><Spinner /></div>
  )
}

export default AuthLoader