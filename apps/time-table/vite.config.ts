/// <reference types='vitest' />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/time-table',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    // nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],

  // nxViteTsPaths 이슈사항 체크 임시해결책
  resolve: {
    alias: {
      '@libs/shared/shadcn-ui/ui': path.resolve(
        __dirname,
        '../../libs/shared/shadcn-ui/ui/src',
      ),
      '@libs/shared/shadcn-ui/util': path.resolve(
        __dirname,
        '../../libs/shared/shadcn-ui/util/src',
      ),
      '@libs/shared/utils': path.resolve(
        __dirname,
        '../../libs/shared/utils/src',
      ),
      '@TimeTable': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    outDir: '../../dist/apps/time-table',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
