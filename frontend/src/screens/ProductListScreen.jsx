import React from "react";
import {useParams} from "react-router-dom"
import { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../Components/Message.jsx";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import Paginate from "../Components/Paginate"
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";

import { PRODUCT_CREATE_RESET } from "../constants/productConstant";

const ProductListScreen = () => {


  const { pageNumber } = useParams();
  const p1 = pageNumber || 1;


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products,pages, page } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    //to set successCreate to false. if we don'e set PRODUCT_CREATE_RESET then user can't see the product list again and will be redirected to product edit page

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", p1));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successDelete,
    createdProduct,
    p1
  ]);

  const deleteHandler = (Id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(Id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1> Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Products
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th> ID </th>
              <th> Name </th>
              <th> Price</th>
              <th> Category</th>
              <th> Brands</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn sm'>
                      <i className='fa fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    {" "}
                    <i className='fas fa-trash'></i>{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
<Paginate pages={pages} page={page} isAdmin={true}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
