/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import StarIcon from "@mui/icons-material/Star";
import AuthContext from "../contexts/AuthContext";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (value === 0) navigate("/");
    if (value === 1) navigate("/movies");
    if (value === 2) navigate("/series");
    if (value === 3) navigate("/search");
    if (value === 5) navigate("/account");
    if (value === 4) navigate("/favorite");
  }, [value, navigate]);

  const auth = useContext(AuthContext);

  const handleClickLogin = (e) => {
    navigate("/login");
  };

  const handleClickLogout = (e) => {
    auth.signout(() => {
      navigate("/");
    });
  };

  return (
    <Box sx={{ width: "100%" }} position="fixed" bottom="0" zIndex="100">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />

        <BottomNavigationAction label="Movies" icon={<MovieIcon />} />

        <BottomNavigationAction label="TV Series" icon={<LiveTvIcon />} />

        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Favorite" icon={<StarIcon />} />
        <BottomNavigationAction label="Account" icon={<AccountCircle />} />

        {auth?.user ? (
          <>
            <Button
              color="inherit"
              margin="10px"
              onClick={handleClickLogout}
              variant="contained"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>

            <Avatar
              src="../../public/avt.jpg"
              alt="avt"
              sx={{ width: 40, height: 40, ml: 1 }}
            />
          </>
        ) : (
          <Button
            onClick={handleClickLogin}
            startIcon={<LoginIcon />}
            variant="contained"
          >
            Login
          </Button>
        )}
      </BottomNavigation>
    </Box>
  );
}
