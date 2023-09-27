const getImage = (image) => {
  const values = Object.values(image)
  return (
    values.find((value) => value.length > 10) ||
    new URL('../assets/images/image.svg', import.meta.url).href
  )
}

export { getImage }
