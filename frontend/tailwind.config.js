// tailwind.config.js

import daisyui from "daisyui"; // Import Daisy UI (ESM syntax)

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use Daisy UI plugin
};
