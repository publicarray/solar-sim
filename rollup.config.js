// For development (browsers with es6+ only)
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  format: 'es',
  dest: 'dist/bundle-es6.js',
  plugins: [
    resolve({
      jsnext: true,
      main: false,
      modulesOnly: true,
    })
  ]
};
