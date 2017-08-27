// For production (legacy browsers)
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    file: 'dist/bundle-common.js',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: false,
      modulesOnly: true,
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    uglify({
      toplevel: true,
      compress: {
        drop_console: true,
        passes: 2,
        unsafe: true
      }
    })
  ]
};
