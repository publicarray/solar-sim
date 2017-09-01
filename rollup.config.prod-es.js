// For production (modern browsers with es6+)
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
// const optimizeJs = require('rollup-plugin-optimize-js')

export default {
  input: 'src/index.js',
  output: {
    format: 'es',
    file: 'dist/bundle-es.js',
  },
  name: 'SolarSim',
  plugins: [
    resolve({
      jsnext: true,
      main: false,
      modulesOnly: true,
    }),
    commonjs({
      include: 'node_modules/dat.gui/**',
      namedExports: {
        'node_modules/dat.gui/build/dat.gui.js': [ 'GUI', 'color', 'controllers', 'dom', 'gui' ]
      }
    }),
    uglify({
      toplevel: true,
      compress: {
        drop_console: true,
        passes: 2,
        unsafe: true,
      }
    }, minify),
    // optimizeJs()
  ]
};
