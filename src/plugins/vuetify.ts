/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          glacio: "rgb(72, 172, 252)",
          fusion: "rgb(248, 116, 76)",
          electro: "rgb(184, 108, 252)",
          aero: "rgb(88, 252, 180)",
          spectro: "rgb(255, 228, 108)",
          havoc: "rgb(208, 140, 180)",
          highlight: "rgb(0, 255, 0)",
        },
      },
    },
  },
});
