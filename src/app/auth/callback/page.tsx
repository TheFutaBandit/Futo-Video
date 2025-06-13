import React from 'react'
import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation';

type Props = {}

const AuthPage = async (props: Props) => {
    //Authentication check
    const payload = await onAuthenticateUser();

    if(payload.status === 200 || payload.status === 201) {
      return redirect(`/dashboard/${payload.user?.Workspace[0].id}`);
    } else if (payload.status === 400 || payload.status === 500 || payload.status === 404) {
      return redirect(`auth/sign-in`)
    }

}

export default AuthPage
