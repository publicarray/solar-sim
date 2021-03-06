import Detector from './Detector' // modified version
import { init, animate, camera, renderer } from './scene'
import './fullscreen'

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
  document.body.appendChild(warning)
}
