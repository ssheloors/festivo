const hslaRegex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/;

function floatToHex(uint: number) {
  const hex = Math.round(uint).toString(16);
  return hex.padStart(2, "0");
}

/**
 * Parses a HSL(A) string and returns the corresponding HEX
 * color string.
 *
 * Yes, I did code this myself. Not the first time hehe
 */
export function parseHsla(hslaString: string) {
  const match = hslaString.match(hslaRegex);

  if (!match) {
    return hslaString;
  }

  const h = parseInt(match[1], 10) / 360;
  const s = parseInt(match[2], 10) / 100;
  const l = parseInt(match[3], 10) / 100;
  const a = parseFloat(match[4] ?? "1");

  const [r, g, b] = hslToRgb(h, s, l);

  return `#${floatToHex(r)}${floatToHex(g)}${floatToHex(b)}${floatToHex(a * 255)}`;
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * Credit goes to mjackson on GitHub: https://gist.github.com/mjackson/5311256
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
export function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}
