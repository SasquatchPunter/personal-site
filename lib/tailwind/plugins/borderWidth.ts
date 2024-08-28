import type { PluginUtils } from "tailwindcss/types/config";

export default function borderWidth({ theme }: PluginUtils) {
  const borderWidth: { [key: string]: string } = {};
  const spacing = theme("spacing");

  for (const [key, value] of Object.entries<string>(spacing)) {
    borderWidth[key] = value;

    borderWidth[`x-${key}`] = value;
    borderWidth[`y-${key}`] = value;

    borderWidth[`t-${key}`] = value;
    borderWidth[`b-${key}`] = value;
    borderWidth[`l-${key}`] = value;
    borderWidth[`r-${key}`] = value;
  }

  return borderWidth;
}
