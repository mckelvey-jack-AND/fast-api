import { getOrdinal } from "./getOrdinal";

describe("getOrdinal", () => {
  it('returns "st" for 1', () => {
    expect(getOrdinal(1)).toBe("st");
  });
  it('returns "nd" for 2', () => {
    expect(getOrdinal(2)).toBe("nd");
  });
  it('returns "rd" for 3', () => {
    expect(getOrdinal(3)).toBe("rd");
  });
  it('returns "th" for 24', () => {
    expect(getOrdinal(24)).toBe("th");
  });
  it('returns "th" for 35', () => {
    expect(getOrdinal(35)).toBe("th");
  });
});
