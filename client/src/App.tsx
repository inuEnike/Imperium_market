import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/signup/Signup";
import Layout from "./pages/profile/Layout";
import ProtectedRoute from "./hooks/custom/protected";
import AddAds from "./pages/profile/AddAds";
import User from "./pages/profile/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProtectedRoute />}>
        <Route path="" element={<Layout />}>
          <Route path="add-Ads" element={<AddAds />} />
          <Route path="user" element={<User />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
