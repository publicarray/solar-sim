import CelestialObject from './CelestialObject';

export default class Satellite extends CelestialObject {
    constructor (scene, diameter = 0, distance = 0, period = 0, rotation = 0, options = {}) {
        super(scene, diameter, distance, period, rotation, options);
        // super();
    }
}
