import { register } from "@builder.io/sdk-angular";

export function registerDesignTokens() {
  register("editor.settings", {
    styleStrictMode: true, // optional
    allowOverridingTokens: true, // I like this in case I really want to change styles etc
    designTokens: {
      colors: [
        { name: "Primary", value: "var(--primary-color, #501283)" },
        { name: "Secondary", value: "var(--secondary-color, #128347)" },
      ],
      spacing: [
        { name: "Large", value: "var(--space-large, 20px)" },
        { name: "Small", value: "var(--space-small, 10px)" },
        { name: "Tiny", value: "5px" },
      ],
      fontSize: [
        { name: "Huge", value: "var(--font-size-huge, 48px)" },
        { name: "Large", value: "var(--font-size-large, 24px)" },
        { name: "Medium", value: "var(--font-size-medium, 18px)" },
        { name: "Small", value: "14px" },
      ],
      fontFamily: [
        { name: "Serif Font", value: "var(--serif-font, Roboto, serif)" },
        { name: "Primary Font", value: "Poppins, sans-serif" },
      ],
    },
  });
}
