
import React from "react";
import {Link} from "react-router-dom";
import Meta from "../Components/Meta"
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions.js";
import Message from "../Components/Message.jsx";
import Loader from "../Components/Loader.jsx";
import { useParams } from "react-router-dom";
import Paginate from "../Components/Paginate";
import ProductCarousel from "../Components/ProductCarousel";

const HomeScreen = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams();

  const p1 = pageNumber || 1;

  console.log(p1, "p1");
  // console.log(keyword, "keywordMT")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => {
    return state.productList;
  });
  // note- productList name here becz that what we use in combinereducer

  const { loading, error, products, page, pages } = productList;

  // const [products, setProducts]= useState([])

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    dispatch(listProducts(keyword, p1));
  }, [dispatch, navigate, userInfo, keyword, p1]);

  return (
    <>
{/* <Helmet>
  <title> Welcome To MyShop- QuickCommerce </title> 
  <meta name="description" content="We sell best products with fast delivery" />
<meta name="keywords" content="electronics, buy electronics, quality electronics"/>
</Helmet> */}

<Meta />

    {/* {!keyword && <ProductCarousel/>}
    {keyword && <Link to="/"> Go Back</Link>  } */}

    {!keyword ? <ProductCarousel/> : <Link to="/" className="btn btn-light"> Go Back</Link> }
      <h1> Latest Top Products </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <>
        {products.length === 0 && <Message variant="danger" >Product not found</Message>}
          <Row>
            {products.map((product) => (
              <Col style={{display: "flex"}} key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
