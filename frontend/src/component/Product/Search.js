import React, { Fragment, useEffect,useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seachSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  
  useEffect(() => { 
    dispatch(getProduct(keyword));
  }, [dispatch,keyword]);
  return (
    <Fragment>
      <form className="searchBox" onSubmit={seachSubmitHandler}>
        <input
          type="text"
          placeholder="Search a prodcut..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <input type="submit" value="submit"></input>
      </form>
    </Fragment>
  );
};

export default Search;
