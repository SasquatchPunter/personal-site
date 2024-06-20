import BaseImage from "./BaseImage";

export default function ExtendedImage(props: any) {
  const source = props.value.image;
  const { alt, caption, title } = props.value;
  return (
    <div className="text-gray-400 text-xs">
      <BaseImage
        className="w-full object-cover rounded-xl"
        source={source}
        width={400}
        height={300}
        alt={alt}
        title={title}
      />
      <p className="py-2">{caption}</p>
    </div>
  );
}
