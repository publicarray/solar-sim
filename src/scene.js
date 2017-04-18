import * as THREE from 'three'
import OrbitControls from './libs/OrbitControls'
import Stats from 'stats.js'
import dat from '../node_modules/dat.gui/build/dat.gui'

import Star from './Star';
import Planet from './Planet';
import Satellite from './Satellite';

let scene, camera, renderer, controls, stats, light;
let earth, jupiter, mars, mercury, moon, neptune, saturn, satun, sky, sun, uranus, venus;
let mercuryOrbit, venusOrbit, earthOrbit, moonOrbit, marsOrbit, jupiterOrbit, saturnOrbit, uranusOrbit, neptuneOrbit;
const loader = new THREE.TextureLoader();

function init() {
    // SCENE
    scene = new THREE.Scene();

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true, logarithmicDepthBuffer: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x000000, 1 );
    document.body.appendChild(renderer.domElement);

    // CAMERA
    const VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 1e-6, FAR = 1e27;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 0, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // CONTROLS
    controls = new OrbitControls( camera, renderer.domElement );
    // enable animation loop when using damping or autorotation
    //controls.enableDamping = true;
    //controls.dampingFactor = 0.25;
    // controls.enableZoom = false;

    // MASH OBJECTS
    addObjects();

    // ADD LICHTS
    addLights();

    // SKYBOX/FOG
    // var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    // var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    // var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    // scene.add(skyBox);
    // scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

    // axes
    // var axes = new THREE.AxisHelper(100);
    // scene.add( axes );

    // var imagePrefix = "images/dawnmountain-";
    // var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    // var imageSuffix = ".png";
    // var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

    // var materialArray = [];
    // for (var i = 0; i < 6; i++)
    //     materialArray.push( new THREE.MeshBasicMaterial({
    //         map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
    //         side: THREE.BackSide
    //     }));
    // var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    // var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    // scene.add( skyBox );
    getTexture('textures/sky.png', function(texture) {
        let skybox = new THREE.Mesh( new THREE.SphereBufferGeometry( 1e20, 32, 32 ), new THREE.MeshBasicMaterial( { map: texture } ) );
        skybox.scale.x = -1;
        scene.add( skybox );
    });


    // STATS
    stats = new Stats();
    document.getElementById('container').appendChild( stats.dom );

    // GUI/options
    let gui = new dat.GUI();
    // addGui();
}

function addObjects() {
    var defaultMaterial = new THREE.MeshPhongMaterial( { color:0x000000, shading: THREE.SmoothShading, shininess: 0 } );

// SUN
    sun = new Planet(scene, 1400000, 0, 0, 609.12);
    sun.setMap('textures/sun.png');
    // sun.setMap('textures/sun-lightMap', 'lightMap');

// Mercury
    mercury = new Planet(scene, 12104, 0.723, 224.7, -5832.5);
    // getTexture('textures/mercury.jpg', mercury.setMapCallback);
    mercury.setMap('textures/mercury.jpg');
    mercury.setMap('textures/mercury-normal.png', 'normalMap');

// Venus
    venus = new Planet(scene, 4879, 0.387, 88, 1407.6);
    // getTexture('textures/mercury.jpg', venus.setMapCallback);
    venus.setMap('textures/venus.jpg', 'map');
    venus.setMap('textures/venus-normal.png', 'normalMap');

// Earth
    earth = new Planet(scene, 12756, 1, 365.2, 23.9);
    earth.setMap('textures/earth.jpg');
    earth.setMap('textures/earth-normal.png', 'normalMap');
    // earth.setMap('textures/earth-specular.jpg', 'specularMap');

    //     moon: {
    //         id: 0,
    //         diamiter: 3475, // km 1km = 1000m
    //         distance: 0.002567, // AU
    //         period: 27.3, // 1 year = x days
    //         rotation: 655.7, //(hours)


// Moon
    moonOrbit = new THREE.Object3D();
    var moonMaterial = new THREE.MeshPhongMaterial({shininess:0});
    moon = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    moon.position.set(25, 0, 0);
    earth.mesh.add( moon );

    getTexture('textures/moon.jpg', function (texture) {
        moonMaterial.map = texture;
        moon.material = moonMaterial;
    });
    getTexture('textures/moon-normal.png', function (texture) {
        moonMaterial.normalMap = texture;
        moon.material = moonMaterial;
    });

// Mars
    mars = new Planet(scene, 6792, 1.524, 687, 24.6);
    mars.setMap('textures/mars.jpg');
    mars.setMap('textures/mars-normal.png', 'normalMap');

// Jupiter
    jupiter = new Planet(scene, 142984, 5.204, 4331, 9.9);
    jupiter.setMap('textures/jupiter.jpg');

// Saturn
    saturn = new Planet(scene, 120536, 9.582, 10747, 10.7);
    saturn.setMap('textures/saturn.jpg');

// Uranus
    uranus = new Planet(scene, 51118, 19.201, 30589, -17.2);
    uranus.setMap('textures/uranus.jpg');

// Neptune
    neptune = new Planet(scene, 49528, 30.047, 59800, 16.1);
    neptune.setMap('textures/neptune.jpg');
}

function addLights () {
    // var lights = [];
    // lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    // lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    // lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    // lights[ 0 ].position.set( 0, 200, 0 );
    // lights[ 1 ].position.set( 100, 200, 100 );
    // lights[ 2 ].position.set( - 100, - 200, - 100 );

    // scene.add( lights[ 0 ] );
    // scene.add( lights[ 1 ] );
    // scene.add( lights[ 2 ] );

// Sun
    light = new THREE.PointLight( 0xffffff, 1);
    light.position.set( 0, 0, 0 );
    sun.mesh.add( light );

    // light = new THREE.DirectionalLight( 0x999999 );
    // light.position.set( -1, -1, -1 );
    // scene.add( light );
    // light = new THREE.AmbientLight( 0x555555 );
    // light = new THREE.AmbientLight( 0xeeeeee );
    scene.add( new THREE.AmbientLight( 0x555555 ) );

    // addLight( 0.55, 0.9, 0.5, 5000, 0, -1000 );
    // addLight( 0.08, 0.8, 0.5,    0, 0, -1000 );
    // addLight( 0.995, 0.5, 0.9, 5000, 5000, -1000 );
    // function addLight( h, s, l, x, y, z ) {
    //     var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    //     light.color.setHSL( h, s, l );
    //     light.position.set( x, y, z );
    //     scene.add( light );
    //     // var flareColor = new THREE.Color( 0xffffff );
    //     // flareColor.setHSL( h, s, l + 0.5 );
    // }
}

function animate() {

    requestAnimationFrame( animate );

    // controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    sun.mesh.rotation.x += 0.001;
    sun.mesh.rotation.y += 0.002;
    moon.rotation.y += 0.01;
    earth.mesh.rotation.y += 0.01;

    // mercury.orbit.rotation.y += 0.001;
    // venus.orbit.rotation.y += 0.002;
    // earth.orbit.rotation.y += 0.003;
    // moonOrbit.rotation.y += 0.004;
    // mars.orbit.rotation.y += 0.005;
    // jupiter.orbit.rotation.y += 0.006;
    // saturn.orbit.rotation.y += 0.007;
    // saturn.orbit.rotation.y += 0.008;
    // uranus.orbit.rotation.y += 0.009;
    // neptune.orbit.rotation.y += 0.01;

    // earth.translateZ(1);

    stats.update();
    renderer.render( scene, camera );
}

function getTexture(url, callback) {
    loader.load(
        // resource URL
        url,
        // Function when resource is loaded
        function ( texture ) {
            callback(texture);
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
}

export { init, animate, camera, renderer };

