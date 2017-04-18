import CelestialObject from './CelestialObject'

export default class Star extends CelestialObject {
  constructor (
    diameter = 0,
    distance = 0,
    period = 0,
    rotation = 0,
    options = {}
  ) {
    super(diameter, distance, period, rotation, options)
    // super();
  }
}
