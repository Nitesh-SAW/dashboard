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
      { icon: MdDashboard, label: "Dashboard", href: "#" },
      { icon: MdOutlineApps, label: "Sliders", href: "#" },
      {
        icon: GrServices,
        label: "Services",
        href: "#",
        additionalItem: [
          { label: "Service List", href: "#" },
          { label: "Add Service", href: "#" }
        ]
      },

      {
        icon: FaClipboardCheck,
        label: "Album",
        href: "#",
        additionalItem: [
          { label: "Album List", href: "#" },
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
          { label: "Pages List", href: "#" },
          { label: "Add Page", href: "#" },
          { label: "Logs", href: "#" }
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

// export function AppSidebar({...props}) {
//   return (
//     (<Sidebar {...props} >
//       <SidebarHeader>
//         <SearchForm />
//       </SidebarHeader>
//       <SidebarContent>
//         {/* We create a SidebarGroup for each parent. */}
//         {data.map((item) => (
//           <SidebarGroup key={item.title}>
//             <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {item.items.map((item) => (
//                   <SidebarMenuItem key={item.label}>
//                     <SidebarMenuButton asChild isActive={item.isActive}>
//                       <a href={item.href}>{item.label}</a>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>)
//   );
// }

const AppSidebar = ({ ...props }) => {

  const [activeGroup, setActiveGroup] = React.useState("");

  const toggleGroup = (label) => {
    setActiveGroup(activeGroup === label ? "" : label);
  };

  return (
    (<Sidebar {...props}>
      <div className="w-full relative">
      <SidebarTrigger classNamem=""/>
      </div>
      <SidebarContent>
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-lg px-4 py-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {
                group.items.map((item) => (
                  item.additionalItem ? (
                    <Collapsible className="group/collapsible">

                      <CollapsibleTrigger asChild key={item.href}>
                        <SidebarMenuButton>
                          <item.icon />
                          {item.label}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {item.additionalItem.map((subItem) => (
                          <SidebarMenuSub key={subItem.href}>
                            <SidebarMenuSubItem>
                              {subItem.label}
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ))}
                      </CollapsibleContent>

                    </Collapsible>
                  ) : (
                    <div
                      key={item.href}
                    >
                      <SidebarMenuButton>
                        <div className="flex justify-start items-center gap-2">
                          <item.icon />
                          {item.label}
                        </div>
                      </SidebarMenuButton>
                    </div>
                  )
                ))
              }
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>)
  );

}

export default AppSidebar