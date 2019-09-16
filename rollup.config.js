// For development (browsers with es6+ only)
import resolve from 'rollup-plugin-node-resolve';

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
    })
  ]
};
