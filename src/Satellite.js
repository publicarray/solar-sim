import CelestialObject from './CelestialObject'

export default class Satellite extends CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    options = {}
  ) {
    // options.static = true //
    super(diameter, distance, period, rotation, 0, 0, options)
  }

  addTo (object) {
    this.scaled.distance += object.scaled.radius // add planet surface radius to distance

    this.root.position.set(object.scaled.distance, 0, 0) // move satellite into orbit (set root to the center of planet)
    this.mesh.position.set(this.scaled.distance, 0, 0) // move satellite into orbit (update distance)
    this.drawOrbitLine() // redraw orbit with new distance
    object.orbit.add(this.root)
    return this
  }
}
