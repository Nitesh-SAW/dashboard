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
        <section className='w-[98%] bg-white rounded-sm mx-3 mt-3'>
            <main className='w-full grid grid-cols-2 gap-8 p-3'>
                <div className='w-full gap-1.5 flex flex-col justify-start items-start'>
                    <Label htmlFor="textarea">CustomCss</Label>
                    <Textarea id='textarea' />
                </div>


                <div className='grid grid-cols-3 gap-4 justify-center items-center'>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <Label htmlFor="In-SiteMap" className='text-xs'>Show In SiteMap</Label>
                        <Switch id="In-SiteMap" />
                    </div>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <Label htmlFor="In-Seperate" className='text-xs'>Show In Seperate SiteMap</Label>
                        <Switch id="In-Seperate" />
                    </div>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <Label htmlFor="Meta-tags" className='text-xs'>Meta tags</Label>
                        <Switch
                            id="Meta-tags"
                            checked={isOn}
                            onCheckedChange={(checked) => setIsOn(checked)}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <Label htmlFor="Link-Canonicals" className='text-xs'>Link Canonicals</Label>
                        <Switch
                            id="Link-Canonicals"
                            checked={islinkscannonicals}
                            onCheckedChange={(checked) => setIsLinksCannonicals(checked)}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <Label htmlFor="Open-Graph" className='text-xs'>og: Open Graph</Label>
                        <Switch
                            id="Open-Graph"
                            checked={isogtags}
                            onCheckedChange={(checked) => setIsOgTags(checked)}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <Label htmlFor="Twitter-Tags" className='text-xs'>Twitter Tags</Label>
                        <Switch
                            id="Twitter-Tags"
                            checked={istweetertag}
                            onCheckedChange={(checked) => setIsTweeterTag(checked)}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <Label htmlFor="Script-Code" className='text-xs'>Script Code</Label>
                        <Switch
                            id="Script-Code"
                            checked={isscriptcode}
                            onCheckedChange={(checked)=> setIsScriptCode(checked)}
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

