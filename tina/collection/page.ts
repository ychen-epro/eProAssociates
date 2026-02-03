import type { Collection } from "tinacms";
import { heroBlockSchema } from "@/components/blocks/hero";
import { contentBlockSchema } from "@/components/blocks/content";
import { testimonialBlockSchema } from "@/components/blocks/testimonial";
import { featureBlockSchema } from "@/components/blocks/features";
import { videoBlockSchema } from "@/components/blocks/video";
import { calloutBlockSchema } from "@/components/blocks/callout";
import { statsBlockSchema } from "@/components/blocks/stats";
import { ctaBlockSchema } from "@/components/blocks/call-to-action";
import { servicesBlockSchema } from "@/components/blocks/services";

const Page: Collection = {
  label: "Pages",
  name: "page",

  // 🔁 was: content/pages
  path: "content",

  format: "mdx",

  match: {
    include: "*/pages/**",
  },

  ui: {
    router: ({ document }) => {
      // e.g. ["en", "pages", "home"]
      const [locale, , slug] = document._sys.breadcrumbs;

      if (slug === "home") {
        return `/${locale}`;
      }

      return `/${locale}/${slug}`;
    },
  },

  fields: [
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: { visualSelector: true },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        servicesBlockSchema,
      ],
    },
  ],
};

export default Page;
