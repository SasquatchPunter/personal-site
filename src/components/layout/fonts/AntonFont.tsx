import { Anton } from "next/font/google";

const font = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});

interface Props {
  children: React.ReactNode;
}
/** Top level page wrapper that loads the Anton font from Google Fonts. */
export default function AntonFont({ children }: Props) {
  return <div className={font.variable}>{children}</div>;
}
