import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./ContentModal.css";
import Carousel from "../Carousel/Carousel";
import StarIcon from "@mui/icons-material/Star";
import YouTubeIcon from "@mui/icons-material/YouTube";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=5c188f68b04550c3f366d00edd438f7c`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=5c188f68b04550c3f366d00edd438f7c`
    );

    setVideo(data.results[0]?.key);
  };
  React.useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, [media_type, id]);

  return (
    <>
      <Button onClick={handleOpen}>{children}</Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <Box className="ContentModal">
                <img
                  className="ContentModal__landscape"
                  alt={`${content.title} || ${content.name}`}
                  height="200px"
                  src={`https://image.tmdb.org/t/p/w500/${content.backdrop_path}`}
                  style={{ borderRadius: "10px" }}
                />

                <Typography className="ContentModal__about">
                  <StarIcon
                    className="star_icon"
                    fontSize="large"
                    sx={{
                      backgroundColor: "rgb(255,77,106)",
                      right: "30px",
                    }}
                  />
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "...."
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </Typography>
              </Box>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
