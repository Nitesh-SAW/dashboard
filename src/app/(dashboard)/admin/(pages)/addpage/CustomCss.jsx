'use client'
import React, { useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Controller, useWatch } from 'react-hook-form'

const CustomCss = ({ control, unregister }) => {
    const isMetaTagsOn = useWatch({ control, name: "meta_tags" });
    const islinkscannonicals = useWatch({ control, name: "link_canonicals" });
    const isogtags = useWatch({ control, name: "open_graph" });
    const istweetertag = useWatch({ control, name: "twitter_tags" });
    const isscriptcode = useWatch({ control, name: "script_code" });
    useEffect(() => {
        if (isMetaTagsOn === 0) {
            unregister("meta-title");
            unregister("meta-keyword");
            unregister("meta-description");
        }
        if (islinkscannonicals === 0) {
            unregister("islinkscannonicals_href");
        }
        if (isogtags === 0) {
            unregister("og_title");
            unregister("og_url");
            unregister("og_type");
            unregister("og_picture");
            unregister("og_description");
        }
        if (istweetertag === 0) {
            unregister("tweeter_title");
            unregister("tweeter_url");
            unregister("tweeter_card");
            unregister("tweeter_picture");
            unregister("tweeter_description");
        }
        if (isscriptcode === 0) {
            unregister("scrip");
        }
    }, [isMetaTagsOn, islinkscannonicals, isogtags, istweetertag, isscriptcode, unregister]);

    return (
        <section className='w-[98%] bg-white rounded-sm mt-3 mx-auto'>
            <main className='w-full grid grid-cols-2 gap-8 p-5'>
                <div className='w-full gap-1.5 flex flex-col justify-start items-start'>
                    <Label htmlFor="textarea">CustomCss</Label>
                    <Controller
                        name='custom_css'
                        control={control}
                        render={({ field }) => (
                            <Textarea id='textarea' {...field} />
                        )}
                    />
                </div>


                <div className='w-full grid grid-cols-3 gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="In-SiteMap" className='text-sm'>Show In Root SiteMap</Label>
                        <Controller
                            name='sitemap'
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Switch
                                    id="In-SiteMap"
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="In-Seperate" className='text-sm'>Seperate SiteMap</Label>
                        <Controller
                            name='separate_siteMap'
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Switch
                                    id="In-Seperate"
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Is-Blog" className='text-sm'>Is Blog</Label>
                        <Controller
                            name='isBlog'
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Switch
                                    id="Is-Blog"
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => { field.onChange(checked ? 1 : 0); }}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Meta-tags" className='text-sm'>Meta tags</Label>
                        <Controller
                            name='meta_tags'
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Switch
                                    id="Meta-tags"
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => { field.onChange(checked ? 1 : 0); }}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Link-Canonicals" className='text-sm'>Link Canonicals</Label>
                        <Controller
                            name='link_canonicals'
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Switch
                                    id="Link-Canonicals"
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => { field.onChange(checked ? 1 : 0); }}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Open-Graph" className='text-sm'>og: Open Graph</Label>
                        <Controller
                            name='open_graph'
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Switch
                                    id="Open-Graph"
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => { field.onChange(checked ? 1 : 0); }}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Twitter-Tags" className='text-sm'>Twitter Tags</Label>
                        <Controller
                            name='twitter_tags'
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Switch
                                    id="Twitter-Tags"
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => { field.onChange(checked ? 1 : 0); }}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Script-Code" className='text-sm'>Script Code</Label>
                        <Controller
                            name='script_code'
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Switch
                                    id="Script-Code"
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => { field.onChange(checked ? 1 : 0); }}
                                />
                            )}
                        />
                    </div>
                </div>
            </main>
            <div className='flex flex-col gap-1'>
                {/* <Metatags isOn={isOn} /> */}
                {/* {isMetaTagsOn && <Metatags control={control} isOn={isMetaTagsOn} />} */}
                {isMetaTagsOn === 1 && <div className='w-full p-3'>
                    <hr />
                    <h4 className='font-normal my-4 pl-3'>META TAGS</h4>
                    <hr />
                    <div className='w-full grid grid-cols-2 gap-8 p-3'>
                        <div>
                            <Label htmlFor="Meta-Title">Meta Title</Label>
                            <Controller name="meta-title" control={control} render={({ field }) => (<Input type="text" id="Meta-Title" {...field} />)} />

                            <Label htmlFor="Meta-Keywords">Meta Keywords</Label>
                            <Controller name="meta-keyword" control={control} render={({ field }) => (<Input type="text" id="Meta-Keywords" {...field} />)} />

                        </div>
                        <div>
                            <Label htmlFor="Meta-Description">Meta Description</Label>
                            <Controller name="meta-description" control={control} render={({ field }) => (<Textarea id="Meta-Description" {...field} />)} />

                        </div>
                    </div>
                </div>
                }
                {/* <LinksCannonicals islinkscannonicals={islinkscannonicals} /> */}
                {islinkscannonicals === 1 &&
                    <div className='w-full p-3'>
                        <hr />
                        <h4 className='font-normal my-4 pl-3'>LINK CANONICAL</h4>
                        <hr />
                        <div className='relative pl-3'>
                            <Label htmlFor="href">href</Label>
                            <Controller
                                name='islinkscannonicals_href'
                                control={control}
                                render={({ field }) => (<Input type="text" id="href" {...field} />)}
                            />
                        </div>
                    </div>
                }
                {/* <Ogtags isogtags={isogtags} /> */}
                {isogtags === 1 && <div className='w-full p-3'>
                    <hr />
                    <h4 className=' font-normal my-4 pl-3'>OG TAGS</h4>
                    <hr />
                    <div className='w-full grid grid-cols-2 gap-8 p-3'>
                        <div>
                            <Label htmlFor="Title">Title</Label>
                            <Controller
                                name='og_title'
                                control={control}
                                render={({ field }) => (<Input id='Title' {...field} />)}
                            />

                            <Label htmlFor="URL">URL</Label>
                            <Controller
                                name='og_url'
                                control={control}
                                render={({ field }) => (<Input id='URL' {...field} />)}
                            />

                            <Label htmlFor="Type">Type</Label>
                            <Controller
                                name='og_type'
                                control={control}
                                render={({ field }) => (<Input id='Type' {...field} />)}
                            />

                        </div>
                        <div>
                            <Label htmlFor="picture">Image</Label>
                            <Controller
                                name='og_picture'
                                control={control}
                                render={({ field }) => (<Input type="file" id="picture" {...field} />)}
                            />

                            <Label htmlFor="description">Description</Label>
                            <Controller
                                name='og_description'
                                control={control}
                                render={({ field }) => (<Textarea id='description' {...field} />)}
                            />
                        </div>
                    </div>
                </div>}
                {/* <TweeterTag istweetertag={istweetertag} /> */}
                {istweetertag === 1 &&
                    <div className='w-full p-3'>
                        <hr />
                        <h4 className='font-normal my-4 pl-3'>TWITTER TAGS</h4>
                        <hr />
                        <div className='w-full grid grid-cols-2 gap-8 p-3'>
                            <div>
                                <Label htmlFor="Title">Title</Label>
                                <Controller
                                    name="tweeter_title"
                                    control={control}
                                    render={({ field }) => (<Input id='Title' {...field} />)}
                                />

                                <Label htmlFor="URL">URL</Label>
                                <Controller
                                    name="tweeter_url"
                                    control={control}
                                    render={({ field }) => (<Input id='URL' {...field} />)}
                                />

                                <Label htmlFor="card">Card</Label>
                                <Controller
                                    name="tweeter_card"
                                    control={control}
                                    render={({ field }) => (<Input id='card' {...field} />)}
                                />

                            </div>
                            <div>
                                <Label htmlFor="picture">Image</Label>
                                <Controller
                                    name="tweeter_picture"
                                    control={control}
                                    render={({ field }) => (<Input id="picture" type="file" {...field} />)}
                                />

                                <Label htmlFor="description">Description</Label>
                                <Controller
                                    name="tweeter_description"
                                    control={control}
                                    render={({ field }) => (<Textarea id='description' {...field} />)}
                                />
                            </div>
                        </div>
                    </div>}
                {/* <ScriptCode isscriptcode={isscriptcode} /> */}
                {
                    isscriptcode === 1 &&
                    <div className='w-full p-3'>
                        <hr />
                        <h4 className='font-normal my-4 pl-3'>Script Code</h4>
                        <hr />
                        <div className="pl-3">
                            <Label htmlFor="script">Script code</Label>
                            <Controller
                                name="script"
                                control={control}
                                render={({ field }) => (<Textarea id="script" className="w-full h-[30%]" {...field} />)}
                            />

                        </div>
                    </div>
                }
            </div>
        </section>

    )
}

export default CustomCss

