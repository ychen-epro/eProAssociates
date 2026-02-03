import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content", // Root content folder
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema as any,
        { type: "image", label: "Logo", name: "logo" },
        { type: "string", label: "Name", name: "name" },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          fields: [
            { type: "string", label: "Link", name: "href" },
            { type: "string", label: "Label", name: "label" },
            {
              type: "object",
              label: "Dropdown Items",
              name: "children",
              list: true,
              ui: { itemProps: (item) => ({ label: item?.label }) },
              fields: [
                { type: "string", label: "Link", name: "href" },
                { type: "string", label: "Label", name: "label" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        { type: "string", label: "Phone", name: "phone" },
        { type: "string", label: "Email", name: "email" },
        {
          type: "object",
          label: "Columns",
          name: "columns",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.title || "Footer Column" }),
          },
          fields: [
            { type: "string", label: "Title", name: "title" },
            {
              type: "object",
              label: "Links",
              name: "links",
              list: true,
              ui: { itemProps: (item) => ({ label: item?.label || "Link" }) },
              fields: [
                { type: "string", label: "Label", name: "label" },
                { type: "string", label: "Href", name: "href" },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.icon?.name || "Icon" }) },
          fields: [
            iconSchema as any,
            { type: "string", label: "Url", name: "url" },
          ],
        },
        {
          type: "string",
          label: "Copyright",
          name: "copyright",
        },
        {
          type: "object",
          label: "Legal Links",
          name: "legal",
          fields: [
            {
              type: "string",
              label: "Terms & Conditions URL",
              name: "terms",
            },
            {
              type: "string",
              label: "Privacy Policy URL",
              name: "privacy",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: { component: ColorPickerInput },
        },
        {
          type: "string",
          label: "Font Family",
          name: "font",
          options: [
            { label: "System Sans", value: "sans" },
            { label: "Nunito", value: "nunito" },
            { label: "Lato", value: "lato" },
          ],
        },
        {
          type: "string",
          label: "Dark Mode",
          name: "darkMode",
          options: [
            { label: "System", value: "system" },
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ],
        },
      ],
    },
  ],
};

export default Global;
