'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from 'react'

type Props = {
    children: React.ReactNode
}

export const TanQueryProvider = ({children} : Props) => {
    const client = new QueryClient();
    return (
        <QueryClientProvider client = {client}>
            {children}
        </QueryClientProvider>
    )
}



