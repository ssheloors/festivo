import { parseHsla } from "./colors";

it("converts an hsla color to hex", () => {
  const hsla = "hsla(327, 26%, 57%, 1)";

  const hex = parseHsla(hsla);

  expect(hex).toBe("#ae7594ff");
});

it("passes through non-hsla strings", () => {
  const foo = parseHsla("foo");

  expect(foo).toBe("foo");
});
