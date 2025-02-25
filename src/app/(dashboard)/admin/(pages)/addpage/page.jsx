"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import Createpage from './Createpage'
import SelectedImage from './SelectedImage';
import CustomCss from './CustomCss';
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { sendDataToBackend } from '@/lib/features/formSlice';

const page = () => {
  // const [pageData, setPageData] = useState([])
  const dispatch = useDispatch();
  const methods = useForm();

  const onSubmit = async (data) => {

    const formData = new FormData();

    let componentData = data.component || {};
    // Remove all empty objects from the arrays
    Object.keys(componentData).forEach((key) => {
      componentData[key] = componentData[key].filter((obj) => Object.keys(obj).length > 0);
    });


    const components = Object.keys(data.component).map((componentType) => {
      return {
        componentType,
        data: data.component[componentType].map((item) => {
          const newItem = { ...item };
          Object.keys(newItem).forEach((key) => {
            if (newItem[key] instanceof File) {
              delete newItem[key];
            }
          });
          return newItem;
        })
      }
    })

    formData.append("title", data.title)
    formData.append("url", data.url)
    formData.append("slug", data.url)
    formData.append("parent", data.parent)
    formData.append("status", Number(data.active),)
    formData.append("custom_css", data.custom_css)
    formData.append("sitemap", data.sitemap)
    formData.append("show_in_root_sitemap", data.separate_siteMap)
    formData.append("enableOpenGraph", true)
    formData.append("enableMetaTags", false)
    formData.append("enableLinkCanonicals", false)
    formData.append("enableTwitterTags", false)
    formData.append("enableScriptCode", false)


    const MetaTags = {
      meta_title: data.meta_title,
      meta_desc: data.meta_description,
      meta_key: data.meta_keyword
    };

    const OpenGraph = {
      title: data.og_title,
      image: data.og_picture,
      url: data.og_url,
      description: data.og_description,
      type: data.og_type
    };

    const TwitterTags = {
      title: data.tweeter_title,
      image: data.tweeter_picture,
      url: data.tweeter_url,
      description: data.tweeter_description,
      card: data.tweeter_card
    };

    const ScriptCode = {
      description: data.script
    };

    const LinkCanonicals = {
      href: data.islinkscannonicals_href
    };

    formData.append("MetaTags", JSON.stringify(MetaTags))
    formData.append("LinkCanonicals", JSON.stringify(LinkCanonicals))
    formData.append("OpenGraph", JSON.stringify(OpenGraph))
    formData.append("TwitterTags", JSON.stringify(TwitterTags))
    formData.append("ScriptCode", JSON.stringify(ScriptCode))

    formData.append("components", JSON.stringify(components)); // JSON data send kar rahe hain

    // 🔹 File data ko append karo
    Object.keys(data.component).forEach((componentType) => {
      data.component[componentType].forEach((item, index) => {
        Object.keys(item).forEach((fieldName) => {
          if (item[fieldName] instanceof File) {
            formData.append(`${componentType}[${index}][${fieldName}]`, item[fieldName]); // File ko send karna
          }
        });
      });
    });

    // 🔹 Debugging
    for (let pair of formData.entries()) {
      console.log(pair);
    }
    
    console.log(Object.fromEntries(formData));


    const formDatas = {
      title: data.title,
      url: data.url,
      slug: data.url,
      parent: data.parent,
      status: Number(data.active),
      custom_css: data.custom_css,
      sitemap: data.sitemap,
      show_in_root_sitemap: data.separate_siteMap,
      enableOpenGraph: true,
      enableMetaTags: false,
      enableLinkCanonicals: false,
      enableTwitterTags: false,
      enableScriptCode: false,
      OpenGraph: {
        title: data.og_title,
        image: data.og_picture,
        url: data.og_url,
        description: data.og_description,
        type: data.og_type
      },
      components: components
    }

    console.log(formDatas);
    // dispatch(sendDataToBackend(formData))
  }


  return (
    <section className="w-full min-h-screen justify-center items-center relative">
      <header className="w-full h-12  flex justify-between items-center py-3 mt-16 border-b">

        <div className="pl-2">
          <h1 className="text-2xl">Create New Page</h1>
        </div>

        <div className='flex justify-evenly items-center gap-2'>
          <button type="submit" form="createPageForm" className='flex justify-center items-center ring-1 rounded-sm ring-black px-4 py-1'>
            <MdOutlineSave />
            <p>Create</p>
          </button>
          <Link href="/admin/pagelist" className='flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1'>
            <IoMdArrowRoundBack />
            <p>Back</p>
          </Link>
        </div>

      </header >


      <main className='mt-5 pb-20'>
        <FormProvider {...methods}>
          <form id="createPageForm" onSubmit={methods.handleSubmit(onSubmit)}>
            <Createpage control={methods.control} setValue={methods.setValue} />
            <SelectedImage />
            <CustomCss control={methods.control} unregister={methods.unregister} />
          </form>
        </FormProvider>
      </main>
    </section >
  )
}

export default page