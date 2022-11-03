import React from "react";

import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../Components/Message.jsx";
import Loader from "../Components/Loader";
import {useNavigate} from "react-router-dom"
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
const {userInfo} = userLogin

const userDelete = useSelector((state) => state.userDelete);
const {success: successDelete} = userDelete

  useEffect(() => {
    // disabled={userInfo._id === user._id}  // if you don't want Admin should delete itself

if(userInfo && userInfo.isAdmin){
    dispatch(listUsers());
}
else{
    navigate("/login")
}
  }, [dispatch, navigate, userInfo, successDelete]);
  //successDelete as dependency becz after delete we want to useeffect to run again 

  const deleteHandler = (id) => {
    if(window.confirm("Are you sure")){
      dispatch(deleteUser(id));
    }
    
  };


  return (
    <>
      <h1> Users </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th> ID </th>
              <th> Name </th>
              <th> EMAIL </th>
              <th> ADMIN </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn sm'>
                      <i className='fa fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    {" "}
                    <i className='fas fa-trash'></i>{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
