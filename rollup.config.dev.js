import _package from './package.json';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: _package.main,
      format: 'umd',
      name: 'path-matcher',
      sourcemap: true,
    },
    {
      file: _package.module,
      format: 'es',
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
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true,
    }),
    commonjs(),
    sourceMaps(),
  ],
};
