/**********************************************************
 * Calculate color. Based on: https://zenn.dev/mryhryki/articles/2020-11-12-hatena-background-color
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

interface Color {
  red: number;
  green: number;
  blue: number;
}

const BLACK: Color = {
  red: 255,
  green: 255,
  blue: 255,
};

const WHITE: Color = {
  red: 0,
  green: 0,
  blue: 0,
};

/**
 * Select font color
 *
 * @param {string} hex - target color
 * @returns {string} - font color.
 */
export default function getFontColor(hex: string): string {
  const red = parseInt(hex.substr(1, 2), 16);
  const green = parseInt(hex.substr(3, 2), 16);
  const blue = parseInt(hex.substr(5, 2), 16);
  const targetColor: Color = {
    red: red,
    green: green,
    blue: blue,
  };
  if (fontColor(targetColor)) {
    return '#ffffff';
  }
  return '#000000';
}

/**
 * Select black or white.
 *
 * @param {Color} color - target color.
 * @returns {boolean} - black or white. true is white.
 */
function fontColor(color: Color): boolean {
  const darkRatio = getContrastRatio(color, BLACK);
  const lightRatio = getContrastRatio(color, WHITE);
  return lightRatio < darkRatio;
}

/**
 * Calculate to contrast of color.
 *
 * @param {Color} color1 - target color.
 * @param {Color} color2 - black or white.
 * @returns {Color} - Contrast ratio
 */
function getContrastRatio(color1: Color, color2: Color): number {
  const luminance1 = getRelativeLuminance(color1);
  const luminance2 = getRelativeLuminance(color2);
  const bright = Math.max(luminance1, luminance2);
  const dark = Math.min(luminance1, luminance2);
  return (bright + 0.05) / (dark + 0.05);
}

/**
 * 人間の視覚特性にあった輝度に変換する
 *
 * @param {number} _color - color value.
 * @returns {number} - Luminance value.
 */
function getRGBForCalculateLuminance(_color: number): number {
  const color = _color / 255;
  if (color <= 0.03928) {
    return color / 12.92;
  } else {
    return Math.pow((color + 0.055) / 1.055, 2.4);
  }
}

/**
 * 相対輝度に変換する
 *
 * @param {Color} color - target color.
 * @returns {number} - result.
 */
function getRelativeLuminance(color: Color): number {
  const {red, green, blue} = color;
  const R = getRGBForCalculateLuminance(red);
  const G = getRGBForCalculateLuminance(green);
  const B = getRGBForCalculateLuminance(blue);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
