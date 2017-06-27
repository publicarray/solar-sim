import Detector from './Detector.js' // modified version
import { init, animate, camera, renderer } from './scene.js'
import './fullscreen.js'

if (Detector.webgl) {
  init()
  animate()
  window.addEventListener(
    'resize',
    function () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    false
  )
} else {
  var warning = Detector.getWebGLErrorMessage()
  document.getElementsByClassName('page-content')[0].appendChild(warning)
}
