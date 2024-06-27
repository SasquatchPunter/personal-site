import NextImage from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { formatDateString } from "@/src/utils/date";

interface Props {
  title: string;
  mainImage: any;
  createdAt: string;
  updatedAt: string;
}
export default function BlogHeader({ title, mainImage, updatedAt }: Props) {
  const src = urlForImage(mainImage).url();

  return (
    <header>
      <NextImage
        className="w-full h-screen-2/5 object-cover"
        src={src}
        alt="Blog Post header image."
        width={3000}
        height={4000}
        priority
      />
      <h1 className="text-6xl text-center px-8 -translate-y-1/2">{title}</h1>
      <p className="text-center">
        <em className="uppercase">Updated {formatDateString(updatedAt)}</em>
      </p>
    </header>
  );
}
