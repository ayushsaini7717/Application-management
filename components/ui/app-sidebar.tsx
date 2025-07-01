"use client"
import { Home, Inbox,LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Browse Jobs",
    url: "/job-openings",
    icon: Inbox,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
]

function AppSidebar() {
  const [active,SetActive]=useState(0);
  const [scheduled,Setscheduled]=useState(0);
  const [rejected,SetRejected]=useState(0);
  const { data: session, status } = useSession();

  useEffect(()=>{
    const handler=async ()=>{
      const res=await fetch(`/api/candidate-stats?email=${session?.user?.email}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data=await res.json();
      SetActive(data.active);
      Setscheduled(data.scheduled);
      SetRejected(data.rejected);
    }
    handler();
  },[active,scheduled,rejected])
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CareerPoint</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item) => {
                const handleClick = item.title === "Logout"
                    ? () => signOut()
                    : () => console.log("..");

                return (
                    <SidebarMenuItem key={item.title} onClick={handleClick}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                );
                })}
                <h1 className="mt-4 text-2xl border-t border-gray-200 pt-4 font-semibold">Application Stats</h1>
                <h3 className="text-lg font-semibold">Active: <span className=" text-blue-500">{active}</span></h3>
                <h3 className="text-lg font-semibold">Scheduled: <span className="text-green-500">{scheduled}</span></h3>
                <h3 className="text-lg font-semibold">Rejected: <span className="text-red-500">{rejected}</span></h3>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar;