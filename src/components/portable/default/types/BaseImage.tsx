import { urlForImage } from "@/sanity/lib/image";
import NextImage from "next/image";

interface Props {
  className?: string;
  source: any;
  height?: number | `${number}`;
  width?: number | `${number}`;
  alt?: string;
  title?: string;
}
export default function BaseImage({
  className,
  source,
  height,
  width,
  alt,
  title,
}: Props) {
  const src = urlForImage(source);
  return (
    <NextImage
      className={className}
      src={src}
      height={height}
      width={width}
      alt={alt || "Image"}
      title={title}
    />
  );
}
