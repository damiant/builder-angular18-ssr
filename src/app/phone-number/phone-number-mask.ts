import { maskitoTransform, type MaskitoOptions } from "@maskito/core";

// See https://maskito.dev/recipes/phone
export const phoneMask = {
  mask: [
    "+",
    "1",
    " ",
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
} satisfies MaskitoOptions;

export function validPhone(value: string): boolean {
  const maskedValue = maskitoTransform(value, phoneMask);  
  return maskedValue === value && value.length === phoneMask.mask.length;
}
