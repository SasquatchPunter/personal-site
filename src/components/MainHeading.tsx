import SplitText from "@/src/components/SplitText";

interface Props {
  children: string;
}
export default function MainHeading({ children }: Props) {
  return (
    <h1 className="font-black size-fit m-auto text-6xl main-heading">
      <SplitText className="main-heading">{children}</SplitText>
    </h1>
  );
}
