import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { CardContent } from "@mui/material";
import { Stack } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import ContentModal from "../../ContentModal/ContentModal";

function FavoriteMovie() {
  let list = JSON.parse(localStorage.getItem("fav"));

  return (
    <>
      <Typography variant="h5" mb={2} className="title" fontWeight={600}>
        YOUR FAVORITES
      </Typography>
      <Divider />
      <Grid container direction="row" spacing={5} mt={2}>
        {list?.map((item) => (
          <Grid key={item.id} item xs={6} sm={4} md={3}>
            <ContentModal media_type={item.media_type} id={item.id}>
              <Card className="card" sx={{ width: 220, borderRadius: "5px" }}>
                <CardActionArea>
                  <Box
                    className="poster"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    sx={[
                      {
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.poster_path})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        height: "300px",
                      },
                    ]}
                  >
                    <Paper className="content">
                      <CardContent>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          sx={[
                            {
                              maxHeight: "30%",
                              overflow: "hidden",
                            },
                          ]}
                        >
                          <Typography
                            gutterBottom
                            variant="body1"
                            component="div"
                          >
                            {`${item.title}`}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body1"
                            component="div"
                          >
                            {`${item.media_type}`}
                          </Typography>

                          <Stack
                            flexDirection="row"
                            justifyContent="flex-end"
                            mt={1}
                          >
                            <Box
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              mr={3}
                            >
                              <RecommendIcon
                                className="recommend_icon"
                                fontSize="small"
                              />
                              <Typography variant="subtitle2" ml={1}>
                                {`${item.vote_average}`}
                              </Typography>
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                            >
                              <FavoriteIcon
                                className="favorite_icon"
                                fontSize="small"
                              />
                              <Typography variant="subtitle2" ml={1}>
                                {`${item.vote_count}`}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </CardContent>
                    </Paper>
                  </Box>
                </CardActionArea>
              </Card>
            </ContentModal>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FavoriteMovie;
