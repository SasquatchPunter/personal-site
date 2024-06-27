import { PreviewProps } from "sanity";

export default function SectionRule(props: PreviewProps) {
  const { visible } = props as PreviewProps & { visible: boolean };

  const visibleStyle = visible ? "opacity-100" : "opacity-30";

  return (
    <hr className={[visibleStyle, "border-t-2 border-dotted"].join(" ")} />
  );
}
