import CelestialObject from './CelestialObject'
import * as THREE from 'three'
// import Gyroscope from './libs/Gyroscope'

// source: https://github.com/mgvez/jsorrery/blob/master/src/graphics3d/Sun.js
class SunCorona {
  constructor () {
    this.root = new THREE.Object3D()
    this.uniforms = {
      aspectRatio: { type: 'f', value: 0.0 },
      sunPosition: { type: 'v3', value: new THREE.Vector3() },
      sunScreenPos: { type: 'v3', value: new THREE.Vector3() },
      sunSize: { type: 'f', value: 0.0 },
      randAngle: { type: 'f', value: 0.0 },
      camAngle: { type: 'f', value: 0.0 }
    }

    const mat = new THREE.ShaderMaterial({
      vertexShader: document.getElementById('sun-vertex').textContent,
      fragmentShader: document.getElementById('sun-fragment').textContent,
      uniforms: this.uniforms,
      transparent: true
    })

    // const mat = new THREE.MeshBasicMaterial({ color: 0xaa7700 });
    const geo = new THREE.PlaneGeometry(300, 300, 10, 10)
    this.mesh = new THREE.Mesh(geo, mat)
    this.root.add(this.mesh)
  }

  animate (delta, camera) {
    let sunPos = this.mesh.position
    let camPos = camera.position
    const camToSun = camPos.clone().sub(sunPos)
    this.mesh.quaternion.copy(camera.quaternion)
    this.mesh.position.copy(camToSun.clone().multiplyScalar(0.1))
    const sunScreenPos = sunPos.clone().project(camera)
    this.uniforms.sunPosition.value.copy(camToSun.multiplyScalar(-1))
    const visibleW =
      Math.tan(Math.PI / 180 * camera.fov / 2) * camToSun.length() * 2
    const sunScaledSize = this.sunSize * this.scale
    const sunScreenRatio = sunScaledSize / visibleW
    // console.log(visibleW, camera.fov, camToSun.length(), sunScaledSize);
    this.uniforms.aspectRatio.value = camera.aspect
    this.uniforms.sunSize.value = sunScreenRatio
    this.uniforms.randAngle.value = this.uniforms.randAngle.value + 0.001
    this.uniforms.camAngle.value = camToSun.angleTo(new THREE.Vector3(1, 1, 0))
    this.uniforms.sunScreenPos.value = sunScreenPos
  }
}

export default class Star extends CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    options = {}
  ) {
    super(diameter, distance, period, rotation, options)

    this.light = new THREE.PointLight(0xffffff, 1)
    this.root.add(this.light)

    this.corona = new SunCorona()
    this.corona.scale = 1
    this.corona.sunSize = 30 // this.scaled.radius
    this.root.add(this.corona.root)

    this.orbit.remove(this.mesh)
    this.root.remove(this.orbit)
    // console.log('this.corona', this.corona)
  }

  animate (delta, camera) {
    this.corona.animate(delta, camera)
  }
}
