export function splitText(str: string, len: number = 1) {
  if (len <= 0) {
    throw new Error("Split text length cannot be negative or zero!");
  }
  let ret: string[] = [];
  let i = 0;
  while (i < str.length) {
    ret.push(str.substring(i, (i += len)));
  }
  return ret;
}
