import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import '@fontsource-variable/inter';
import "./index.css";
import App from "./App.jsx";
import SignupPage from "./pages/signup.jsx";
import SigninPage from "./pages/signin.jsx";
import HomePage from "./pages/home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={<HomePage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
