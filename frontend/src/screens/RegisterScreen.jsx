import React from "react";
import { useState} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Message from "../Components/Message.jsx";
import Loader from "../Components/Loader";
import { register} from "../actions/userActions";
import FormContainer from "../Components/FormContainer";

const RegisterScreen = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);


  const { id } = useParams();

  let result = (id ? id.toString() : "/")

const navigate= useNavigate()


  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister )

const {loading, error} = userRegister

  



//   useEffect(()=>{
//     if(userInfo){
//       navigate(result);
//     }
//   // }, [navigate, redirect, userInfo])
// }, [navigate, result, userInfo])

  const submitHandler = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
        setMessage("Passwords do not match")
    }
    else{
        dispatch(register(name,email,password))
        navigate(result)
    }
  
  };

  return (
    <FormContainer>
      <h1> Sign Up</h1>
{message && <Message variant="danger">{message}</Message>}
{error && <Message variant="danger">{error}</Message>}
{loading && <Loader />}

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

        <Form.Group controlId='confirmPassword'>
          <Form.Label> confirmPassword</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>




        <Button className="my-3" type='submit' variant='primary'>
          {" "}
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
        Have an Account? <Link to="/login"> Login </Link>  
               </Col>


      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
