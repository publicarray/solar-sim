// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
// (beta) Testing closure compiler
// yarn add --dev rollup-plugin-closure-compiler-js
import closure from 'rollup-plugin-closure-compiler-js';

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    file: 'dist/bundle-common-closure.js',
  },
  name: 'SolarSim'
  plugins: [
    resolve({
      jsnext: true,
      main: false,
      modulesOnly: true,
    }),
    closure({
      languageIn: 'ES6',
      languageOut: 'ES5',
      // compilationLevel: 'ADVANCED',
      warningLevel: 'VERBOSE',
      externs: [{src:`var WebGL2RenderingContext`}]
    })
  ]
};
