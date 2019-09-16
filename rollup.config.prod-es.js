// For production (modern browsers with es6+)
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
// const optimizeJs = require('rollup-plugin-optimize-js')

export default {
  input: 'src/index.js',
  output: {
    name: 'SolarSim',
    format: 'es',
    file: 'dist/bundle-es.js',
  },
  plugins: [
    resolve({
      mainFields: ['module', 'pkg.module']
    }),
    terser({
      toplevel: true,
      compress: {
        drop_console: true,
        passes: 2,
        unsafe: true,
      }
    }),
    // optimizeJs()
  ]
};
