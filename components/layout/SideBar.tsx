import {BsHouseFill,BsBellFill} from "react-icons/bs"
import {FaUser} from "react-icons/fa"
import {BiLogOut} from "react-icons/bi"
import SideBarLogo from "./SideBarLogo"
import SideBarItem from "./SideBarItem"
import SideBarTweetButton from "./SideBarTweetButton"
import useCurrentUser from "@/hooks/useCurrentUser"
import {signOut} from 'next-auth/react'



const SideBar = () =>{
    const {data:currentUser} = useCurrentUser()
    const items = [{
        label:"Home",
        href:"/",
        icon:BsHouseFill
    },{
        label:"Notifications",
        href:"/notifications",
        icon:BsBellFill,
        auth:true,
        alert:currentUser?.hasNotification
    },{
        label:"Profile",
        href:`/users/${currentUser?.id}`,
        icon:FaUser,
        auth:true
    }]


    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SideBarLogo />
                    {items.map(item => (
                        <SideBarItem key={item.href} href={item.href} label={item.label} icon={item.icon} auth={item.auth} alert={item.alert}/>
                    ))}
                    {currentUser && 
                    <SideBarItem onClick={()=>signOut()} icon={BiLogOut} label="LogOut"/>
                    }
                    <SideBarTweetButton/>
                </div>
            </div>
        </div>
    )
}

export default SideBar