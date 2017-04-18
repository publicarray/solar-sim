import { TextureLoader, Object3D, Mesh, MeshPhongMaterial, MeshBasicMaterial, SphereGeometry } from 'three'

const loader = new TextureLoader()

function loadTextureAsync (url) {
  return new Promise((resolve, reject) => {
    const callback = (texture) => resolve(texture)
    const loading = (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    const error = (xhr) => reject(xhr)
    loader.load(url, callback, loading, error)
  })
}

let count = 1 // FixMe

export default class CelestialObject {
  constructor (scene, diameter = 0, distance = 0, period = 0, rotation = 0, options = {}) {
    this.diameter = diameter
    this.distance = distance
    this.period = period
    this.rotation = rotation
        // let radius = this.diameter * solarSystem.scale * 0.5;
    this.orbit = new Object3D()
    this.material = new MeshPhongMaterial({shininess: 0})
    this.mesh = new Mesh(new SphereGeometry(10, 30, 30), new MeshBasicMaterial(0x000000))
        // this.mesh = new Mesh(new SphereGeometry(this.diameter * solarSystem.scale, 32, 32), new MeshPhongMaterial(0x000000));
    this.mesh.position.set(50 * count, 0, 0) // FixMe
    count++ // FixMe
        // this.mesh.position.set(solarSystem.scale * this.distance * solarSystem.au * this.distance, 0, 0);
    scene.add(this.orbit)
    this.orbit.add(this.mesh)
  }

    // static loader = new TextureLoader();

  setMap (url, mapType = 'map') {
    loadTextureAsync(url).then((texture) => {
      this.material[mapType] = texture
      this.mesh.material = this.material
    }).catch((err) => { console.log(err) })
  }
}
