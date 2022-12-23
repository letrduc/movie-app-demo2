import { Card } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

function SingleContent({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  vote_count,
}) {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Card className="card" sx={{ width: 220, borderRadius: "5px" }}>
        <CardActionArea>
          <Box
            className="poster"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            sx={[
              {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster})`,
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
                  justifyContent="space-around"
                  sx={[
                    {
                      maxHeight: "30%",
                      overflow: "hidden",
                    },
                  ]}
                >
                  <Typography gutterBottom variant="body1" component="div">
                    {`${title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${media_type}`}
                  </Typography>

                  <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-around"
                      mr={3}
                    >
                      <RecommendIcon
                        className="recommend_icon"
                        fontSize="small"
                      />
                      <Typography variant="subtitle2" ml={1}>
                        {`${vote_average}`}
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
                        {`${vote_count}`}
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
  );
}

export default SingleContent;
