import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Replace 'src' with your desired root directory
            '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@use "@/_mantine.scss";`,
                silenceDeprecations: ['legacy-js-api'],
            },
        },
    },
    server: {
      host: 'localhost',
      port: 5172
    },
})