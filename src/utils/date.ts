export function formatDateString(
  date: string,
  options?: { format: "string" }
): string;
export function formatDateString(
  date: string,
  options: { format: "millis" | "seconds" }
): number;
export function formatDateString(
  date: string,
  options?: { format: "string" | "millis" | "seconds" }
) {
  switch (options?.format) {
    case "millis":
      return new Date(date).getUTCMilliseconds();
    case "seconds":
      return new Date(date).getUTCSeconds();
    default:
      return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
  }
}

/**
 * Sorting function for date strings.
 * @returns Negative number if `a` comes before `b`, 0 if `a` and `b` are equal, and a positive number if `a` comes after `b`.
 */
export function compareDateStrings(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime();
}
