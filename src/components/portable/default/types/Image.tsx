import BaseImage from "./BaseImage";

export default function Image(props: any) {
  return (
    <div>
      <BaseImage
        className="w-full object-cover rounded-xl"
        source={props.value}
        width={400}
        height={300}
      />
    </div>
  );
}
