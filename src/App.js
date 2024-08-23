import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./redux/userSlice";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import PrivateRoute from "./components/PrivateRoute";
import Toolbar from "./components/Toolbar/Toolbar";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = {};
      dispatch(login({ userInfo, token }));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <LoadingIndicator />
      <Header />
      <div className="content-container">
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Home />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
              }
            />
            <Route
              path="/about"
              element={<PrivateRoute element={<About />} />}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
          </Routes>
        </main>
      </div>
      {isAuthenticated && <Toolbar />}
      <Footer />
    </div>
  );
}

export default App;
