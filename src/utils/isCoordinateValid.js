export const isCoordinateValid = (type, value) => {
  const isNumber = typeof value === "number";
  if (type === "latitude") {
    return isNumber && value >= -90 && value <= 90;
  } else if (type === "longitude") {
    return isNumber && value >= -180 && value <= 180;
  } else {
    return false;
  }
};
