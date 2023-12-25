import React from "react";
import { Link, Outlet } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({product}) => {
  const options = {
    edit: true,
    color: "rbga(20,20,20,0.1)",
    isHalf: true,
    activeColor: "tomato",
    value: product.ratings,
  };
  //product.images[0].url
  return (
    <Link className="=productCard" to={`/product/${product._id}`}>
    <img src="https://i.ibb.co/DRST11n/1.webp" alt={product.name}   style={{ height: 300, width: 300,padding:5 }} />

      <p>{product.name}</p>
      <div>
        <ReactStars {...options}></ReactStars> <span>({product.numOfReviews})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
