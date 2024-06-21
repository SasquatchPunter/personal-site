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
