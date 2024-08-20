interface Props {
  children: React.ReactNode;
}
export default function Body({ children }: Props) {
  return <body className="min-h-screen">{children}</body>;
}
