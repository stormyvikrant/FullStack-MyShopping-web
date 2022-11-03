import React from "react";

import { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps.jsx";
import Message from "../Components/Message.jsx";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const cart = useSelector((state) => state.cart);

  // console.log(cart, "mycart")

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 5);

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);


  const orderCreate= useSelector(state => state.orderCreate)

  const {order, success, error} =orderCreate

  console.log(order, success, "myorderhai")


useEffect(()=>{

  if(success){
    navigate(`/order/${order._id}`)   //order._id  comes from "order"
  }
  //eslint-disable-next-line
},[success, navigate])


  const placeOrderHandler = (cart) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps> step1 step2 step3 step4</CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> Shipping</h2>
              <p>
                <strong> Address: </strong>
                {cart.shippingAddress.address}
                {cart.shippingAddress.city}
                {cart.shippingAddress.postalCode}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong> Method: {cart.paymentMethod} </strong>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2> Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {" "}
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2> Order Summary </h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Items</Col>
                  <Col> ${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Shipping Price</Col>
                  <Col> ${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                <Row>
                  <Col> Items</Col>
                  <Col> ${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item>
                <Row>
                  <Col> Tax Price </Col>
                  <Col> ${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Total </Col>
                  <Col> ${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
<ListGroup.Item> 
  {error && <Message variant="danger">{error}  </Message>}
</ListGroup.Item>



              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block btn d-block w-100'
                  disabled={cart.cartItems === 0}
                  onClick={ () => placeOrderHandler(cart)}
                >
                  {" "}
                  Place Order{" "}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
