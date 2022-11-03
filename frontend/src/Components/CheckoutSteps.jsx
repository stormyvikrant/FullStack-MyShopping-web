import React from "react";

import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {" "}
        {step1 ? (
          <LinkContainer to='/login'>
          <strong> <Nav.Link>    Sign In</Nav.Link></strong> 
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {" "}
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link><strong>Shipping</strong></Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {" "}
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {" "}
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Placeorder</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Placeorder</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
