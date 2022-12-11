/**
 * Loads an image
 * @param {string} path image URL
 * @returns {Promise<HTMLImageElement>}
 */
export const loadImage = (path) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = (err) => reject(err)

    image.src = path
  })
