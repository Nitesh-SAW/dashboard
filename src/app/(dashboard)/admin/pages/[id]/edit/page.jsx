"use client"
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import Createpage from '@/components/PageModule/Createpage'
import SelectedImage from '@/components/PageModule/SelectedImage';
import CustomCss from '@/components/PageModule/CustomCss';
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useParams } from "next/navigation";
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updatePages } from '@/lib/features/formSlice';


const Page = () => {
    const methods = useForm();
    const { reset } = methods;
    const { id } = useParams();
    console.log("Page ID:", id);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://breezend-backend-2.onrender.com/api/edit/${id}`);
                const pageData = response.data;
                console.log(pageData)
                console.log(pageData.page.title)

                // let ogPictureFile = null;
                // if (pageData.page.openGraph.image) {
                //     const imageResponse = await fetch(pageData.og_picture);
                //     const imageBlob = await imageResponse.blob();
                //     ogPictureFile = new File([imageBlob], "image.jpg", { type: imageBlob.type });
                // }

                reset({
                    title: pageData.page.title,
                    url: pageData.page.url,
                    parent: pageData.page.parent,
                    active: pageData.status,
                    custom_css: pageData.page.custom_css,
                    sitemap: pageData.page.sitemap,
                    separate_siteMap: pageData.page.show_in_root_sitemap,

                    open_graph: pageData.page.enableOpenGraph,
                    meta_tags: pageData.page.enableMetaTags,
                    link_canonicals: pageData.page.enableLinkCanonicals,
                    twitter_tags: pageData.page.enableTwitterTags,
                    script_code: pageData.page.enableScriptCode,

                    meta_title: pageData.page.metaTags.meta_title,
                    meta_description: pageData.page.metaTags.meta_desc,
                    meta_keyword: pageData.page.metaTags.meta_key,

                    og_title: pageData.page.openGraph.title,
                    og_url: pageData.page.openGraph.url,
                    og_description: pageData.page.openGraph.description,
                    og_type: pageData.page.openGraph.type,
                    // og_picture: ogPictureFile,

                    tweeter_title: pageData.page.twitterTags.title,
                    tweeter_url: pageData.page.twitterTags.url,
                    tweeter_description: pageData.page.twitterTags.description,
                    tweeter_card: pageData.page.twitterTags.card,

                    script: pageData.page.scriptCode.description,

                    islinkscannonicals_href: pageData.page.linkCanonicals.href,

                    component: pageData.components
                });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        if (id) fetchData()
    }, [id, reset])

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
        dispatch(updatePages({ id, formData })).unwrap()
            .then(() => {
                alert("Selected pages updated successfully!");
                // dispatch(getDataFromBackend());
                // Optionally, refresh the table data here
            })
            .catch((error) => {
                console.error("Error updating pages:", error);
                alert("Failed to updating pages.");
            });
    }

    return (
        <section className="w-full min-h-screen justify-center items-center relative">
            <header className="w-full h-12  flex justify-between items-center py-3 mt-16 border-b">

                <div className="pl-2">
                    <h1 className="text-2xl">Edit Page</h1>
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
                    {/* <form id="createPageForm" onSubmit={methods.handleSubmit(onSubmit)}> */}
                    <form id="createPageForm" onSubmit={methods.handleSubmit(onSubmit)}>
                        {/* <Createpage control={methods.control} setValue={methods.setValue} /> */}
                        <Createpage />
                        <SelectedImage />
                        <CustomCss />
                        {/* <CustomCss control={methods.control} unregister={methods.unregister} /> */}
                    </form>
                </FormProvider>
            </main>
        </section >
    )
}

export default Page