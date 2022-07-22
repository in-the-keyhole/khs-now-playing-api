const esbuildPluginTsc = require('esbuild-plugin-tsc');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
module.exports = {
  outDir: './build',
  esbuild: {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    platform: 'node',
    outfile: 'build/index.js',
    plugins: [esbuildPluginTsc(), nodeExternalsPlugin()],
  },
};
