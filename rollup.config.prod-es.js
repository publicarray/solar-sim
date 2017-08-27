// For production (modern browsers with es6+)
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  input: 'src/index.js',
  output: {
    format: 'es',
    file: 'dist/bundle-es.js',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: false,
      modulesOnly: true,
    }),
    uglify({
      toplevel: true,
      compress: {
        drop_console: true,
        passes: 2,
        unsafe: true,
      }
    }, minify)
  ]
};
