import * as THREE from 'three'
// import OrbitControls from './libs/OrbitControls'
import FlyControls from './libs/FlyControls'
import Stats from '../node_modules/stats.js/src/Stats'
import * as dat from 'dat.gui'
import { globals, addGUI } from './gui'
import loadTextureAsync from './utils'
import Star from './Star'
import Planet from './Planet'
import Satellite from './Satellite'

let scene, camera, renderer, controls, stats, light
let skybox, earth, jupiter, mars, mercury, moon, neptune, saturn, sun, uranus, venus
const clock = new THREE.Clock()
const gui = new dat.GUI()

const textureQualityChange = function (newQuality) {
  globals.quality = newQuality
  console.log('The new textureQuality is ' + newQuality)
  scene.remove(skybox)
  earth.remove(scene)
  jupiter.remove(scene)
  mars.remove(scene)
  mercury.remove(scene)
  moon.remove(scene)
  neptune.remove(scene)
  saturn.remove(scene)
  sun.remove(scene)
  uranus.remove(scene)
  venus.remove(scene)

  addObjects(newQuality)
}

const vectorsChange = function (newVectorNum) {
  globals.vectors = newVectorNum
  console.log('The new newVectorNum is ' + newVectorNum)
  // scene.remove(skybox)
  earth.setVectors(newVectorNum)
  jupiter.setVectors(newVectorNum)
  mars.setVectors(newVectorNum)
  mercury.setVectors(newVectorNum)
  moon.setVectors(newVectorNum)
  neptune.setVectors(newVectorNum)
  saturn.setVectors(newVectorNum)
  // sun.setVectors(newVectorNum)
  uranus.setVectors(newVectorNum)
  venus.setVectors(newVectorNum)
}

const speedChange = function (newSpeed) {
  globals.speed = newSpeed
  console.log('The new newSpeed is ' + newSpeed)
  earth.setSpeed(newSpeed)
  jupiter.setSpeed(newSpeed)
  mars.setSpeed(newSpeed)
  mercury.setSpeed(newSpeed)
  moon.setSpeed(newSpeed)
  neptune.setSpeed(newSpeed)
  saturn.setSpeed(newSpeed)
  // sun.setSpeed(newSpeed)
  uranus.setSpeed(newSpeed)
  venus.setSpeed(newSpeed)
}

const scaleChange = function (newScale) {
  globals.scale = newScale
  console.log('The new newScale is ' + newScale)
  earth.setScale(newScale)
  jupiter.setScale(newScale)
  mars.setScale(newScale)
  mercury.setScale(newScale)
  moon.setScale(newScale)
  neptune.setScale(newScale)
  saturn.setScale(newScale)
  // sun.setScale(newScale)
  uranus.setScale(newScale)
  venus.setScale(newScale)
}

const planetScaleChange = function (newPlanetScale) {
  globals.planetScale = newPlanetScale
  console.log('The new newPlanetScale is ' + newPlanetScale)
  earth.setScale(false, newPlanetScale)
  jupiter.setScale(false, newPlanetScale)
  mars.setScale(false, newPlanetScale)
  mercury.setScale(false, newPlanetScale)
  moon.setScale(false, newPlanetScale)
  neptune.setScale(false, newPlanetScale)
  saturn.setScale(false, newPlanetScale)
  // sun.setScale(false, newPlanetScale)
  uranus.setScale(false, newPlanetScale)
  venus.setScale(false, newPlanetScale)
}

function init () {
  // DOM container
  let container = document.createElement('div')
  container.style.overflow = 'hidden'
  document.body.appendChild(container)

  // SCENE
  scene = new THREE.Scene()

  // RENDERER
  renderer = new THREE.WebGLRenderer({
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
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
  camera.position.set(0, 0, 500)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // CONTROLS
  controls = new FlyControls(camera, container)
  // controls.movementSpeed = 100
  controls.movementSpeed = 800
  controls.rollSpeed = Math.PI / 8
  controls.dragToLook = true
  // renderer.gammaInput = true;
  // renderer.gammaOutput = true;
  // enable animation loop when using damping or autorotation
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.25;
  // controls.enableZoom = false;

  // MASH OBJECTS
  addObjects(globals.textureQuality) // high
  // textureQuality = 'high' // 2048 x 1024 pixels
  // textureQuality = 'mid' // 1024 x 512 pixels
  // textureQuality = 'low' // 512 x 256 pixels

  // ADD LIGHTS
  scene.add(new THREE.AmbientLight(0x555555))

  // FOG
  // scene.fog = new THREE.Fog(0x000000, 3500, 15000)
  // scene.fog.color.setHSL(0.51, 0.4, 0.01)

  // STATS
  stats = new Stats()
  container.appendChild(stats.dom)

  // GUI/options
  // let gui = new dat.GUI()
  // Todo: cleanup function
  addGUI(gui, textureQualityChange, vectorsChange, speedChange, scaleChange, planetScaleChange)
}

function addObjects (textureQuality) {
  // SKYBOX
  let ext = 'png'
  if (textureQuality == 'high') {
    ext = 'jpg'
  }
  // loadTextureAsync(`textures/${textureQuality}/sky.png`, function (texture) {
  loadTextureAsync(`textures/${textureQuality}/stars.${ext}`)
    .then(texture => {
      skybox = new THREE.Mesh(
        // new THREE.IcosahedronGeometry(1e10, 5),
        // new THREE.SphereBufferGeometry(1e10, 60, 40),
        new THREE.SphereBufferGeometry(1e10, 12, 12),
        // new THREE.MeshBasicMaterial({ map: texture })
        new THREE.ShaderMaterial({
          uniforms: { textureImg: { type: 't', value: texture } },
          vertexShader: document.getElementById('sky-vertex').textContent,
          fragmentShader: document.getElementById('sky-fragment').textContent
        })
        // new THREE.MeshBasicMaterial({wireframe: true})
      )
      skybox.scale.x = -1
      scene.add(skybox)
    })
    .catch(err => {
      console.log(err)
    })

  // SUN
  sun = new Star(1400000, 0, 0, 609.12)
    // .setMap(`textures/${textureQuality}/sun.jpg`)
    // .setMap(`textures/${textureQuality}/sun-lightMap`, 'lightMap')
    .addTo(scene)

  // Mercury
  mercury = new Planet(12104, 0.723, 224.7, -5832.5, 0.034, 7)
    .setMap(`textures/${textureQuality}/mercury.jpg`)
    .setMap(`textures/${textureQuality}/mercury-normal.png`, 'normalMap')
    .addTo(scene)

  // Venus
  venus = new Planet(4879, 0.387, 88, 1407.6, 177.4, 3.4)
    .setMap(`textures/${textureQuality}/venus.jpg`, 'map')
    .setMap(`textures/${textureQuality}/venus-normal.png`, 'normalMap')
    .addTo(scene)

  // Earth
  earth = new Planet(12756, 1, 365.2, 23.9, 23.4, 0)
    .setMap(`textures/${textureQuality}/earth.jpg`)
    .setMap(`textures/${textureQuality}/earth-ambient-occlusion.png`, 'aoMap')
    .setMap(`textures/${textureQuality}/earth-displacement.png`, 'displacementMap', {
      displacementScale: 1
    })
    .setMap(`textures/${textureQuality}/earth-normal.${ext}`, 'normalMap', {
      bumpScale: 1
    })
    .setMap(`textures/${textureQuality}/earth-specular.png`, 'specularMap', {
      specular: new THREE.Color('grey')
    })
    .addClouds(`textures/${textureQuality}/earth-clouds.${ext}`)
    .addTo(scene)

  // Moon
  moon = new Satellite(3475, 0.002567, 27.3, 655.7, 6.7, 5.1)
    .setMap(`textures/${textureQuality}/moon.jpg`)
    .setMap(`textures/${textureQuality}/moon-normal.png`, 'normalMap')
    .addTo(earth)

  // moon.root.add(camera)
  // camera.position.copy(earth.mesh.position)
  // camera.lookAt(moon.mesh.position)

  // Mars
  mars = new Planet(6792, 1.524, 687, 24.6, 25.2, 1.9)
    .setMap(`textures/${textureQuality}/mars.jpg`)
    .setMap(`textures/${textureQuality}/mars-normal.png`, 'normalMap')
    .addTo(scene)

  // Jupiter
  jupiter = new Planet(142984, 5.204, 4331, 9.9, 3.1, 1.3).setMap(`textures/${textureQuality}/jupiter.jpg`).addTo(scene)

  // Saturn
  saturn = new Planet(120536, 9.582, 10747, 10.7, 26.7, 2.5)
    .setMap(`textures/${textureQuality}/saturn.jpg`)
    .addRing(`textures/${textureQuality}/saturn-rings.png`)
    .addTo(scene)

  // Uranus
  uranus = new Planet(51118, 19.201, 30589, -17.2, 97.77, 0.8)
    .setMap(`textures/${textureQuality}/uranus.jpg`)
    .addRing(`textures/${textureQuality}/uranus-rings.png`)
    .addTo(scene)

  // Neptune
  neptune = new Planet(49528, 30.047, 59800, 16.1).setMap(`textures/${textureQuality}/neptune.jpg`).addTo(scene)
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
