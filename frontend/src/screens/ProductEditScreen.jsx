
import axios from "axios";

import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Message from "../Components/Message.jsx";
import Loader from "../Components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../Components/FormContainer";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstant.js";

const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const [uploading, setUploading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  // we don't need product here

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });

      dispatch({ type: PRODUCT_DETAILS_RESET });

      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [
    id,
    navigate,
    dispatch,
    product._id,
    product.name,
    product.price,
    product.image,
    product.brand,
    product.category,
    product.countInStock,
    product.description,
    successUpdate,
  ]);

const uploadFileHandler = async(e)=>{

    const file= e.target.files[0];  //becz it is array, I need single one
    const formData= new FormData()
    formData.append("image", file) //image in backend
    setUploading(true)

    try{
const config= {
    headers:{
        "Content-Type": "multipart/form-data"
    }
}

const {data}= await axios.post("http://localhost:5000/api/upload", formData, config)
setImage(data) //in return path will come
setUploading(false)

}catch(error){
console.log(error)
setUploading(false)

    }
}

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1> Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label> Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label> Price </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label> Image </Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide image link'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              {/* <Form.Control
                type="file"
                id='image-file'
                label='Choose File'
                custom="true"
                onChange={uploadFileHandler}

              > </Form.Control> */}
              {uploading && <Loader/>} 
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label> Brand </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand name'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label> Count In Stock </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Count'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label> Category </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label> Description </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
              {" "}
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

// I need someone who can help out implement some things into this project which includes:

// - List New Products First

// - Add A Dropdown to Brand Instead of text-input

// - Have multiple images show in a slider inside product details view.

// - Host Images in a server or somewhere else. Heroku deletes local files because it is a ephemeral system.

// - Implement a edit or delete functionality for reviews

// - Implement Stripe

// - Implement Dark Mode

// - Filter By Price

// - Save Payment Method To LocalStorage.

// - If product price changed. Show a red slash on old price and show new one next to it.

// -Show amount of items in cart in header with a ()

// - Forgot password Functionality
