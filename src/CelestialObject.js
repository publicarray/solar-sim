import loadTextureAsync from './utils'
import {
  Object3D,
  Mesh,
  MeshPhongMaterial,
  MeshBasicMaterial,
  // IcosahedronGeometry,
  // SphereBufferGeometry,
  SphereGeometry
} from 'three'

let count = 0 // FixMe

export default class CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    options = {}
  ) {
    this.root = new Object3D()
    this.diameter = diameter
    this.distance = distance
    this.period = period
    this.rotation = rotation
    // const radius = this.diameter * solarSystem.scale * 0.5;
    this.radius = 10
    this.orbit = new Object3D()
    // this.material = new MeshPhongMaterial({shininess: 0, wireframe: true})
    this.material = new MeshPhongMaterial({ shininess: 10 }) // default shininess = 30
    this.geo = new SphereGeometry(this.radius, 24, 24) // create geometry
    // this.geo = new IcosahedronGeometry(this.radius, 3),
    this.mesh = new Mesh(this.geo, new MeshBasicMaterial(0x000000))
    // this.mesh = new Mesh(new SphereGeometry(this.diameter * solarSystem.scale, 32, 32), new MeshPhongMaterial(0x000000));
    this.mesh.position.set(50 * count, 0, 0) // FixMe
    count++ // FixMe
    // this.mesh.position.set(solarSystem.scale * this.distance * solarSystem.au * this.distance, 0, 0);
    this.orbit.add(this.mesh)
    this.root.add(this.orbit)
  }

  setMap (url, mapType = 'map', options = {}) {
    loadTextureAsync(url)
      .then(texture => {
        this.material[mapType] = texture
        Object.assign(this.material, options)
        this.mesh.material = this.material
      })
      .catch(err => {
        console.log(err)
      })
    return this
  }

  addTo (scene) {
    scene.add(this.root)
    return this
  }

  animate (delta) {
    this.mesh.rotation.y += 0.03 * delta // fixme
    // this.orbit.rotation.y += 0.01 * delta // fixme
  }
}
