import { StructureBuilder } from "sanity/structure";
import { BookIcon, TagsIcon, CogIcon } from "@sanity/icons";

const BlogContent = (S: StructureBuilder) => {
  return S.listItem()
    .title("Blog")
    .child(
      S.list()
        .title("Blog Content")
        .items([
          S.listItem()
            .title("Blog Posts")
            .icon(BookIcon)
            .child(S.documentTypeList("blogPost")),
          S.listItem()
            .title("Blog Tags")
            .icon(TagsIcon)
            .child(S.documentTypeList("blogTag")),
        ])
    );
};

const SiteSettings = (S: StructureBuilder) => {
  return S.listItem()
    .title("Site Settings")
    .icon(CogIcon)
    .child(S.document().schemaType("siteSettings").documentId("siteSettings"));
};

export default (S: StructureBuilder) => {
  return S.list()
    .title("Content")
    .items([S.divider(), SiteSettings(S), S.divider(), BlogContent(S)]);
};
