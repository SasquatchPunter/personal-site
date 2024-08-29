import { splitText } from "@/src/utils/string";

interface Props {
  children: string;
  /** Classname to be applied to span elements. */
  className?: string;
  /** Length of each split chunk. Defaults to 1. */
  splitLength?: number;
}
/** Splits a text child into chunks and wraps them in individual span elements. */
export default function SplitText({
  children,
  className,
  splitLength = 1,
}: Props) {
  const chunks = splitText(children, splitLength).map((chunk) => (
    <span className={className}>{chunk}</span>
  ));
  return <>{chunks}</>;
}
