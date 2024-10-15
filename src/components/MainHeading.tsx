import SplitText from "@/src/components/SplitText";
import CursorHover from "@/src/components/CursorHover";

interface Props {
  children: string;
}
export default function MainHeading({ children }: Props) {
  return (
    <h1 className="font-anton w-fit mx-auto p-4 text-6xl text-center">
      <CursorHover enterEffect="activate" leaveEffect="deactivate">
        <SplitText className="main-heading">{children}</SplitText>
      </CursorHover>
    </h1>
  );
}
