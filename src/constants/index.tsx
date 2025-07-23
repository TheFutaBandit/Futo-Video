import { Bell, CreditCard, File, HomeIcon, Settings } from "lucide-react"

export const MENU_ITEMS = (
    workspaceId: string
 ) : { title: string, href: string, Icon: React.ElementType }[] => {
    return [
        {
            title: 'Home', 
            href: `/dashboard/${workspaceId}/home`, 
            Icon: HomeIcon
        },
        {
            title: 'My Library', 
            href: `/dashboard/${workspaceId}`, 
            Icon: File 
        },
        {
            title: 'Notifications', 
            href: `/dashboard/${workspaceId}/notifications`, 
            Icon: Bell 
        },
        {
            title: 'Billing', 
            href: `/dashboard/${workspaceId}/billing`, 
            Icon: CreditCard 
        },
        {
            title: 'settings', 
            href: `/dashboard/${workspaceId}/settings`, 
            Icon: Settings 
        },
    ]
}