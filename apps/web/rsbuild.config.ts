import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  resolve: {
    alias: {
      '@web': './src',
    },
  },
  html: {
    template: './public/index.html',
    title: 'Zara Smartphones',
    meta: {
      description: 'Catálogo de smartphones - Zara Web Challenge',
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
    },
  },
  output: {
    distPath: {
      root: 'dist',
    },
  },
});
