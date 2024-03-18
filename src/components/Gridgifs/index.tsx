import { useState, useEffect } from "react";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { Input } from "@progress/kendo-react-inputs";
import "@progress/kendo-font-icons/dist/index.css";
import "./index.css";

interface GiphyImage {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

const GridGifs = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [gifs, setGifs] = useState<GiphyImage[]>([]);

  const apiKey = "2WZhOVBdMNkAcEu5pvtgKOXiBxXGl1xC";
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=24`;

  const handleSearch = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  useEffect(() => {
    setSearchTerm("reactions");
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <div className="grid-gifs">
      <div className="page">
        <div>
          <div className="search-area">
            <Input
              placeholder="Search GIFs and stickers..."
              value={searchTerm || ""}
              onChange={(e) =>
                setSearchTerm(
                  typeof e.target.value === "string" ? e.target.value : ""
                )
              }
            ></Input>
            <span
              data-testid="search-button"
              className="k-icon k-font-icon k-i-zoom"
              onClick={handleSearch}
            ></span>
          </div>
        </div>
        <div className="content">
          <GridLayout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
            }}
          >
            {gifs.map((gif) => (
              <GridLayoutItem data-testid="grid" key={gif.id}>
                <a
                  data-testid="gif"
                  className="link-gif"
                  href={gif.images.fixed_height.url}
                  target="_blank"
                >
                  <img
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </a>
              </GridLayoutItem>
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  );
};

export default GridGifs;
