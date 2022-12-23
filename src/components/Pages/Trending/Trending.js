import React from "react";
import axios from "axios";
import { useState } from "react";
import CustomPagination from "../../CustomPagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import "./Trending.css";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=5c188f68b04550c3f366d00edd438f7c&page=${page}`
    );

    setContent(data.results);
  };
  React.useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
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
export default Trending;
