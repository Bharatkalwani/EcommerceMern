import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { Fragment } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import UserOptions from "./component/layout/Header/UserOptions";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log("user", isAuthenticated);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Fragment>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/product/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route
            path="/products/:keyword"
            element={<Products></Products>}
          ></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route path="/login" element={<LoginSignUp></LoginSignUp>}></Route>
        </Routes>

        <Footer></Footer>
      </Router>
    </Fragment>
  );
}

export default App;
