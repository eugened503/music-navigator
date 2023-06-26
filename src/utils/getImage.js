const getImage = (image) => {
  const values = Object.values(image);
  return (
    values.find((value) => value.length > 5) ||
    new URL("../assets/images/image.svg", import.meta.url).href
  );
};

export { getImage };
