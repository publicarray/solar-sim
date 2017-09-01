// For development (browsers with es6+ only)
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

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
    })
  ]
};
