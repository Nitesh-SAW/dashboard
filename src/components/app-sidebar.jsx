"use client";
import * as React from "react";
import NavMain from "./nav-main";
import { GrServices } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { ImArrowRight } from "react-icons/im";
import { RiQuestionnaireLine } from "react-icons/ri";
import { MdOutlineApps, MdMoveToInbox, MdDashboard } from "react-icons/md";
import {
  FaClipboardCheck,
  FaUsers,
  FaUserFriends,
  FaHashtag,
  FaCalendarDay,
  FaEnvelopeOpen
} from "react-icons/fa";
import { LuBraces } from "react-icons/lu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Navigation",
      items: [
        { icon: MdDashboard, label: "Dashboard", link: "/admin/home" },
        { icon: MdOutlineApps, label: "Sliders", link: "/admin/slider" },
        {
          icon: GrServices,
          label: "Services",
          link: "#",
          additionalItem: [
            { label: "Service List", link: "/admin/services" },
            { label: "Add Service", link: "/admin/services/create" },
          ],
        },

        {
          icon: FaClipboardCheck,
          label: "Album",
          link: "#",
          additionalItem: [
            { label: "Album List", link: "/admin/albums" },
            { label: "Add Album", link: "#" },
          ],
        },
      ],
    },

    {
      title: "CMS",
      items: [
        {
          icon: FaClipboardCheck,
          label: "Pages",
          link: "#",
          additionalItem: [
            { label: "Pages List", link: "/admin/pagelist" },
            { label: "Add Page", link: "/admin/addpage" },
            { label: "Logs", link: "/admin/log" },
          ],
        },

        {
          icon: FaClipboardCheck,
          label: "Blogs",
          link: "#",
          additionalItem: [
            { label: "Category List", link: "/admin/blogs/categoryList" },
            { label: "Listing", link: "#" },
            { label: "Add New", link: "#" },
          ],
        },

        { icon: FaUsers, label: "Testimonials", link: "#" },

        {
          icon: GrServices,
          label: "Forms",
          link: "#",
          additionalItem: [
            { label: "Form List", link: "#" },
            { label: "Add Form", link: "#" },
          ],
        },
      ],
    },
    {
      title: "SEO",
      items: [
        {
          icon: LuBraces,
          label: "Schema",
          link: "schema",
          additionalItem: [
            { label: "Schema List", link: "#" },
            { label: "Add Schema", link: "#" },
          ],
        },

        {
          icon: FaHashtag,
          label: "Seo Meta",
          link: "#",
          additionalItem: [
            { label: "SEO List", link: "#" },
            { label: "Add SEO Mata", link: "#" },
          ],
        },
        {
          icon: ImArrowRight,
          label: "URL Redirection",
          link: "#",
          additionalItem: [
            { label: "Redirection List", link: "#" },
            { label: "Add URL", link: "#" },
          ],
        },
        {
          icon: FaUserFriends,
          label: "User Management",
          link: "#",
          additionalItem: [
            { label: "Users", link: "#" },
            { label: "Groups", link: "#" },
          ],
        },
        { icon: IoMdSettings, label: "Settings", link: "#" },
        { icon: FaUserFriends, label: "Feedback", link: "/admin/feedbacks" },
      ],
    },
    {
      title: "Careers/Recruitment",
      items: [
        {
          icon: FaUserFriends,
          label: "Jobs",
          link: "#",
          additionalItem: [
            { label: "Job List", link: "/admin/career/jobs" },
            { label: "Add Jobs", link: "/admin/career/jobs/create" },
            { label: "Skills", link: "/admin/career/skill" },
            { label: "Department", link: "/admin/career/departments" },
            { label: "Question", link: "/admin/career/questions" }
          ]
        },
        {
          icon: FaUserFriends,
          label: "Job Applications",
          link: "#"
        },
        {
          icon: FaCalendarDay,
          label: "Interview Schedules",
          link: "/admin/career/interview-schedule"
        },
        {
          icon: FaUserFriends,
          label: "Candidate Database",
          link: "#"
        }
      ]
    },
    {
      title: "Additionals",
      items: [
        {
          icon: FaUserFriends,
          label: "Job Applications",
          link: "#"
        },
        {
          icon: FaCalendarDay,
          label: "Interview Schedules",
          link: "#"
        },
        {
          icon: FaUserFriends,
          label: "Candidate Database",
          link: "#"
        }
      ]
    },
    {
      title: "Additionals",
      items: [
        {
          icon: MdMoveToInbox,
          label: "Inbox",
          link: "#",
          additionalItem: [
            { label: "Contact", link: "#" },
            { label: "Subscribe", link: "#" },
          ],
        },
        {
          icon: FaEnvelopeOpen,
          label: "Form",
          link: "#",
          additionalItem: [
            { label: "Packages", link: "#" },
            { label: "Contact Us", link: "#" },
            { label: "Service Form", link: "#" },
            { label: "Deleted Form", link: "#" },
          ],
        },
        { icon: RiQuestionnaireLine, label: "Menu", link: "#" },
        { icon: MdOutlineApps, label: "FAQ", link: "#" },
        { icon: GrServices, label: "Footer", link: "#" },
      ],
    },
  ]
}

const AppSidebar = ({ ...props }) => {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <NavUser user={data.user} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
};

export default AppSidebar;
