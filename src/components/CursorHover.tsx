import useCursorContext from "@/src/hooks/useCursorContext";

type CursorAction = Exclude<
  keyof ReturnType<typeof useCursorContext>["actions"],
  "move" | "scroll"
>;

interface Props {
  children: React.ReactNode;
  enterEffect: CursorAction;
  leaveEffect: CursorAction;
  inline?: boolean;
}
export default function CursorHover({
  children,
  enterEffect,
  leaveEffect,
  inline = false,
}: Props) {
  const { actions } = useCursorContext();

  return inline ? (
    <span
      onMouseEnter={actions[enterEffect]}
      onMouseLeave={actions[leaveEffect]}
    >
      {children}
    </span>
  ) : (
    <div
      onMouseEnter={actions[enterEffect]}
      onMouseLeave={actions[leaveEffect]}
    >
      {children}
    </div>
  );
}
