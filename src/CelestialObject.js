import loadTextureAsync from './utils'
import {
  Object3D,
  Mesh,
  MeshPhongMaterial,
  MeshBasicMaterial,
  // SphereGeometry,
  // OctahedronGeometry,
  IcosahedronGeometry
} from 'three'

let count = 1 // FixMe

export default class CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    options = {}
  ) {
    this.diameter = diameter
    this.distance = distance
    this.period = period
    this.rotation = rotation
    // let radius = this.diameter * solarSystem.scale * 0.5;
    this.radius = 10
    this.orbit = new Object3D()
    // this.material = new MeshPhongMaterial({shininess: 0, wireframe: true})
    this.material = new MeshPhongMaterial({shininess: 0})
    this.mesh = new Mesh(
      // new SphereGeometry(this.radius, 30, 24, 12),
      // new OctahedronGeometry(this.radius, 3),
      new IcosahedronGeometry(this.radius, 3),
      new MeshBasicMaterial(0x000000)
    )
    // this.mesh = new Mesh(new SphereGeometry(this.diameter * solarSystem.scale, 32, 32), new MeshPhongMaterial(0x000000));
    this.mesh.position.set(50 * count, 0, 0) // FixMe
    count++ // FixMe
    // this.mesh.position.set(solarSystem.scale * this.distance * solarSystem.au * this.distance, 0, 0);
    this.orbit.add(this.mesh)
  }

  setMap (url, mapType = 'map') {
    loadTextureAsync(url)
      .then(texture => {
        this.material[mapType] = texture
        this.mesh.material = this.material
      })
      .catch(err => {
        console.log(err)
      })
    return this
  }

  addTo (scene) {
    scene.add(this.orbit)
    return this
  }

  animate () {
    this.mesh.rotation.y += 0.01 // fixme
  }
}
