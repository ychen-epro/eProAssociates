import type { Collection } from "tinacms";

const Tag: Collection = {
  label: "Tags",
  name: "tag",

  path: "content",
  format: "mdx",

  match: {
    include: "*/tags/**",
  },

  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
  ],
};

export default Tag;
