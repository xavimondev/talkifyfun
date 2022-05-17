import { VIRTUAL_BACKGROUND_PATHS } from 'config/constants'

const IMAGES_ELEMENTS = new Map()

/**
 * Cache image as soon as is downloaded
 * @param key - key of the image you want to get
 * @returns Promise that resolves an image
 */
export const getImage = (key: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (IMAGES_ELEMENTS.has(key)) {
      return resolve(IMAGES_ELEMENTS.get(key))
    }
    const img = new Image()
    img.onload = () => {
      IMAGES_ELEMENTS.set(key, img)
      resolve(img)
    }
    img.onerror = reject
    img.src = VIRTUAL_BACKGROUND_PATHS[key]
  })
}
