// For production (legacy browsers)
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";
// const optimizeJs = require('rollup-plugin-optimize-js')

export default {
  input: 'src/index.js',
  output: {
    name: 'SolarSim',
    format: 'iife',
    file: 'dist/bundle-common.js',
  },
  plugins: [
    resolve({
      mainFields: ['module', 'pkg.module']
    }),
    babel({
      exclude: 'node_modules/**',
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
