import CelestialObject from './CelestialObject'
import loadTextureAsync from './utils'
import {
  SphereGeometry,
  // IcosahedronGeometry, // smoother details, messes with texture
  RingGeometry,
  Mesh,
  MeshPhongMaterial,
  MeshBasicMaterial,
  DoubleSide
} from 'three'

export default class Planet extends CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    options = {}
  ) {
    super(diameter, distance, period, rotation, options)
  }

  addRing (url) {
    loadTextureAsync(url) // get texture
      .then(texture => {
        this.ring = new Mesh( // create mesh and apply geometry and material
          new RingGeometry(this.radius + 1, this.radius + 7, 32), // create geometry
          new MeshPhongMaterial({
            map: texture,
            transparent: true,
            side: DoubleSide
          }) // apply texture to new material
        )
        this.ring.rotation.x = Math.PI / -2 // rotate 90 degrees // Fixme
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
        this.clouds = new Mesh( // create mesh and apply geometry and material
          // new IcosahedronGeometry(this.radius + 0.5, 3),
          new SphereGeometry(this.radius + 1, 24, 24), // create geometry
          new MeshPhongMaterial({
            map: texture,
            alphaMap: texture,
            // wireframe: true,
            transparent: true,
            depthWrite: false,
            side: DoubleSide
          }) // apply texture to new material
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
