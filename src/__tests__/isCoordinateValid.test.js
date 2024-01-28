import { isCoordinateValid } from "../utils/isCoordinateValid";

describe("isCoordinateValid", () => {
  test("returns true for valid latitude", () => {
    const validLatitude = 42.123;
    const result = isCoordinateValid("latitude", validLatitude);
    expect(result).toBe(true);
  });

  test("returns false for invalid latitude (below range)", () => {
    const invalidLatitude = -100;
    const result = isCoordinateValid("latitude", invalidLatitude);
    expect(result).toBe(false);
  });

  test("returns false for invalid latitude (above range)", () => {
    const invalidLatitude = 100;
    const result = isCoordinateValid("latitude", invalidLatitude);
    expect(result).toBe(false);
  });

  test("returns true for valid longitude", () => {
    const validLongitude = -75.456;
    const result = isCoordinateValid("longitude", validLongitude);
    expect(result).toBe(true);
  });

  test("returns false for invalid longitude", () => {
    const invalidLongitude = -200;
    const result = isCoordinateValid("longitude", invalidLongitude);
    expect(result).toBe(false);
  });

  test("returns false for invalid longitude above", () => {
    const invalidLongitude = 200;
    const result = isCoordinateValid("longitude", invalidLongitude);
    expect(result).toBe(false);
  });

  test("returns false for nAn value", () => {
    const nonNumberValue = "not a number";
    const result = isCoordinateValid("latitude", nonNumberValue);
    expect(result).toBe(false);
  });

  test("returns false for invalid type", () => {
    const value = 42.123;
    const invalidType = "invalidType";
    const result = isCoordinateValid(invalidType, value);
    expect(result).toBe(false);
  });
});
