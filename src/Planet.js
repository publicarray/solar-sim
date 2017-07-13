import CelestialObject from './CelestialObject'
import loadTextureAsync from './utils'
import * as THREE from 'three'

export default class Planet extends CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    tilt = 0,
    orbitTilt = 0,
    options = {}
  ) {
    super(diameter, distance, period, rotation, tilt, orbitTilt, options)
  }

  addRing (url) {
    loadTextureAsync(url) // get texture
      .then(texture => {
        this.ring = new THREE.Mesh( // create mesh and apply geometry and material
          new THREE.RingGeometry(this.radius + 1, this.radius + 7, 32), // create geometry
          new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
          }) // apply texture to new THREE.material
        )
        this.ring.rotation.x = Math.PI / -2 // rotate 90 degrees
        this.mesh.add(this.ring) // add ring to self (planet)
      })
      .catch(err => {
        console.log(err)
      })
    return this
  }

  addClouds (url) {
    loadTextureAsync(url) // get texture
      .then(texture => {
        this.clouds = new THREE.Mesh( // create mesh and apply geometry and material
          // new THREE.IcosahedronGeometry(this.radius + 0.5, 3),
          new THREE.SphereGeometry(this.radius + 0.7, 24, 24), // create geometry
          new THREE.MeshPhongMaterial({
            map: texture,
            alphaMap: texture,
            // wireframe: true,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide
          }) // apply texture to new THREE.material
        )
        this.mesh.add(this.clouds) // add clouds to self (planet)
      })
      .catch(err => {
        console.log(err)
      })
    return this
  }

  animate (delta) {
    super.animate(delta)
    if (this.clouds) {
      this.clouds.rotation.y -= 1 / 16 * delta
      // this.clouds.rotation.x  += 1/32 * delta
    }
  }
}
