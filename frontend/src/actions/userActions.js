import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstant.js";
// import {useNavigate} from "react-router-dom"

import {ORDER_LIST_MY_RESET} from "../constants/orderConstant"


import axios from "axios";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant.js";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://my-mt-shop.herokuapp.com/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      // payload: error.response,
    });
  }
};






export const logout = () => (dispatch) =>{
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET })
  dispatch({ type: PRODUCT_CREATE_REVIEW_RESET }) 
  
  

}




export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://my-mt-shop.herokuapp.com/api/users",
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); // After register,  I want to user login automatically => Idk why? he wants that

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      // payload: error.response,
    });
  }
};




export const getUserDetails= (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {userLogin: {userInfo}} = getState()



    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}` 

      },
    };

    const { data } = await axios.get(
      `https://my-mt-shop.herokuapp.com/api/users/${id}`,
      config
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      // payload: error.response,
    });
  }
};







export const updateUserProfile= (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });




    const {userLogin: {userInfo}} = getState()


    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}` 

      },
    };

    const { data } = await axios.put(
      `https://my-mt-shop.herokuapp.com/api/users/profile`, user, 
      config
    );

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      // payload: error.response,
    });
  }
};





export const listUsers= () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {userLogin: {userInfo}} = getState()



    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` 

      },
    };

    const { data } = await axios.get(
      `https://my-mt-shop.herokuapp.com/api/users`, config
    );

    dispatch({ type: USER_LIST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      // payload: error.response,
    });
  }
};






export const deleteUser= (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {userLogin: {userInfo}} = getState()



    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` 

      },
    };

   await axios.delete(
      `https://my-mt-shop.herokuapp.com/api/users/${id}`, config
    );

    dispatch({ type: USER_DELETE_SUCCESS}); // NO NEED OF PAYLOAD-JUST PASSING SUCCESS FROM REDUCER

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      // payload: error.response,
    });
  }
};




export const updateUser= (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {userLogin: {userInfo}} = getState()



    const config = {
     
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}` 

      },
    };

  const {data}= await axios.put(
      `https://my-mt-shop.herokuapp.com/api/users/${user._id}`, user, config
    );

    dispatch({ type: USER_UPDATE_SUCCESS}); 

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data}); //JISSE UPDATE HO JAY REDUX MEI
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        });
      }
    };












