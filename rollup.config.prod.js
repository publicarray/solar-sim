// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  entry: 'src/index.js',
  format: 'es',
  dest: 'dist/bundle-es6.js',
  plugins: [
    resolve({
      jsnext: true,
      main: false,
      modulesOnly: true,
    }),
    uglify({}, minify)
  ]
};
