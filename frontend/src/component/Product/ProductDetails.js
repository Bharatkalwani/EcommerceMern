import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../Product/ReviewCard";
import Loader from "../layout/Loader/Loader";

import "./ProductDetails.css";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  let options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <div className="ProductDetails" style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      src="https://i.ibb.co/DRST11n/1.webp"
                      key={item.url}
                      alt={`${i} slide`}
                      // style={{ display: "block", objectFit: "contain" }}
                    />
                  ))}
              </Carousel>
            </div>

            <div style={{ flex: 2, margin: "70px" }}>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id} </p>
              </div>

              <div className="detailsBlock-2">
                <ReactStars {...options}></ReactStars>
                <span>({product.numOfReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number"></input>
                    <button>+</button>
                  </div>
                  <button>Add to cart</button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
