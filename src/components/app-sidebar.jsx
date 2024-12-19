'use client'
import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { VersionSwitcher } from "@/components/version-switcher"
import { GrServices } from "react-icons/gr"
import { IoMdSettings } from "react-icons/io";
import { ImArrowRight } from "react-icons/im";
import { MdOutlineApps, MdMoveToInbox, MdDashboard } from "react-icons/md"
import { FaClipboardCheck, FaUsers, FaUserFriends, FaHashtag } from "react-icons/fa";
import { LuBraces } from "react-icons/lu";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible'
// This is sample data.
const data = [
  {
    title: "Navigation",
    items: [
      { icon: MdDashboard, label: "Dashboard", href: "/admin/home" },
      { icon: MdOutlineApps, label: "Sliders", href: "/admin/slider" },
      {
        icon: GrServices,
        label: "Services",
        href: "#",
        additionalItem: [
          { label: "Service List", href: "/admin/services" },
          { label: "Add Service", href: "/admin/services/create" }
        ]
      },

      {
        icon: FaClipboardCheck,
        label: "Album",
        href: "#",
        additionalItem: [
          { label: "Album List", href: "/admin/albums" },
          { label: "Add Album", href: "#" }
        ]
      },
    ]
  },

  {
    title: "CMS",
    items: [
      {
        icon: FaClipboardCheck,
        label: "Pages",
        href: "#",
        additionalItem: [
          { label: "Pages List", href: "/admin/pagelist" },
          { label: "Add Page", href: "/admin/addpage" },
          { label: "Logs", href: "/admin/log" }
        ]
      },

      {
        icon: FaClipboardCheck,
        label: "Events, News & Blogs",
        href: "#",
        additionalItem:
          [
            { label: "Category List", href: "#" },
            { label: "Listing", href: "#" },
            { label: "Add New", href: "#" }
          ]
      },

      { icon: FaUsers, label: "Testimonials", href: "#" },

      {
        icon: GrServices,
        label: "Forms",
        href: "#",
        additionalItem:
          [
            { label: "Form List", href: "#" },
            { label: "Add Form", href: "#" }
          ]
      },

    ]
  }
  , {
    title: "SEO",
    items:
      [
        {
          icon: LuBraces,
          label: "Schema",
          href: "schema",
          additionalItem:
            [
              { label: "Schema List", href: "#" },
              { label: "Add Schema", href: "#" }
            ]
        },

        {
          icon: FaHashtag,
          label: "Seo Meta",
          href: "#",
          additionalItem:
            [
              { label: "SEO List", href: "#" },
              { label: "Add SEO Mata", href: "#" }
            ]
        },
        {
          icon: ImArrowRight,
          label: "URL Redirection",
          href: "#",
          additionalItem:
            [
              { label: "Redirection List", href: "#" },
              { label: "Add URL", href: "#" }
            ]
        },
        {
          icon: FaUserFriends,
          label: "User Management",
          href: "#",
          additionalItem:
            [
              { label: "Users", href: "#" },
              { label: "Groups", href: "#" }
            ]
        },
        { icon: IoMdSettings, label: "Settings", href: "#" },
      ]
  }
  , {
    title: "Additionals",
    items:
      [
        {
          icon: MdMoveToInbox,
          label: "Inbox",
          href: "#",
          additionalItem:
            [
              { label: "Contact", href: "#" },
              { label: "Subscribe", href: "#" }
            ]
        },

        { icon: MdOutlineApps, label: "Menu", href: "#" },
        { icon: GrServices, label: "Footer", href: "#" }
      ]
  }
]

const AppSidebar = ({ ...props }) => {

  const [activeGroup, setActiveGroup] = React.useState("");

  const toggleGroup = (label) => {
    setActiveGroup(activeGroup === label ? "" : label);
  };

  return (
    (<Sidebar {...props}>
      <SidebarContent className="bg-slate-900 text-white">
        <SidebarHeader>
          Santosh Yadav
        </SidebarHeader>
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="uppercase text-lg py-6 text-slate-50">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {
                group.items.map((item) => (
                  item.additionalItem ? (
                    <Collapsible
                      className="group/collapsible"
                      open={activeGroup === item.label}
                      onOpenChange={() => toggleGroup(item.label)}
                      key={item.label}
                    >

                      <CollapsibleTrigger asChild >
                        <SidebarMenuButton className="flex justify-between items-center rounded-none pl-5 py-5">
                          <Link href={item.href} className="flex justify-center items-center gap-2 text-[5] text-md">
                            <item.icon />
                            {item.label}
                          </Link>
                          <ChevronRight className={`transition-transform duration-300 ${activeGroup === item.label ? "rotate-90" : "rotate-0"
                            }`} />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <div className="cursor-pointer bg-white text-black">
                        <CollapsibleContent className="space-y-2 pl-5 py-2">
                          {item.additionalItem.map((subItem) => (
                            <SidebarMenuSub key={subItem.label}>
                              <Link href={subItem.href} className="text-md">
                                <SidebarMenuSubItem>
                                  {subItem.label}
                                </SidebarMenuSubItem>
                              </Link>
                            </SidebarMenuSub>
                          ))}
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ) : (
                    <div
                      key={item.label}
                    >
                      <Link href={item.href}>
                        <SidebarMenuButton className="flex justify-start items-center gap-2 rounded-none pl-5 py-5 text-[5]">
                          <item.icon />
                          {item.label}
                        </SidebarMenuButton>
                      </Link>

                    </div>
                  )
                ))
              }
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>)
  );

}

export default AppSidebar