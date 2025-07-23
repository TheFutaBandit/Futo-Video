import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState, useEffect } from 'react';
import { getUserData } from '@/actions/user';
import { SUBSCRIPTION_PLAN } from '@/generated/prisma';

const useSearch = (key: string, type: 'USERS') => {
    const [query, setQuery] = useState('');
    const [debounce, setDebounce] = useState('');
    const [userData, setUserData] = useState<
    | {
        id: string,
        firstname: string | null,
        lastname: string | null,
        email: string | null,
        image: string | null,
        Subscription: {
            plan: SUBSCRIPTION_PLAN
        } | null,
    }[] | null
    >([])

    const onSearchQuery = (e : React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const debounceTimeoutId = setTimeout(() => {
            setDebounce(query);
        }, 1000)

        return () => clearTimeout(debounceTimeoutId);
    }, [query]);



    const {refetch, isFetching} = useQuery({
        queryKey: [key, debounce],
        queryFn: async({queryKey}: {queryKey: [string, string]}) => {
            if(type === 'USERS') {
                console.log("starting fetch");
                const users = await getUserData(queryKey[1])
                console.log(users);
                if(users.status === 200) {
                    setUserData(users.data);
                    return users.data;
                }
                return null;
            }
            return null;
        },
        enabled: false
    });

    useEffect(() => {
        if(debounce) refetch();
        if(!debounce) setUserData(null);

        return () => {
            debounce
        }
    }, [debounce])
     
    return {query, onSearchQuery, userData, isFetching}
}

export default useSearch 