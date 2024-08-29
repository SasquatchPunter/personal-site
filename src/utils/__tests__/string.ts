import { splitText } from "../string";

describe("splitText()", () => {
  test("Splits empty strings", () => {
    expect(splitText("")).toEqual([]);
  });

  test("Splits strings into single chars", () => {
    expect(splitText("abcd")).toEqual(["a", "b", "c", "d"]);
  });

  test("Splits strings into chunked substrings based on len parameter", () => {
    const s = "abcd";
    expect(splitText(s, 2)).toEqual(["ab", "cd"]);
    expect(splitText(s, 4)).toEqual(["abcd"]);
    expect(splitText(s, 3)).toEqual(["abc", "d"]);
    expect(splitText(s, 6)).toEqual(["abcd"]);
  });
});
