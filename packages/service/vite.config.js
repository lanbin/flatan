import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
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
      external: [
        'vue',
        '@vueuse/shared',
        'lodash-es',
        'aptos',
        'eventemitter3',
        '@blocto/sdk',
        '@fewcha/web3',
        'msafe-wallet',
        "@mysten/sui.js",
        "@openblockhq/dappsdk",
        "@mysten/wallet-standard",
        "@wallet-standard/core"
      ],
      input: ['lib/index.ts'],
      output: {
        globals: {
        'vue': 'vue',
        '@vueuse/shared': 'share',
        'lodash-es': 'lodashEs',
        'eventemitter3': 'EventEmitter',
        '@blocto/sdk': 'BloctoSDK',
        '@fewcha/web3': 'Web3',
        'msafe-wallet': 'MSafeWallet',
        '@wallet-standard/core': 'core',
        '@openblockhq/dappsdk': 'openblock'
        },
      },
    },
    lib: {
      entry: './lib/index.ts',
      fileName: 'index',
      name: 'AptosWalletAdapter'
    },
  },
});

