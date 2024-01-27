export const getElevation = async ({ coords }) => {
  try {
    console.log("coords", coords);
    const headers = {
      "Content-Type": "application/json",
    };
    const apiUrl = `https://api.opentopodata.org/v1/test-dataset?locations=${coords.latitude},${coords.longitude}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Something went wrong:", error.message);
    throw new Error(error);
  }
};
