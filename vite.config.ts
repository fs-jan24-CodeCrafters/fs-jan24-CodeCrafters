import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './fs-jan24-CodeCrafters',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
				@import './src/styles/reset.scss';
				@import './src/styles/utils/vars.scss';
				@import './src/styles/utils/mixins.scss';
				@import './src/styles/helpers.scss';
				@import './src/styles/fonts';
				@import './src/styles/utils/extends';
				`,
      },
    },
  },
});
