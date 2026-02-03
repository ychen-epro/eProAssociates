import { defineConfig } from "tinacms";

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";
import Tag from "./collection/tag";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,

  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.CF_PAGES_BRANCH ||
    "main",

  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },

  build: {
    publicFolder: "public",
    outputFolder: "admin",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\//, "") || "",
  },

  schema: {
    collections: [Page, Post, Author, Tag, Global],
  },
});
