import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Message from "../Components/Message.jsx";
import Loader from "../Components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../Components/FormContainer";
import {USER_UPDATE_RESET} from "../constants/userConstant"

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);

  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate


  useEffect(()=>{
    if(successUpdate){
        dispatch({type: USER_UPDATE_RESET})
        navigate("/admin/userlist")
    }
    else{
        if(!user.name || user._id !== id){
            dispatch(getUserDetails(id))
        }
        else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }
   
  },[id, navigate, successUpdate, dispatch, user._id, user.name, user.isAdmin, user.email])

  const submitHandler = (e) => {

    e.preventDefault();
    dispatch(updateUser({_id: id, name, email, isAdmin}))
  };

  return (
    <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1> Edit User</h1>

{loadingUpdate && <Loader/> }
{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

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

            <Form.Group controlId='email'>
              <Form.Label> Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
