'use client'
import React, { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Metatags from '@/components/toggle components/Metatags'
import LinksCannonicals from '@/components/toggle components/LinksCannonicals'
import Ogtags from '@/components/toggle components/Ogtags'
import TweeterTag from '@/components/toggle components/TweeterTag'
import ScriptCode from '@/components/toggle components/ScriptCode'

const CustomCss = () => {
    const [isOn, setIsOn] = useState(false);
    const [islinkscannonicals, setIsLinksCannonicals] = useState(false);
    const [isogtags, setIsOgTags] = useState(false);
    const [istweetertag, setIsTweeterTag] = useState(false);
    const [isscriptcode, setIsScriptCode] = useState(false);

    return (
        <section className='w-[98%] bg-white rounded-sm mt-3 mx-auto'>
            <main className='w-full grid grid-cols-2 gap-8 p-5'>
                <div className='w-full gap-1.5 flex flex-col justify-start items-start'>
                    <Label htmlFor="textarea">CustomCss</Label>
                    <Textarea id='textarea' />
                </div>

                <div className='w-full grid grid-cols-3 gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="In-SiteMap" className='text-sm'>Show In SiteMap</Label>
                        <Switch id="In-SiteMap" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="In-Seperate" className='text-sm'>Show In Seperate SiteMap</Label>
                        <Switch id="In-Seperate" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Meta-tags" className='text-sm'>Meta tags</Label>
                        <Switch
                            id="Meta-tags"
                            checked={isOn}
                            onCheckedChange={(checked) => setIsOn(checked)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Link-Canonicals" className='text-sm'>Link Canonicals</Label>
                        <Switch
                            id="Link-Canonicals"
                            checked={islinkscannonicals}
                            onCheckedChange={(checked) => setIsLinksCannonicals(checked)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Open-Graph" className='text-sm'>og: Open Graph</Label>
                        <Switch
                            id="Open-Graph"
                            checked={isogtags}
                            onCheckedChange={(checked) => setIsOgTags(checked)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Twitter-Tags" className='text-sm'>Twitter Tags</Label>
                        <Switch
                            id="Twitter-Tags"
                            checked={istweetertag}
                            onCheckedChange={(checked) => setIsTweeterTag(checked)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="Script-Code" className='text-sm'>Script Code</Label>
                        <Switch
                            id="Script-Code"
                            checked={isscriptcode}
                            onCheckedChange={(checked) => setIsScriptCode(checked)}
                        />
                    </div>
                </div>
            </main>
            <Metatags isOn={isOn} />
            <LinksCannonicals islinkscannonicals={islinkscannonicals} />
            <Ogtags isogtags={isogtags} />
            <TweeterTag istweetertag={istweetertag} />
            <ScriptCode isscriptcode={isscriptcode} />
        </section>

    )
}

export default CustomCss

