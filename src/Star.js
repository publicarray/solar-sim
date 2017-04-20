import CelestialObject from './CelestialObject'
import {PointLight} from 'three'

export default class Star extends CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    options = {}
  ) {
    super(diameter, distance, period, rotation, options)

    this.light = new PointLight(0xffffff, 1)
    this.mesh.add(this.light)
  }
}
