const getImage = (image) => {
  const values = Object.values(image);
  return (
    values.find((value) => value.length > 5) ||
    new URL("../assets/image.svg", import.meta.url).href
  );
};

export { getImage };
