import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { getProduct } from "../../actions/productAction";
import Pagination from "react-js-pagination";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import "./Products.css";
import MetaData from "../layout/MetaData";

//categories
let categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  // filter
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // Get Products
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category,ratings));
  }, [dispatch, keyword, currentPage, price, category,ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>
        </Fragment>
      )}

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="on"
          aria-labelledby="range-slider"
          min={0}
          max={100000}
        />

        <Typography>Categories</Typography>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className="category-link"
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <fieldset>
        <Typography component="legend">Ratings Above</Typography>
        <Slider
          value={ratings}
          onChange={(e, newRating) => {
            setRatings(newRating);
          }}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          min={0}
          max={5}
        />
      </fieldset>
      </div>

      {filteredProductsCount > resultPerPage && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Products;
