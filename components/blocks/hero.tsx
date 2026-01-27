"use client";

import { iconSchema } from "@/tina/fields/icon";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import {
  PageBlocksHero,
  PageBlocksHeroImage,
} from "../../tina/__generated__/types";
import { Icon } from "../icon";
import { Section, sectionBlockSchemaField } from "../layout/section";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { TextEffect } from "../motion-primitives/text-effect";
import { Button } from "../ui/button";
import HeroVideoDialog from "../ui/hero-video-dialog";
import { Transition } from "motion/react";

const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-6xl px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* LEFT */}
          <div className="text-left">
            {data.headline && (
              <div data-tina-field={tinaField(data, "headline")}>
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-8 text-balance text-6xl md:text-7xl xl:text-[5.25rem] font-bold"
                >
                  {data.headline!}
                </TextEffect>
              </div>
            )}

            {data.tagline && (
              <div data-tina-field={tinaField(data, "tagline")}>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mt-8 max-w-xl text-balance text-lg"
                >
                  {data.tagline!}
                </TextEffect>
              </div>
            )}

            <AnimatedGroup
              variants={transitionVariants}
              className="mt-12 flex flex-col items-start gap-2 md:flex-row"
            >
              {data.actions &&
                data.actions.map((action) => (
                  <div
                    key={action!.label}
                    data-tina-field={tinaField(action)}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      variant={action!.type === "link" ? "ghost" : "default"}
                      className="rounded-xl px-5 text-base"
                    >
                      <Link href={action!.link!}>
                        {action?.icon && <Icon data={action?.icon} />}
                        <span className="text-nowrap">{action!.label}</span>
                      </Link>
                    </Button>
                  </div>
                ))}
            </AnimatedGroup>
          </div>

          {/* RIGHT (Image) */}
          {data.image && (
            <AnimatedGroup variants={transitionVariants}>
              <div
                className="relative w-full max-w-lg lg:max-w-none"
                data-tina-field={tinaField(data, "image")}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <ImageBlock image={data.image} />
                </div>
              </div>
            </AnimatedGroup>
          )}
        </div>
      </div>
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  if (image.videoUrl) {
    let videoId = "";
    if (image.videoUrl) {
      const embedPrefix = "/embed/";
      const idx = image.videoUrl.indexOf(embedPrefix);
      if (idx !== -1) {
        videoId = image.videoUrl
          .substring(idx + embedPrefix.length)
          .split("?")[0];
      }
    }
    const thumbnailSrc = image.src
      ? image.src!
      : videoId
      ? `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`
      : "";

    return (
      <HeroVideoDialog
        videoSrc={image.videoUrl}
        thumbnailSrc={thumbnailSrc}
        thumbnailAlt="Hero Video"
      />
    );
  }

  if (image.src) {
    return (
      <div className="relative w-full aspect-[4/3]">
        <Image
          className="object-cover rounded-2xl"
          alt={image!.alt || ""}
          src={image!.src!}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    );
  }
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: {
            name: "Tina",
            color: "white",
            style: "float",
          },
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        iconSchema as any,
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description:
            "If using a YouTube video, make sure to use the embed version of the video URL",
        },
      ],
    },
  ],
};
