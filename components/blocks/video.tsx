"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksVideo } from "@/tina/__generated__/types";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from "../layout/section";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const Video = ({ data }: { data: PageBlocksVideo }) => {
  if (!data.url) return null;

  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <div className={data.textColor || ""}>
            {data.title && (
              <h2
                className="text-4xl font-semibold"
                data-tina-field={tinaField(data, "title")}
              >
                {data.title}
              </h2>
            )}

            {data.description && (
              <p
                className="mt-4 text-lg"
                data-tina-field={tinaField(data, "description")}
              >
                {data.description}
              </p>
            )}

            {data.buttonLabel && data.buttonLink && (
              <a
                href={data.buttonLink}
                className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-white"
                data-tina-field={tinaField(data, "buttonLabel")}
              >
                {data.buttonLabel}
              </a>
            )}
          </div>

          {/* RIGHT VIDEO */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden">
            <ReactPlayer
              width="100%"
              height="100%"
              style={{ margin: "auto" }}
              playing={!!data.autoPlay}
              loop={!!data.loop}
              controls={true}
              url={data.url}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export const videoBlockSchema: Template = {
  name: "video",
  label: "Video",
  ui: {
    previewSrc: "/blocks/video.png",
    defaultItem: {
      title: "Video Section",
      description: "This is the description for the video section.",
      buttonLabel: "Learn More",
      buttonLink: "/",
      textColor: "text-gray-900", // default text color
      url: "https://www.youtube.com/watch?v=j8egYW7Jpgk",
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Text Color",
      name: "textColor",
      options: [
        { label: "Default (Black)", value: "text-gray-900" },
        { label: "White", value: "text-white" },
        { label: "Primary", value: "text-primary" },
        { label: "Secondary", value: "text-secondary" },
        { label: "Red", value: "text-red-500" },
        { label: "Blue", value: "text-blue-500" },
      ],
    },
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "string",
      label: "Button Label",
      name: "buttonLabel",
    },
    {
      type: "string",
      label: "Button Link",
      name: "buttonLink",
    },
    {
      type: "string",
      label: "Video URL",
      name: "url",
    },
    {
      type: "boolean",
      label: "Auto Play",
      name: "autoPlay",
    },
    {
      type: "boolean",
      label: "Loop",
      name: "loop",
    },
  ],
};
