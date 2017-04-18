// import * as THREE from 'three'
// import OrbitControls from './libs/OrbitControls'

// import Stats from 'stats.js'
// import dat from '../node_modules/dat.gui/build/dat.gui'

// import CelestialObject from './CelestialObject';

import Detector from './Detector' // modified version
import {init, animate, camera, renderer} from './scene'
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
  document.getElementsByClassName('page-content')[0].appendChild(warning)
}

// let scene = new THREE.Scene()
// console.log(THREE.OrbitControls);
// console.log(THREE, Stats, dat, OrbitControls);

// new CelestialObject();
// function init(){};
// function animate(){};
