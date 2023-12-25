import axios from "axios";
import Cookies from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

//register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    let link = "http://localhost:4000/api/v1/register";
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(link, userData, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    let link = "http://localhost:4000/api/v1/login";

    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(link, { email, password }, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    let link = "http://localhost:4000/api/v1/me";

    const token = Cookies.get("token");
    const config = {
      //   Headers: {
      //     "Content-Type": "application/json",
      //   },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("config", config, token);
    //, {  }, config
    const { data } = await axios.get(link, token);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//logout
export const logout = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
      let link = "http://localhost:4000/api/v1/logout";
  
      const token = Cookies.get("token");
    //   const config = {
    //     //   Headers: {
    //     //     "Content-Type": "application/json",
    //     //   },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   console.log("config", config, token);
      //, {  }, config
      await axios.get(link);
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
