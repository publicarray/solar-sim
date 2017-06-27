import { TextureLoader } from 'three'

const loader = new TextureLoader()

export default function loadTextureAsync (url) {
  return new Promise((resolve, reject) => {
    const callback = texture => resolve(texture)
    const loading = xhr =>
      console.log(xhr.loaded / xhr.total * 100 + '% loaded')
    const error = xhr => reject(xhr)
    loader.load(url, callback, loading, error)
  })
}
