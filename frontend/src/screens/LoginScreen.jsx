import React, { useEffect } from "react";
import { useState} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Message from "../Components/Message.jsx";
import Loader from "../Components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../Components/FormContainer";

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const navigate= useNavigate()


  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

const {loading, error, userInfo} = userLogin



useEffect(()=>{
if(userInfo){
navigate("/")
}

},[userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch Login
    dispatch(login(email,password))
 

  };

  return (
    <FormContainer>
      <h1> Sign In</h1>
{error && <Message variant="danger">{error}</Message>}
{loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label> Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label> Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="my-3" type='submit' variant='primary'>
          {" "}
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
        New Customer? <Link to="/register"> Register </Link>  
               </Col>


      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
