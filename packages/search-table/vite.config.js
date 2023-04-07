import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
    }),
  ],
  build: {
    outDir: 'dist',

    rollupOptions: {
      external: ['vue', '@vueuse/shared', 'lodash-es', 'uno.css', 'ant-design-vue'],
      input: ['lib/index.ts'],
      output: {
        globals: {
          vue: 'vue',
          '@vueuse/shared': 'share',
          'lodash-es': 'lodashEs',
          'ant-design-vue': 'ant-design-vue',
        },
        exports: 'named',
      },
    },
    lib: {
      entry: './lib/index.ts',
      fileName: 'index',
      name: 'FlatanSeachTable',
    },
  },
});

