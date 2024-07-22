import { compareDateStrings } from "../date";

describe("compareDateStrings()", () => {
  describe("Correctly sorts ISO date strings", () => {
    const origin = "2020-01-01T00:00:00Z";

    const year = "2021-01-01T00:00:00Z";
    const month = "2020-02-01T00:00:00Z";
    const day = "2020-01-02T00:00:00Z";
    const hour = "2020-01-01T01:00:00Z";
    const minute = "2020-01-01T00:01:00Z";
    const second = "2020-01-01T00:00:01Z";

    test("Correct year sorting.", () => {
      expect(compareDateStrings(origin, year)).toBeLessThan(0);
      expect(compareDateStrings(year, origin)).toBeGreaterThan(0);
      expect(compareDateStrings(year, year)).toEqual(0);
    });

    test("Correct month sorting.", () => {
      expect(compareDateStrings(origin, month)).toBeLessThan(0);
      expect(compareDateStrings(month, origin)).toBeGreaterThan(0);
      expect(compareDateStrings(month, month)).toEqual(0);
    });

    test("Correct day sorting.", () => {
      expect(compareDateStrings(origin, day)).toBeLessThan(0);
      expect(compareDateStrings(day, origin)).toBeGreaterThan(0);
      expect(compareDateStrings(day, day)).toEqual(0);
    });

    test("Correct hour sorting.", () => {
      expect(compareDateStrings(origin, hour)).toBeLessThan(0);
      expect(compareDateStrings(hour, origin)).toBeGreaterThan(0);
      expect(compareDateStrings(hour, hour)).toEqual(0);
    });

    test("Correct minute sorting.", () => {
      expect(compareDateStrings(origin, minute)).toBeLessThan(0);
      expect(compareDateStrings(minute, origin)).toBeGreaterThan(0);
      expect(compareDateStrings(minute, minute)).toEqual(0);
    });

    test("Correct second sorting.", () => {
      expect(compareDateStrings(origin, second)).toBeLessThan(0);
      expect(compareDateStrings(second, origin)).toBeGreaterThan(0);
      expect(compareDateStrings(second, second)).toEqual(0);
    });

    test("Correct sorting when used with array sort.", () => {
      const desc = [year, month, day, hour, minute, second];
      const asc = [second, minute, hour, day, month, year];
      expect(desc.sort(compareDateStrings)).toEqual(asc);
      expect(desc.sort((a, b) => compareDateStrings(b, a))).toEqual(desc);
    });
  });
  /*TODO: More string formats eventually */
});
