import { StructureBuilder } from "sanity/structure";
import { BookIcon, TagsIcon } from "@sanity/icons";

const BlogContent = (S: StructureBuilder) => {
  return S.listItem()
    .title("Blog Content")
    .child(
      S.list()
        .title("Blog Content")
        .items([
          S.listItem()
            .title("Blog Posts")
            .icon(BookIcon)
            .child(S.documentTypeList("blog_post")),
          S.listItem()
            .title("Blog Tags")
            .icon(TagsIcon)
            .child(S.documentTypeList("blog_tag")),
        ])
    );
};

export const structure = (S: StructureBuilder) => {
  return S.list()
    .title("Content")
    .items([BlogContent(S)]);
};
