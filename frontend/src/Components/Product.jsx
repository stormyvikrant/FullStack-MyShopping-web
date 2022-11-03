import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (


      <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img style={{objectFit: "cover", height:"250px", width: "100%"}} src={product.image} variant='top' />
      </Link>

      <Card.Body className='d-flex flex-column justify-content-between'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div' className='my-2'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          {/* <Rating value={product.rating} text={20}/> */}
        </Card.Text>

        <Card.Text as='h3'> ${product.price} </Card.Text>
      </Card.Body>
</Card>






  
  );
};

export default Product;
