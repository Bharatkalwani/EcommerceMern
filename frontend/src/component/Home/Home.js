import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all"; <ReactIcons.CgMouse />
// import ReactIcons from 'react-icons/all';
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const showToastMessage = () => {
    toast.success('Products fetched successfully', {
        position: toast.POSITION.TOP_RIGHT
    });
};
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => { 
    dispatch(getProduct());
  }, [dispatch,error]);
  if(!error){
    showToastMessage();
  }
  //   let products = [{
  //   name: "Blue Tshirt",
  //   price: "3000",
  //   _id: "bharat",
  //   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  // },
  // {
  //   name: "Blue Tshirt2",
  //   price: "4000",
  //   _id: "bharat",
  //   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  // },
  // {
  //   name: "Blue Tshirt3",
  //   price: "4000",
  //   _id: "bharat",
  //   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  // },
  // {
  //   name: "Blue Tshirt4",
  //   price: "4000",
  //   _id: "bharat",
  //   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  // },
  // {
  //   name: "Blue Tshirt4",
  //   price: "4000",
  //   _id: "bharat",
  //   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  // },
  // ];
  console.log("products1", products);
  return (
    <Fragment>
      {loading ? (
       <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Ecommerce"></MetaData>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

          <div className="homeHeading">Feature Products</div>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <button onClick={showToastMessage}>Notify</button>
            <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
