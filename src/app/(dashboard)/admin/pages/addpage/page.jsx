"use client"
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import Createpage from '@/components/PageModule/Createpage'
import SelectedImage from '@/components/PageModule/SelectedImage';
import CustomCss from '@/components/PageModule/CustomCss';
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

    //Separate ComponentType and Data from the Components
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
    formData.append("enableOpenGraph", data.open_graph)
    formData.append("enableMetaTags", data.meta_tags)
    formData.append("enableLinkCanonicals", data.link_canonicals)
    formData.append("enableTwitterTags", data.twitter_tags)
    formData.append("enableScriptCode", data.script_code)


    const MetaTags = {
      meta_title: data.meta_title,
      meta_desc: data.meta_description,
      meta_key: data.meta_keyword
    };
    const MetaTagsData = Object.fromEntries(
      Object.entries(MetaTags).filter(([_, value]) => value != null && value !== "")
    )
    if (Object.keys(MetaTagsData).length > 0) {
      formData.append("MetaTags", JSON.stringify(MetaTagsData))
    }

    const OpenGraph = {
      title: data.og_title,
      url: data.og_url,
      description: data.og_description,
      type: data.og_type
    };

    const OpenGraphData = Object.fromEntries(
      Object.entries(OpenGraph).filter(([_, value]) => value != null && value !== "")
    )
    console.log(OpenGraphData)
    if (Object.keys(OpenGraphData).length > 0) {
      formData.append("OpenGraph", JSON.stringify(OpenGraphData));
    }
    if (data.og_picture && data.og_picture.length > 0) {
      formData.append("OpenGraphImage", data.og_picture[0])
    };

    const TwitterTags = {
      title: data.tweeter_title,
      url: data.tweeter_url,
      description: data.tweeter_description,
      card: data.tweeter_card
    };

    const TwiteerTagsData = Object.fromEntries(
      Object.entries(TwitterTags).filter(([_, value]) => value != null && value !== "")
    )
    if (Object.keys(TwiteerTagsData).length > 0) {
      formData.append("TwitterTags", JSON.stringify(TwiteerTagsData))
    };
    if (data.tweeter_picture && data.tweeter_picture.length > 0) {
      formData.append("TwitterImage", data.tweeter_picture[0])
    };

    const ScriptCode = {
      description: data.script
    };
    const ScriptCodeData = Object.fromEntries(
      Object.entries(ScriptCode).filter(([_, value]) => value != null && value !== "")
    )
    if (Object.keys(ScriptCodeData).length > 0) {
      formData.append("ScriptCode", JSON.stringify(ScriptCodeData))
    };


    const LinkCanonicals = {
      href: data.islinkscannonicals_href
    };
    const LinkCanonicalsData = Object.fromEntries(
      Object.entries(LinkCanonicals).filter(([_, value]) => value != null && value !== "")
    )

    if (Object.keys(LinkCanonicalsData).length > 0) {
      formData.append("LinkCanonicals", JSON.stringify(LinkCanonicalsData))
    };

    formData.append("components", JSON.stringify(components));

    //  File data ko append karo
    Object.keys(data.component).forEach((componentType, index) => {
      data.component[componentType].forEach((item, fileIndex) => {
        Object.keys(item).forEach((fieldName) => {
          if (item[fieldName] instanceof File) {
            formData.append(`${componentType}_${index}_${fileIndex}`, item[fieldName]); // File ko send karna
          }
        });
      });
    });

    console.log(Object.fromEntries(formData));
    dispatch(sendDataToBackend(formData))
      .unwrap()
      .then(() => {
        alert("Selected Pages Created successfully!");
      })
      .catch((error) => {
        console.error("Error deleting pages:", error);
        alert("Failed to Create pages.");
      });
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