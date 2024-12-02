"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  {
    title: "Navigation",
    items: [
      { icon: "/dashboard.png", label: "Dashboard", href: "/admin/home" },
      { icon: "/slider.png", label: "Sliders", href: "" },
      {
        icon: "/services.png",
        label: "Services",
        href: "",
        additionalItem: [
          { icon: "/dashboard.png", label: "Service List", href: "" },
          { icon: "/dashboard.png", label: "Add Service", href: "" }
        ]
      },

      {
        icon: "/dashboard.png",
        label: "Album",
        href: "",
        additionalItem: [
          { icon: "/dashboard.png", label: "Album List", href: "" },
          { icon: "/dashboard.png", label: "Add Album", href: "" }
        ]
      },
    ]
  },

  {
    title: "CMS",
    items: [
      {
        icon: "/dashboard.png",
        label: "Pages",
        href: "",
        additionalItem: [
          { icon: "/dashboard.png", label: "Pages List", href: "/admin/pagelist" },
          { icon: "/dashboard.png", label: "Add Page", href: "/admin/addpage" },
          { icon: "/dashboard.png", label: "Logs", href: "/admin/log" }
        ]
      },

      {
        icon: "/dashboard.png",
        label: "Events, News & Blogs",
        href: "",
        additionalItem:
          [
            { icon: "/dashboard.png", label: "Category List", href: "" },
            { icon: "/dashboard.png", label: "Listing", href: "" },
            { icon: "/dashboard.png", label: "Add New", href: "" }
          ]
      },

      { icon: "/dashboard.png", label: "Testimonials", href: "" },

      {
        icon: "/dashboard.png",
        label: "Forms",
        href: "",
        additionalItem:
          [
            { icon: "/dashboard.png", label: "Form List", href: "" },
            { icon: "/dashboard.png", label: "Add Form", href: "" }
          ]
      },

    ]
  }
  , {
    title: "SEO",
    items:
      [
        {
          icon: "/dashboard.png",
          label: "Schema",
          href: "",
          additionalItem:
            [
              { icon: "/dashboard.png", label: "Schema List", href: "" },
              { icon: "/dashboard.png", label: "Add Schema", href: "" }
            ]
        },

        {
          icon: "/dashboard.png",
          label: "Seo Meta",
          href: "",
          additionalItem:
            [
              { icon: "/dashboard.png", label: "SEO List", href: "" },
              { icon: "/dashboard.png", label: "Add SEO Mata", href: "" }
            ]
        },
        {
          icon: "/dashboard.png",
          label: "URL Redirection",
          href: "",
          additionalItem:
            [
              { icon: "/dashboard.png", label: "Redirection List", href: "" },
              { icon: "/dashboard.png", label: "Add URL", href: "" }
            ]
        },
        {
          icon: "/dashboard.png",
          label: "User Management",
          href: "",
          additionalItem:
            [
              { icon: "/dashboard.png", label: "Users", href: "" },
              { icon: "/dashboard.png", label: "Groups", href: "" }
            ]
        },
        { icon: "/dashboard.png", label: "Settings", href: "" },
      ]
  }
  , {
    title: "Additionals",
    items:
      [
        {
          icon: "/dashboard.png",
          label: "Inbox",
          href: "",
          additionalItem:
            [
              { icon: "/dashboard.png", label: "Contact", href: "" },
              { icon: "/dashboard.png", label: "Subscribe", href: "" }
            ]
        },

        { icon: "/dashboard.png", label: "Menu", href: "" },
        { icon: "/dashboard.png", label: "Footer", href: "" }
      ]
  }
]
const Navigation = () => {

  const [active, setActive] = useState("")

  const toggle = (label) => {
    setActive(active === label ? null : label)
  }

  return (
    <>
      <section className='mt-4 text-sm'>
        {navItems.map((section) => (
          <div className='px-4 flex flex-col gap-2' key={section.title}>
            <span className='hidden lg:block text-xl font-light my-4'>{section.title}</span>
            {section.items.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={item.additionalItem ? () => (toggle(item.label)) : undefined}
                  className='group flex items-center px-6 py-2 hover:bg-white group-hover:text-black rounded-md transition duration-200 ease-in-out'
                >
                  <Image
                    src={item.icon}
                    alt='image'
                    width='20'
                    height='20'
                    className="mr-2 transition duration-200 ease-in-out group-hover:brightness-0" />
                  <span className='group-hover:text-black'>{item.label}</span>
                </Link>
                {
                  active === item.label && item.additionalItem && (
                    <div className='rounded'>
                      {item.additionalItem.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className='group flex items-center px-6 py-2 bg-white text-black transition duration-200 ease-in-out'
                        >
                          <Image
                            src={subItem.icon}
                            alt={subItem.label}
                            width='20'
                            height='20'
                          />
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  )
}

export default Navigation