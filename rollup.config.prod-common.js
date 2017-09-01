// For production (legacy browsers)
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
// const optimizeJs = require('rollup-plugin-optimize-js')

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    file: 'dist/bundle-common.js',
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
    }),
    // optimizeJs()
  ]
};
