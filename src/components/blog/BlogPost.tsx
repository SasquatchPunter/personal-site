import type { BlogPost } from "@/sanity/types";

interface Props {
  post: BlogPost;
}
export default function BlogPost({ post }: Props) {
  return <h1>{post.title}</h1>;
}
