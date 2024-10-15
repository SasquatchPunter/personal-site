interface Props {
  className?: string;
  children?: React.ReactNode;
}
export default function Body({ children, className }: Props) {
  return (
    <body className={["overflow-x-hidden", className].join(" ")}>
      {children}
    </body>
  );
}
