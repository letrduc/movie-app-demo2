import React from "react";
import axios from "axios";
import { Chip } from "@mui/material";

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/genre/${type}/list?api_key=5c188f68b04550c3f366d00edd438f7c&language=en-US`);

    setGenres(data.genres);
  };
  console.log("genresdata", genres);

  React.useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
    // eslint-disable-next-line
  }, [type]);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            size="small"
            color="primary"
            clickable
            key={genre.id}
            label={genre.name}
            onDelete={() => handleRemove(genre)}
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            size="small"
            clickable
            key={genre.id}
            label={genre.name}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
