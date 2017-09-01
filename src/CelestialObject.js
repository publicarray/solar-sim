import { solarSystem } from './vars'
import { globals } from './gui'
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
    if (typeof this.options === 'undefined') {
      this.options = {}
    }

    this.root = new THREE.Object3D()
    this.diameter = diameter
    this.distance = distance
    this.period = period
    this.rotation = rotation
    this.radius = diameter * 0.5

    this.scaled = {}
    this.scaled.radius = this.radius * globals.scale * globals.planetScale
    this.scaled.distance = this.distance * solarSystem.au * globals.scale
    this.setSpeed()

    // this.scaled.radius = 10
    // this.scaled.distance = 50 * count // FixMe
    // this.scaled.period = 0.03
    // this.scaled.period = 1
    // count++ // FixMe

    this.orbit = new THREE.Object3D()
    this.orbitLine = {}
    this.orbitLine.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3
    })
    this.drawOrbitLine()

    this.orbitLine = new THREE.Line(
      this.orbitLine.geometry,
      this.orbitLine.material
    )
    this.orbitLine.rotation.x = Math.PI / -2 + orbitTilt * (Math.PI / 180)
    this.orbitLine.updateMatrix()

    this.orbit.rotation.x = orbitTilt * (Math.PI / 180) // orbit tilt from degrees to radians
    // this.material = new THREE.MeshPhongMaterial({shininess: 0, wireframe: true})
    this.material = new THREE.MeshPhongMaterial({ shininess: 10 }) // default shininess = 30
    this.geo = new THREE.SphereGeometry(
      this.scaled.radius,
      globals.vecors,
      globals.vectors
    ) // create geometry
    // this.geo = new THREE.IcosahedronGeometry(this.radius, 3),
    this.mesh = new THREE.Mesh(this.geo, new THREE.MeshBasicMaterial(0x000000))
    // this.mesh = new THREE.Mesh(new THREE.SphereGeometry(this.diameter * solarSystem.scale, 32, 32), new THREE.MeshPhongMaterial(0x000000));
    this.mesh.rotation.x = tilt * (Math.PI / 180) // equator tilt from degrees to radians
    // this.mesh.position.set(this.distance, 0, 0) // FixMe
    this.mesh.position.set(this.scaled.distance, 0, 0)
    // this.mesh.position.set(this.distance * this.distance * solarSystem.au * solarSystem.scale, 0, 0);
    this.orbit.add(this.mesh)
    this.root.add(this.orbitLine)
    this.root.add(this.orbit)

    // Performance Optimisation
    this.orbitLine.matrixAutoUpdate = false
    if (
      typeof this.options.static !== 'undefined' &&
      this.options.static === true
    ) {
      this.root.matrixAutoUpdate = false // static root
    }
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

  remove (scene) {
    scene.remove(this.root)
    return this
  }

  drawOrbitLine (vectors) {
    vectors = vectors || globals.vectors
    this.orbitLine.geometry = new THREE.Geometry()
    this.orbitLine.geometry.vertices = []
    for (var i = 0; i <= vectors * 2; i++) {
      var theta = i / (vectors * 2) * Math.PI * 2
      this.orbitLine.geometry.vertices.push(
        new THREE.Vector3(
          Math.cos(theta) * this.scaled.distance,
          Math.sin(theta) * this.scaled.distance,
          0
        )
      )
    }
  }

  animate (delta) {
    this.mesh.rotation.y += this.scaled.rotation * delta
    this.orbit.rotation.y += this.scaled.period * delta
  }

  setVectors (newVectors) {
    newVectors = newVectors || globals.vectors
    this.geo = new THREE.SphereGeometry(
      this.scaled.radius,
      newVectors,
      newVectors
    )
    this.mesh.geometry = this.geo
    this.drawOrbitLine()
  }

  setSpeed (newSpeed) {
    newSpeed = newSpeed || globals.speed
    this.scaled.rotation = -newSpeed * (2 * Math.PI / (this.rotation * 60 * 60))
    this.scaled.period =
      2 * Math.PI / (this.period * solarSystem.secondsInDay) * newSpeed
  }

  setScale (newScale, newPlanetScale) {
    newScale = newScale || globals.scale
    newPlanetScale = newPlanetScale || globals.planetScale
    this.scaled.radius = this.radius * newScale * newPlanetScale
    this.scaled.distance = this.distance * solarSystem.au * newScale
    this.mesh.position.set(this.scaled.distance, 0, 0)
    this.setVectors()
  }
}
