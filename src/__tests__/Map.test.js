import React from "react";
import { render, screen } from "@testing-library/react";
import Map from "../components/Map";

describe("Map", () => {
  test("renders map with default position", () => {
    render(
      <Map setClickedLocation={() => {}} userPosition={[48.2082, 16.3719]} />
    );
    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();
  });
});
