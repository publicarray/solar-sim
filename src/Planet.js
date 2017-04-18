import CelestialObject from './CelestialObject';

export default class Planet extends CelestialObject {
    constructor (scene, diameter = 0, distance = 0, period = 0, rotation = 0, options = {}) {
        super(scene, diameter, distance, period, rotation, options);
        // super();
        // if (ring) {
        //     this.ring = new THREE.Mesh(new THREE.RingGeometry( radius, radius + 10, 32 ), new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } ););
        // }
    }

    // static setMap (url, mapType = 'map') {
    //     loader.load(
    //         // resource URL
    //         url,
    //         // Function when resource is loaded
    //         (texture) => {
    //             this.material[mapType] = texture;
    //             this.mesh.material = this.material;
    //         },
    //         // Function called when download progresses
    //         (xhr) => {
    //             console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    //         },
    //         // Function called when download errors
    //         (xhr) => {
    //             console.log( 'An error happened' );
    //         }
    //     );
    // }

}
