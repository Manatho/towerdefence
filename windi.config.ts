import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          normal: colors.slate[500],
          light: colors.slate[300],
          dark: colors.slate[700],
        },
        on: {
          primary: colors.white
        }
        // ...
      },
    },
  },
});
