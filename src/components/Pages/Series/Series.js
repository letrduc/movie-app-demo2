/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Genres from "../../Genres";
import CustomPagination from "../../CustomPagination/CustomPagination";
import axios from "axios";
import useGenre from "../../../hooks/useGenre";
import SingleContent from "../../SingleContent/SingleContent";
import "./Series.css";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchTV = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=5c188f68b04550c3f366d00edd438f7c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  React.useEffect(() => {
    fetchTV();
    // eslint-disable-next-line
  }, [page, genreforURL]);
  return (
    <div>
      <span className="pageTitle">TV Series</span>

      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="series">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
              vote_count={c.vote_count}
            />
          ))}
      </div>

      <CustomPagination setPage={setPage} />
    </div>
  );
};
export default Series;
