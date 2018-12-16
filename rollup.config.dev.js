import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import _package from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: _package.main,
      format: 'umd',
      name: 'path-matcher',
      sourcemap: true,
    },
  ],
  watch: {
    include: 'src/**',
  },
  external: [
    ...Object.keys(_package.dependencies || {}),
    ...Object.keys(_package.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    copy({
      'src/@types': 'dist/@types',
    }),
  ],
};
