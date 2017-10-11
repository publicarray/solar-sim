import CelestialObject from './CelestialObject'
import { globals } from './gui'

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
    this.scaled.distance += object.radius * globals.scale * globals.planetScale // add planet surface radius to distance

    this.root.position.set(object.scaled.distance, 0, 0) // move satellite into orbit (set root to the center of planet)
    this.mesh.position.set(this.scaled.distance, 0, 0) // move satellite into orbit (update distance)
    this.drawOrbitLine() // redraw orbit with new distance
    object.orbit.add(this.root)
    this.parentObject = object
    return this
  }

  setScale (newScale, newPlanetScale) {
    super.setScale(newScale, newPlanetScale)
    // console.log(this.parentObject.scaled.distance)
    // console.log(this.parentObject.root.children[1].children[0].position.x)
    // console.log(this.root.parent.parent.children[1].children[0].position.x)
    this.root.position.set(this.parentObject.scaled.distance, 0, 0)
    this.mesh.position.set(this.scaled.distance, 0, 0) // move satellite into orbit (update distance)
  }
}
