import CelestialObject from './CelestialObject'

export default class Satellite extends CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    options = {}
  ) {
    super(diameter, distance, period, rotation, options)
  }

  addTo (object) {
    this.mesh.position.set(25, 0, 0) // FixMe
    this.orbit.position.set(object.mesh.position.x, 0, 0) // FixMe
    object.orbit.add(this.orbit)
    return this
  }
}
