import React, { useEffect } from "react";
import { Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userConstants } from "../actions/constant";
import { disabledUser, getAllUsers } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, successDelete } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (successDelete) {
      toast.error("Disabled user success !");
      dispatch({ type: userConstants.UN_DELETE_USER_RESET });
    }
    if (user && user.role === "admin") {
      dispatch(getAllUsers());
    }
  }, [dispatch, user, successDelete]);
  const deleteHandler = (user) => {
    // console.log(_id);
    if (window.confirm("Are you sure")) {
      dispatch(disabledUser(user));
    }
  };
  return (
    <>
      <CheckConnection>
        <h1>Users</h1>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={() => navigate("/admin/disabledusers")}
          >
            <i class="fa-solid fa-user-slash"></i> Disabled Users
          </Button>
        </Col>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </CheckConnection>
    </>
  );
};

export default UserListPage;
