// import * as dat from '../node_modules/dat.gui/build/dat.gui'
// let gui = new dat.GUI()
//
export let globals = {
  textureQuality: 'high',
  vectors: 42,
  speed: 50000, // 1, //1000000,
  scale: 0.00002, // 0.0000001,
  planetScale: 200 // 200,
  // equalDistance: true, // false,
  // equalDistanceNum: 50 // 20,
}

export function addGui (
  gui,
  textureQualityChange,
  vectorsChange,
  speedChange,
  scaleChange,
  planetScaleChange
) {
  // gui.add(text, 'speed', -5, 5);
  const controllerQuality = gui.add(globals, 'textureQuality', [
    // 'low',
    'mid',
    'high'
  ])
  controllerQuality.onFinishChange(textureQualityChange)
  const controllerVectors = gui.add(globals, 'vectors', 8, 64).step(1)
  controllerVectors.onChange(vectorsChange)
  const controllerSpeed = gui.add(globals, 'speed', 1, 1000000).step(1)
  controllerSpeed.onChange(speedChange)
  const controllerScale = gui.add(globals, 'scale', 0.000005, 0.00005)
  controllerScale.onChange(scaleChange)
  const controllerPlanetScale = gui.add(globals, 'planetScale', 1, 200)
  controllerPlanetScale.onChange(planetScaleChange)
}

export let addGUI = addGui

export default { globals, addGui, addGUI }
