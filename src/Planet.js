import CelestialObject from './CelestialObject'
import loadTextureAsync from './utils'
import {
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
          new MeshBasicMaterial({
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
}
