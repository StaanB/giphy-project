import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GridGifs from "../components/Gridgifs";
import "@testing-library/jest-dom";

describe("GridGifs Component", () => {
  it("should render gifs", async () => {
    const { getByPlaceholderText, queryAllByTestId } = render(<GridGifs />);
    const input = getByPlaceholderText("Search GIFs and stickers...");
    const searchButton = screen.getByTestId("search-button");
  
    fireEvent.change(input, { target: { value: "happy" } });
    fireEvent.click(searchButton);
  
    await waitFor(() => {
      const gifItems = queryAllByTestId("gif");
  
      gifItems.forEach((gifItem) => {
        const imgElement = gifItem.querySelector("img");
        expect(imgElement).toBeInTheDocument();
      });
    });
  });
  
  
  it("should open a new tab when clicking on the first rendered gif", async () => {
    const { queryAllByTestId } = render(<GridGifs />);
    const gifItems = queryAllByTestId("gif");

    gifItems.forEach((gifItem, index) => {
      const linkElement = gifItem.querySelector("a");
      const imgElement = gifItem.querySelector("img");

      expect(linkElement).toBeInTheDocument();
      expect(imgElement).toBeInTheDocument();

      if (index === 0 && linkElement) {
        const currentUrl = window.location.href;
        fireEvent.click(linkElement);

        setTimeout(() => {
          expect(window.location.href).not.toBe(currentUrl);
        }, 2000);
      }
    });
  });
});
