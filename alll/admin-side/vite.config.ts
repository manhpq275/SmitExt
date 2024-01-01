import path from "path";
import { readdirSync } from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from 'dns'
dns.setDefaultResultOrder("verbatim")

const absolutePathAliases: { [key: string]: string } = {};
const srcPath = path.resolve("./src/");
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map(
  (dirent) => dirent.name.replace(/(\.ts){1}(x?)/, "")
);
srcRootContent.forEach(
  (directory) =>
    (absolutePathAliases[directory] = path.join(srcPath, directory))
);

export default defineConfig({
  plugins: [react()],
  root: "./",
  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },
  server: { open: true, port: 3000, host:false },
});
