import { User, User2Icon, UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useSearch from '@/hooks/useSearch';
import React, { useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

// Define the subscription plan type
type SUBSCRIPTION_PLAN = 'FREE' | 'PRO';

type Props = {}

const search = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const { query, onSearchQuery, userData, isFetching } = useSearch('user-search', 'USERS');

  // Mock user data for testing
  const mockUserData = [
    {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      Subscription: {
        plan: 'PRO' as SUBSCRIPTION_PLAN
      }
    },
    {
      id: '2',
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane@example.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      Subscription: {
        plan: 'FREE' as SUBSCRIPTION_PLAN
      }
    }
  ];

  // Use mock data instead of real userData for testing
  const customUserData = mockUserData;

  return (
    <div className = "flex flex-col">
      <div className = "search-section flex items-center gap-2">
      <UserIcon 
        className = "grow"
        height = "20px"
        width = "20px"
      />
      <Input 
        className = "search-bar grow" 
        type = "text"
        placeholder='search for users..'
        value = {query}
        onChange = {onSearchQuery}
      />
      </div>
      {query && 
        (
          isFetching ? (<div>Fetching data</div>) : (
            (!customUserData || customUserData.length === 0) ? <div>userData not found</div> : (
              displayUserData(customUserData)
            )
          )
        )
      }
    </div>
  )
}

const displayUserData = (userData: any) => {
  return (
    <div className='user-data-section mt-4 flex flex-col gap-2'>
      {userData.map((item: any) => (
        <div key={item.id} className = "user-row flex gap-2 items-center border-1 rounded-xl py-2 px-2 ">
          <Avatar>
            <AvatarImage src="item.src" alt="@shadcn" />
            <AvatarFallback><User2Icon /></AvatarFallback>
          </Avatar>
          <div className = "user-info-col flex grow flex-col">
            <div className = "user-name">{item.firstname} {item.lastname}</div>
            <div className = "user-plan max-w-max px-2 rounded-lg bg-[white] text-[#000] text-xs">{item.Subscription.plan}</div>
          </div>
          <div className = "user-invite max-w px-3 py-1 rounded-lg bg-[white] text-sm bold text-[#000] flex items-center flex-center">
            Invite
          </div>
        </div>
      ))}
    </div>
  )
}

export default search 