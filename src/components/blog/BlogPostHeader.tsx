import NextImage from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { formatDateString } from "@/src/utils/date";

interface Props {
  title: string;
  mainImage: any;
  createdAt: string;
}
export default function BlogHeader({ title, mainImage, createdAt }: Props) {
  return (
    <header>
      <h1>{title}</h1>
      <NextImage
        className="w-full"
        src={urlForImage(mainImage)}
        alt="Blog Post header image."
        width={300}
        height={400}
        priority
      />
      <p>
        <em>Written on {formatDateString(createdAt)}</em>
      </p>
    </header>
  );
}
