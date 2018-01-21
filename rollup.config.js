// For development (browsers with es6+ only)
import resolve from 'rollup-plugin-node-resolve';

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
    })
  ]
};
