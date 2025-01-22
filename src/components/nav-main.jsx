// "use client"

// import { ChevronRight } from "lucide-react";
// import Link from "next/link"
// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import {
//     SidebarGroup,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     SidebarMenuSub,
//     SidebarMenuSubButton,
//     SidebarMenuSubItem,
// } from "@/components/ui/sidebar"

// const NavMain = ({ items }) => {
//     return (
//         <>
//             {items.map((group) => (
//                 <SidebarGroup key={group.title}>
//                     <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
//                     <SidebarMenu>
//                         {group.items.map((item) => (
//                             item.additionalItem ? (
//                                 <Collapsible
//                                     key={item.label}
//                                     asChild
//                                     className="group/collapsible"
//                                 >
//                                     <SidebarMenuItem>
//                                         <CollapsibleTrigger asChild>
//                                             <SidebarMenuButton tooltip={item.label}>
//                                                 {item.icon && <item.icon />}
//                                                 <span>{item.label}</span>
//                                                 <ChevronRight
//                                                     className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                                             </SidebarMenuButton>
//                                         </CollapsibleTrigger>
//                                         <CollapsibleContent>
//                                             <SidebarMenuSub>
//                                                 {item.additionalItem?.map((subItem) => (
//                                                     <SidebarMenuSubItem key={subItem.label}>
//                                                         <Link href={subItem.link}>
//                                                             <SidebarMenuSubButton>
//                                                                 {subItem.label}
//                                                             </SidebarMenuSubButton>
//                                                         </Link>
//                                                     </SidebarMenuSubItem>
//                                                 ))}
//                                             </SidebarMenuSub>
//                                         </CollapsibleContent>
//                                     </SidebarMenuItem>
//                                 </Collapsible>
//                             ) :
//                                 <SidebarMenuItem key={item.label}>
//                                     <Link href={item.link}>
//                                         <SidebarMenuButton tooltip={item.label}>
//                                             <item.icon />
//                                             {item.label}
//                                         </SidebarMenuButton>
//                                     </Link>
//                                 </SidebarMenuItem>
//                         ))}
//                     </SidebarMenu>
//                 </SidebarGroup>
//             ))}
//         </>
//     );
// }

// export default NavMain

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const NavMain = ({ items }) => {
    return (
        <>
            {items.map((group) => (
                <SidebarGroup key={group.title}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) =>
                            item.additionalItem ? (
                                <Collapsible
                                    key={item.label}
                                    asChild
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.label}>
                                                {item.icon && <item.icon />}
                                                <span>{item.label}</span>
                                                <ChevronRight
                                                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                                />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.additionalItem?.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.label}>
                                                        {/* Removed extra <a> tag here */}
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={subItem.link}>
                                                                {subItem.label}
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.label}>
                                    <Link href={item.link}>
                                        <SidebarMenuButton tooltip={item.label}>
                                            {item.icon && <item.icon />}
                                            {item.label}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            )
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
};

export default NavMain;
