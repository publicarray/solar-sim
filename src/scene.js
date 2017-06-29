import {
  SphereBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  Scene,
  WebGLRenderer,
  Clock,
  Fog,
  PerspectiveCamera,
  Vector3,
  PointLight,
  AmbientLight,
  ShaderMaterial,
  Color
} from 'three'
// } from '../node_modules/three/build/three.module.js'
// import OrbitControls from './libs/OrbitControls'
import FlyControls from './libs/FlyControls.js'
import Stats from '../node_modules/stats.js/src/Stats.js'
// import * as dat from 'dat.gui'
// import dat from '../node_modules/dat.gui/index'
import loadTextureAsync from './utils.js'
import Star from './Star.js'
import Planet from './Planet.js'
import Satellite from './Satellite.js'

let scene, camera, renderer, controls, stats, light
let earth, jupiter, mars, mercury, moon, neptune, saturn, sun, uranus, venus
let clock = new Clock()
let quality

function init () {
  quality = 'high' // 2048 x 1024 pixels
  // quality = 'mid' // 1024 x 512 pixels
  // quality = 'low' // 512 x 256 pixels

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
  renderer.domElement.style.display = 'block'
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

  // ADD LIGHTS
  scene.add(new AmbientLight(0x555555))

  // SKYBOX

  // loadTextureAsync(`textures/${quality}/sky.png`, function (texture) {
  loadTextureAsync(`textures/${quality}/stars.jpg`)
    .then(texture => {
      let skybox = new Mesh(
        // new IcosahedronGeometry(1e10, 5),
        // new SphereBufferGeometry(1e10, 60, 40),
        new SphereBufferGeometry(1e10, 12, 12),
        // new MeshBasicMaterial({ map: texture })
        new ShaderMaterial({
          uniforms: { texture: { type: 't', value: texture } },
          vertexShader: document.getElementById('sky-vertex').textContent,
          fragmentShader: document.getElementById('sky-fragment').textContent
        })
        // new MeshBasicMaterial({wireframe: true})
      )
      skybox.scale.x = -1
      scene.add(skybox)
    })
    .catch(err => {
      console.log(err)
    })

  // FOG
  // scene.fog = new Fog(0x000000, 3500, 15000)
  // scene.fog.color.setHSL(0.51, 0.4, 0.01)

  // STATS
  stats = new Stats()
  container.appendChild(stats.dom)

  // GUI/options
  // let gui = new dat.GUI()
  // container.appendChild(gui.domElement)
  // addGui(); // Todo: implement function
}

function addObjects () {
  // SUN
  sun = new Star(1400000, 0, 0, 609.12)
    .setMap(`textures/${quality}/sun.jpg`)
    // .setMap(`textures/${quality}/sun-lightMap`, 'lightMap')
    .addTo(scene)

  // Mercury
  mercury = new Planet(12104, 0.723, 224.7, -5832.5)
    .setMap(`textures/${quality}/mercury.jpg`)
    .setMap(`textures/${quality}/mercury-normal.png`, 'normalMap')
    .addTo(scene)

  // Venus
  venus = new Planet(4879, 0.387, 88, 1407.6)
    .setMap(`textures/${quality}/venus.jpg`, 'map')
    .setMap(`textures/${quality}/venus-normal.png`, 'normalMap')
    .addTo(scene)

  // Earth
  earth = new Planet(12756, 1, 365.2, 23.9)
    .setMap(`textures/${quality}/earth.jpg`)
    .setMap(`textures/${quality}/earth-ambient-occlusion.png`, 'aoMap')
    .setMap(`textures/${quality}/earth-displacement.png`, 'displacementMap', {
      displacementScale: 1
    })
    .setMap(`textures/${quality}/earth-normal.png`, 'normalMap', {
      bumpScale: 1
    })
    .setMap(`textures/${quality}/earth-specular.png`, 'specularMap', {
      specular: new Color('grey')
    })
    .addClouds(`textures/${quality}/earth-clouds.jpg`)
    .addTo(scene)

  // Moon
  moon = new Satellite(3475, 0.002567, 27.3, 655.7)
    .setMap(`textures/${quality}/moon.jpg`)
    .setMap(`textures/${quality}/moon-normal.png`, 'normalMap')
    .addTo(earth)

  // Mars
  mars = new Planet(6792, 1.524, 687, 24.6)
    .setMap(`textures/${quality}/mars.jpg`)
    .setMap(`textures/${quality}/mars-normal.png`, 'normalMap')
    .addTo(scene)

  // Jupiter
  jupiter = new Planet(142984, 5.204, 4331, 9.9)
    .setMap(`textures/${quality}/jupiter.jpg`)
    .addTo(scene)

  // Saturn
  saturn = new Planet(120536, 9.582, 10747, 10.7)
    .setMap(`textures/${quality}/saturn.jpg`)
    .addRing(`textures/${quality}/saturn-rings.png`)
    .addTo(scene)

  // Uranus
  uranus = new Planet(51118, 19.201, 30589, -17.2)
    .setMap(`textures/${quality}/uranus.jpg`)
    .addRing(`textures/${quality}/uranus-rings.png`)
    .addTo(scene)

  // Neptune
  neptune = new Planet(49528, 30.047, 59800, 16.1)
    .setMap(`textures/${quality}/neptune.jpg`)
    .addTo(scene)
}

function animate () {
  /* global requestAnimationFrame */
  requestAnimationFrame(animate)

  var delta = clock.getDelta()
  controls.update(delta)

  // controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
  sun.animate(delta, camera)
  mercury.animate(delta)
  venus.animate(delta)
  earth.animate(delta)
  moon.animate(delta)
  mars.animate(delta)
  jupiter.animate(delta)
  saturn.animate(delta)
  uranus.animate(delta)
  neptune.animate(delta)

  // earth.translateZ(1);

  stats.update()
  renderer.render(scene, camera)
}

export { init, animate, camera, renderer }
