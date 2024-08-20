interface Props {
  __html: string | TrustedHTML;
  wrapper?: "div" | "span";
  className?: string;
  title?: string;
}
export default function DangerousSVG({
  __html,
  wrapper = "div",
  className,
  title,
}: Props) {
  switch (wrapper) {
    case "div":
      return (
        <div
          dangerouslySetInnerHTML={{ __html }}
          className={className}
          title={title}
        />
      );
    case "span":
      return (
        <span
          title={title}
          dangerouslySetInnerHTML={{ __html }}
          className={className}
        />
      );
    default:
      return null;
  }
}
