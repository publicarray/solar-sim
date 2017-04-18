import {
  TextureLoader, // deprecated
  SphereGeometry, //  deprecated
  SphereBufferGeometry, // deprecated
  IcosahedronGeometry,
  Mesh, // deprecated
  MeshBasicMaterial, // deprecated
  Scene,
  WebGLRenderer,
  Clock,
  Fog,
  PerspectiveCamera,
  Vector3,
  PointLight,
  AmbientLight
} from 'three'
// import OrbitControls from './libs/OrbitControls'
import FlyControls from './libs/FlyControls'
import Stats from 'stats.js'
import dat from '../node_modules/dat.gui/build/dat.gui'

import Star from './Star'
import Planet from './Planet'
import Satellite from './Satellite'

let scene, camera, renderer, controls, stats, light
let earth, jupiter, mars, mercury, moon, neptune, saturn, sun, uranus, venus
const loader = new TextureLoader()
let clock = new Clock()

function init () {
  // DOM container
  let container = document.createElement('div')
  container.style.overflow = 'hidden'
  document.body.appendChild(container)

  // SCENE
  scene = new Scene()

  // RENDERER
  renderer = new WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 1)
  container.appendChild(renderer.domElement)

  // CAMERA
  const VIEW_ANGLE = 45
  const ASPECT = window.innerWidth / window.innerHeight
  const NEAR = 1e-6
  const FAR = 1e27
  camera = new PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
  camera.position.set(0, 0, 500)
  camera.lookAt(new Vector3(0, 0, 0))

  // CONTROLS
  controls = new FlyControls(camera, container)
  controls.movementSpeed = 100
  controls.rollSpeed = Math.PI / 6
  controls.dragToLook = true

  // renderer.gammaInput = true;
  // renderer.gammaOutput = true;
  // enable animation loop when using damping or autorotation
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.25;
  // controls.enableZoom = false;

  // MASH OBJECTS
  addObjects()

  // ADD LICHTS
  addLights()

  // SKYBOX
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
  getTexture('textures/sky.png', function (texture) {
    let skybox = new Mesh(
      new IcosahedronGeometry(1e20, 5),
      // new SphereBufferGeometry(1e20, 32, 32),
      new MeshBasicMaterial({map: texture})
    )
    skybox.scale.x = -1
    scene.add(skybox)
  })

  // FOG
  // scene.fog = new Fog(0x000000, 3500, 15000)
  // scene.fog.color.setHSL(0.51, 0.4, 0.01)

  // STATS
  stats = new Stats()
  container.appendChild(stats.dom)

  // GUI/options
  let gui = new dat.GUI()
  // container.appendChild(gui.domElement)
  // addGui(); // Todo: implement function
}

function addObjects () {
  // SUN
  sun = new Star(1400000, 0, 0, 609.12)
    .setMap('textures/sun.png')
    // .setMap('textures/sun-lightMap', 'lightMap')
    .addTo(scene)

  // Mercury
  mercury = new Planet(12104, 0.723, 224.7, -5832.5)
    .setMap('textures/mercury.jpg')
    .setMap('textures/mercury-normal.png', 'normalMap')
    .addTo(scene)

  // Venus
  venus = new Planet(4879, 0.387, 88, 1407.6)
    .setMap('textures/venus.jpg', 'map')
    .setMap('textures/venus-normal.png', 'normalMap')
    .addTo(scene)

  // Earth
  earth = new Planet(12756, 1, 365.2, 23.9)
    .setMap('textures/earth.jpg')
    .setMap('textures/earth-normal.png', 'normalMap')
    .setMap('textures/earth-specular.jpg', 'specularMap')
    .addTo(scene)

  // Moon
  moon = new Satellite(3475, 0.002567, 27.3, 655.7)
    .setMap('textures/moon.jpg')
    .setMap('textures/moon-normal.png', 'normalMap')
    .addTo(earth)

  // Mars
  mars = new Planet(6792, 1.524, 687, 24.6)
    .setMap('textures/mars.jpg')
    .setMap('textures/mars-normal.png', 'normalMap')
    .addTo(scene)

  // Jupiter
  jupiter = new Planet(142984, 5.204, 4331, 9.9)
    .setMap('textures/jupiter.jpg')
    .addTo(scene)

  // Saturn
  saturn = new Planet(120536, 9.582, 10747, 10.7)
    .setMap('textures/saturn.jpg')
    .addRing('textures/saturn-rings.png')
    .addTo(scene)

  // Uranus
  uranus = new Planet(51118, 19.201, 30589, -17.2)
    .setMap('textures/uranus.jpg')
    .addRing('textures/uranus-rings.png')
    .addTo(scene)

  // Neptune
  neptune = new Planet(49528, 30.047, 59800, 16.1)
    .setMap('textures/neptune.jpg')
    .addTo(scene)
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
  light = new PointLight(0xffffff, 1)
  light.position.set(0, 0, 0)
  sun.mesh.add(light)

  // light = new THREE.DirectionalLight( 0x999999 );
  // light.position.set( -1, -1, -1 );
  // scene.add( light );
  // light = new THREE.AmbientLight( 0x555555 );
  // light = new THREE.AmbientLight( 0xeeeeee );
  scene.add(new AmbientLight(0x555555))

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

function animate () {
  /* global requestAnimationFrame */
  requestAnimationFrame(animate)

  var delta = clock.getDelta()
  controls.update(delta)

  // controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
  sun.animate()
  moon.animate()
  earth.animate()

  // earth.translateZ(1);

  stats.update()
  renderer.render(scene, camera)
}

// Todo: deprecated, only used for sky-box
function getTexture (url, callback) {
  loader.load(
    // resource URL
    url,
    // Function when resource is loaded
    function (texture) {
      callback(texture)
    },
    // Function called when download progresses
    function (xhr) {
      console.log(xhr.loaded / xhr.total * 100 + '% loaded')
    },
    // Function called when download errors
    function (xhr) {
      console.log('An error happened')
    }
  )
}

export {init, animate, camera, renderer}
