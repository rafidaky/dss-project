export const getElevation = async ({ coords }) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const apiUrl = `https://dss-express-server.vercel.app/getElevation?lat=${coords.latitude}&lon=${coords.longitude}`;

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
