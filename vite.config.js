import path from "path";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

const getConfig = ({ command, mode }) => ({
  server: {
    host: "0.0.0.0",
    hmr: {
      clientPort: 3000,
    },
  },
  resolve: {
    alias: {
      "@MyList": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), legacy()],
});

export default getConfig;
