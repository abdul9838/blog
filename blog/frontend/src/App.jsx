import React from "react";
import HomePage from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
const App = () => {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
