import { getElevation } from "../services/getElevation";

global.fetch = jest.fn();

describe("getElevation function", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("gets data successfully and returns result", async () => {
    const coords = { lat: 48.858844, lng: 2.29435 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ elevation: 100 }),
    });

    const result = await getElevation({ coords });

    expect(fetch).toHaveBeenCalledWith(
      `https://dss-express-server.vercel.app/?lat=${coords.lat}&lon=${coords.lng}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    expect(result).toEqual({ elevation: 100 });
  });

  test("throws an error if the fetch call fails", async () => {
    const coords = { lat: 48.858844, lng: 2.29435 };
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Failed to fetch data" }),
    });

    await expect(getElevation({ coords })).rejects.toThrow(
      "Something went wrong"
    );
  });

  test("throws an error if an something happens in the call", async () => {
    const coords = { lat: 48.858844, lng: 2.29435 };
    fetch.mockRejectedValueOnce(new Error("Fetch error"));

    await expect(getElevation({ coords })).rejects.toThrow(
      "Error: Fetch error"
    );
  });
});
