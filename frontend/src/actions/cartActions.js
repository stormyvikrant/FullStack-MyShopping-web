import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstant.js";

import axios from "axios";

export const addToCart = (id, qty) => {
  return async function (dispatch, getState) {
    const  {data}  = await axios.get( 
      `https://my-mt-shop.herokuapp.com/api/products/${id}`
    );

    // console.log(data, "ji")
        // `http://localhost:5000/api/products/${id}`
    dispatch({
      type: CART_ADD_ITEM,
      payload: { 
        // selectively extracting fields which we want to store in cart. Means in one product there there alot of fields. We are showing the most relevant one. 
        //And also "qty"
        
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)  // storing whole CartItems array in local Storage. 
    );

  };
};


export const removeFromCart = (id) => (dispatch, getState) =>{
dispatch({
  type: CART_REMOVE_ITEM,
  payload: id,
})
localStorage.setItem(
  "cartItems",
  JSON.stringify(getState().cart.cartItems)
);

}




export const saveShippingAdress = (data) => (dispatch) =>{

dispatch ({
  type: CART_SAVE_SHIPPING_ADDRESS,
  payload: data
})

localStorage.setItem("shippingAddress", JSON.stringify(data))


}


export const savePaymentMethod = (data) => (dispatch) =>{

  dispatch ({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })
  
  localStorage.setItem("paymentMethod", JSON.stringify(data))
  
  
  }
  



