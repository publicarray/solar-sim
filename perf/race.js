import race from 'speedracer'
import { init, animate, camera, renderer } from '../src/scene.js'

race('init', r => {
  init()
})

race('animate', r => {
  animate()
})

