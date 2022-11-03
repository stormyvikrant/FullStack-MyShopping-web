import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../Components/Rating";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "../Components/Loader.jsx";
import Meta from "../Components/Meta.jsx";
import Message from "../Components/Message.jsx";
import { useNavigate } from "react-router-dom";

import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";

const ProductScreen = () => {
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  // console.log(qty)

  // const product = products.find((p) => p._id === id);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });

  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => {
    return state.productReviewCreate;
  });

  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
if(successProductReview){
  alert("Review Submitted")
  setRating(0)
  setComment("")
  dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
}

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  function addToCartHandler() {
    navigate(`/cart/${id}?qty=${qty}`);
  }

const submitHandler = (e) => {
  e.preventDefault()
  dispatch(createProductReview(id, {
    rating,
    comment
  } ))
}  

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        GO Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4> Price: ${product.price} </h4>
                </ListGroup.Item>
                <ListGroup.Item className='my-3'>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='fluid'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {" "}
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}{" "}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => {
                              return setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {" "}
                                    {x + 1}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block d-block w-100'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      {" "}
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3> Reviews </h3>
              {product.reviews.length === 0 && <Message> No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3> Write a customer Review</h3>
                  {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                  {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label> Rating</Form.Label>
                      <Form.Control as="select" value={rating} onChange={(e)=>setRating(e.target.value)}>
<option value="">Select Rating</option>
<option value="1">1-Poor</option>
<option value="2">2-Fair</option>
<option value="3">3-Good</option>
<option value="4">4-Very Good</option>
<option value="5">5-Excellent</option>

                      </Form.Control>

                    </Form.Group>
<Form.Group controlId="comment"> 
<Form.Label> Comment</Form.Label>
<Form.Control as="textarea" row="3" value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
</Form.Group>

<Button type="submit" variant="primary"> Submit</Button>

                  </Form>
                  ) : (
                    <Message>
                      {" "}
                      Please <Link to='/login'>Sign In</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
