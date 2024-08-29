interface Props {
  children: React.ReactNode;
}
export default function Body({ children }: Props) {
  return <body>{children}</body>;
}
