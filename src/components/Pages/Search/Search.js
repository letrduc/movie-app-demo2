/* eslint-disable no-unused-vars */
import React from "react";
import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@mui/material";
import "./Search.css";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import { useState } from "react";
import axios from "axios";
import CustomPagination from "../../CustomPagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import "./Search.css";

function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [searchMovie, setSearchMovie] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [movied, setMovied] = useState([]);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#FFF",
      },
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (searchMovie) {
          const res = await axios.get(`
              https://api.themoviedb.org/3/search/${
                type ? "tv" : "movie"
              }?api_key=5c188f68b04550c3f366d00edd438f7c&language=en-US&query=${searchMovie}&page=${page}`);

          setMovied(res.data.results);
          setNumOfPages(res.total_pages);

          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [page, type, searchMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMovie(searchInput);
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            value={searchInput}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <YoutubeSearchedForIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className="search">
        {movied &&
          movied.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchMovie &&
          !movied &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Search;
