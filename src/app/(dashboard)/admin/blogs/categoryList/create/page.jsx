"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import Metatags from "@/components/toggle components/Metatags";
import TweeterTag from "@/components/toggle components/TweeterTag";
import Ogtags from "@/components/toggle components/Ogtags";
import LinksCannonicals from "@/components/toggle components/LinksCannonicals";
import ScriptCode from "@/components/toggle components/ScriptCode";
import { Button } from "@/components/ui/button";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const [isOn, setIsOn] = useState(false);
  const [islinkscannonicals, setIsLinksCannonicals] = useState(false);
  const [isogtags, setIsOgTags] = useState(false);
  const [istweetertag, setIsTweeterTag] = useState(false);
  const [isScriptcode, setIsScriptCode] = useState(false);

  return (
    <section className="w-full mt-2">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add Category</h2>
      </header>
      <div className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="w-full grid grid-cols-2 items-start gap-6 rounded-sm">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input type="text" />
              <Label>Slug</Label>
              <Input type="text" />
              <Label>Color</Label>
              <Input type="color" />
              <Label>Sort Order</Label>
              <Input type="text" />
            </div>
            <div>
              <Label>Short Description</Label>
              <Textarea />
            </div>
          </div>
          <div className="min-h-20 bg-white">
            {/* Switches section */}
            <div className="flex justify-center items-center flex-wrap gap-6">
              {[
                {
                  label: "Meta tags",
                  state: isOn,
                  setState: setIsOn,
                  id: "Meta-tags",
                },
                {
                  label: "Link Canonicals",
                  state: islinkscannonicals,
                  setState: setIsLinksCannonicals,
                  id: "Link-Canonicals",
                },
                {
                  label: "og: Open Graph",
                  state: isogtags,
                  setState: setIsOgTags,
                  id: "Open-Graph",
                },
                {
                  label: "Twitter Tags",
                  state: istweetertag,
                  setState: setIsTweeterTag,
                  id: "Twitter-Tags",
                },
                {
                  label: "Script Code",
                  state: isScriptcode,
                  setState: setIsScriptCode,
                  id: "Script-Code",
                },
              ].map(({ label, state, setState, id }) => (
                <div key={id} className="flex flex-col items-center">
                  <Label htmlFor={id} className="text-sm mb-2">
                    {label}
                  </Label>
                  <Switch
                    id={id}
                    checked={state}
                    onCheckedChange={(checked) => setState(checked)}
                  />
                </div>
              ))}
            </div>

            {/* Conditional components */}
            <div className="mt-6 space-y-6">
              {isOn && <Metatags isOn={isOn} />}
              {islinkscannonicals && (
                <LinksCannonicals islinkscannonicals={islinkscannonicals} />
              )}
              {isogtags && <Ogtags isogtags={isogtags} />}
              {istweetertag && <TweeterTag istweetertag={istweetertag} />}
              {isScriptcode && <ScriptCode isscriptcode={isScriptcode} />}
            </div>
          </div>

          <div className="w-full p-4 bg-white rounded space-y-2">
            <div className="space-x-2">
              <Checkbox />
              <Label>Active</Label>
            </div>
            <div className="space-x-2">
              <Button>Save</Button>
              <Button>Back</Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCategory;
