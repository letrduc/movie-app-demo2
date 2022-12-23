/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "@mui/system";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Trending from "./components/Pages/Trending/Trending";
import Movies from "./components/Pages/Movies/Movies";
import Series from "./components/Pages/Series/Series";
import Search from "./components/Pages/Search/Search";
// import Login from "./components/Login";
import { useContext } from "react";
import Favorite from "./components/Pages/Favorite/Favorite";
import AuthContext from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            {/* <Route path="/account" element={<Login />} /> */}
            <Route path="/favorite" element={<Favorite />} />
            <Route
              path="*"
              element={
                <main>
                  <p>There's nothing here </p>
                </main>
              }
            />
          </Routes>
        </Container>
        <SimpleBottomNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;
