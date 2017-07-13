import loadTextureAsync from './utils'
import * as THREE from 'three'

let count = 0 // FixMe

export default class CelestialObject {
  // diameter: of planet in km
  // distance: distance from sun in AU
  // period: orbit period around the sun
  // rotation: speed and direction of planet day/night cycle
  // tilt: degrees of equator inclination
  // orbitTilt: degrees of orbit inclination
  // options:
  //
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    tilt = 0,
    orbitTilt = 0,
    options = {}
  ) {
    this.root = new THREE.Object3D()
    this.diameter = diameter
    this.distance = distance
    this.period = period
    this.rotation = rotation
    // const radius = this.diameter * solarSystem.scale * 0.5;
    this.radius = 10

    this.distance = 50 * count // FixMe

    this.orbit = new THREE.Object3D()
    this.orbitLine = {}
    this.orbitLine.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3
    })
    this.orbitLine.geometry = new THREE.Geometry()
    for (var i = 0; i <= 64; i++) {
      var theta = i / 64 * Math.PI * 2
      this.orbitLine.geometry.vertices.push(
        new THREE.Vector3(
          Math.cos(theta) * this.distance,
          Math.sin(theta) * this.distance,
          0
        )
      )
    }

    this.orbitLine = new THREE.Line(
      this.orbitLine.geometry,
      this.orbitLine.material
    )
    this.orbitLine.rotation.x = Math.PI / -2 + orbitTilt * (Math.PI / 180)

    this.orbit.rotation.x = orbitTilt * (Math.PI / 180) // orbit tilt from degrees to radians

    // this.material = new THREE.MeshPhongMaterial({shininess: 0, wireframe: true})
    this.material = new THREE.MeshPhongMaterial({ shininess: 10 }) // default shininess = 30
    this.geo = new THREE.SphereGeometry(this.radius, 24, 24) // create geometry
    // this.geo = new THREE.IcosahedronGeometry(this.radius, 3),
    this.mesh = new THREE.Mesh(this.geo, new THREE.MeshBasicMaterial(0x000000))
    // this.mesh = new THREE.Mesh(new THREE.SphereGeometry(this.diameter * solarSystem.scale, 32, 32), new THREE.MeshPhongMaterial(0x000000));
    this.mesh.rotation.x = tilt * (Math.PI / 180) // equator tilt from degrees to radians
    this.mesh.position.set(this.distance, 0, 0) // FixMe
    count++ // FixMe
    // this.mesh.position.set(solarSystem.scale * this.distance * solarSystem.au * this.distance, 0, 0);
    this.orbit.add(this.mesh)
    this.root.add(this.orbitLine)
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
