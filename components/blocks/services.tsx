"use client";

import React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from "../layout/section";
import {
  PageBlocksServices,
  PageBlocksServicesItems,
} from "@/tina/__generated__/types";
import Image from "next/image";
import Link from "next/link";

export const Services = ({ data }: { data: PageBlocksServices }) => {
  return (
    <Section background={data.background!}>
      <div className={`mx-auto max-w-6xl px-6 py-16 ${data.textColor || ""}`}>
        <div className="text-center">
          <h2
            data-tina-field={tinaField(data, "title")}
            className="text-4xl font-semibold"
          >
            {data.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items?.map((item, index) => (
            <Link
              key={index}
              href={item!.link!}
              className="group block rounded-xl border p-6 hover:shadow-lg transition"
              data-tina-field={tinaField(item)}
            >
              <div className="flex justify-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-lg">
                  {item?.image && (
                    <Image
                      src={item.image}
                      alt={item.imageAlt || ""}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold">{item!.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export const servicesBlockSchema: Template = {
  name: "services",
  label: "Services",
  ui: {
    previewSrc: "/blocks/services.png",
    defaultItem: {
      title: "Our Services",
      textColor: "text-default",
      items: [
        {
          title: "Service 1",
          link: "/",
          image: "/uploads/sample.jpg",
        },
        {
          title: "Service 2",
          link: "/",
          image: "/uploads/sample.jpg",
        },
        {
          title: "Service 3",
          link: "/",
          image: "/uploads/sample.jpg",
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Text Color",
      name: "textColor",
      options: [
        { label: "Default", value: "text-default" },
        { label: "Black", value: "text-black" },
        { label: "White", value: "text-white" },
        { label: "Primary", value: "text-[rgba(20,32,67,1)]" },
      ],
    },
    {
      type: "object",
      label: "Service Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title }),
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "image",
          label: "Image",
          name: "image",
        },
      ],
    },
  ],
};
