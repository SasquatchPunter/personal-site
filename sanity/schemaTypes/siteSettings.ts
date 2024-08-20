import { defineType } from "sanity";

export default defineType({
  title: "Site Settings",
  name: "siteSettings",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      initialValue: "Site Settings",
      readOnly: true,
      hidden: true,
      placeholder: "Site Settings",
    },
    {
      title: "Site Title",
      name: "siteTitle",
      type: "string",
      placeholder: "Title",
      description: "Used in places like the site title tag, etc.",
    },
    {
      title: "Social Links",
      name: "socialLinks",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          title: "Email",
          name: "email",
          type: "email",
          placeholder: "Email Address",
        },
        {
          title: "Github",
          name: "github",
          type: "url",
          placeholder: "Github Profile",
        },
        {
          title: "LinkedIn",
          name: "linkedin",
          type: "url",
          placeholder: "LinkedIn Profile",
        },
      ],
      validation(rule) {
        return rule.required();
      },
    },
  ],
});
