import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import replace from "@rollup/plugin-replace";

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_STRIPE_SECRET_KEY": JSON.stringify(
        env.REACT_STRIPE_SECRET_KEY
      ),
      "process.env.AXIOS_URL": JSON.stringify(env.AXIOS_URL),
      "process.env.REACT_APP_CLOUDINARY_ID": JSON.stringify(
        env.REACT_APP_CLOUDINARY_ID
      ),
      "process.env.PAGE_URL": JSON.stringify(env.PAGE_URL),
    },
    plugins: [react()],
  };
});
