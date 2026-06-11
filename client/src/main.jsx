import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import { darkTheme } from "./utils/Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <App>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<CreatePost />} />
          </Routes>
        </App>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);