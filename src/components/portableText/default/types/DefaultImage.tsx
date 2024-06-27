import NextImage from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export default function Image(props: any) {
  const {
    asset,
    caption,
    alt = "Image",
    title = "Embedded Image",
  } = props.value;
  const src = urlForImage(asset).url();
  return (
    <figure>
      <NextImage
        className="w-full object-cover rounded-xl"
        src={src}
        alt={alt}
        title={title}
        width={400}
        height={300}
      />
      {caption ? (
        <figcaption className="text-center text-sm m-2">{caption}</figcaption>
      ) : undefined}
    </figure>
  );
}
