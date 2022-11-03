import React from "react";

import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../Components/CheckoutSteps";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { shippingAddress} = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1> Payment Method</h1>

      <Form onSubmit={(e) =>submitHandler(e)}>
        <Form.Group>
          <Form.Label as='legend'> Select Method </Form.Label>
   

        <Col>
          <Form.Check
            type='radio'
            label='PayPal or Credit Card'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

{/* <Form.Check
            type='radio'
            label='Stripe'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

<Form.Check
            type='radio'
            label='Credit Card'
            id='Credit-Card'
            name='paymentMethod'
            value='Credit Card'
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check> */}



        </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          {" "}
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
