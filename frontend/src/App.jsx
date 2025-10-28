import Home from "./pages/Home";
import Nearby from "./pages/Nearby";
import Categories from "./pages/Categories";
import BussinessMode from "./pages/BussinessMode";
import Bookmark from "./pages/Bookmark";
import AboutUs from "./pages/AboutUs";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    let token = sessionStorage.getItem("User");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nearby" element={<Nearby />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/business-mode" element={<BussinessMode />} />
      <Route path="/bookmark" element={<Bookmark />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
