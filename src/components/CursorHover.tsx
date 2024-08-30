import useCursorContext from "@/src/hooks/useCursorContext";

type CursorAction = Exclude<
  keyof ReturnType<typeof useCursorContext>["actions"],
  "move" | "scroll"
>;

interface Props {
  children: React.ReactNode;
  className?: string;
  enterEffect: CursorAction;
  leaveEffect: CursorAction;
  span?: boolean;
}
export default function CursorHover({
  children,
  className,
  enterEffect,
  leaveEffect,
  span = false,
}: Props) {
  const { actions } = useCursorContext();

  return span ? (
    <span
      className={className}
      onMouseEnter={actions[enterEffect]}
      onMouseLeave={actions[leaveEffect]}
    >
      {children}
    </span>
  ) : (
    <div
      className={className}
      onMouseEnter={actions[enterEffect]}
      onMouseLeave={actions[leaveEffect]}
    >
      {children}
    </div>
  );
}
