import type { ImageAsset } from "sanity";

import NextImage from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface Props {
  title: string;
  image: ImageAsset;
}
export default function BlogHeader({ title, image }: Props) {
  return (
    <header>
      <h1>{title}</h1>
      <NextImage
        className="w-full"
        src={urlForImage(image)}
        alt="Blog Post header image."
        width={300}
        height={300}
      />
    </header>
  );
}
