import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userConstants } from "../actions/constant";
import { activeUser, getAllDisabledUsers } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserListDisabledPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { disabledUser, loading, error, successActive } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (successActive) {
      toast.success("Active User Successfully");
      dispatch({ type: userConstants.UN_DELETE_USER_RESET });
    }
    if (user && user.role === "admin") {
      dispatch(getAllDisabledUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, user, successActive]);
  const undisabledHandler = (_id) => {
    if (window.confirm("Are you sure")) {
      dispatch(activeUser({ _id }));
    }
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Quay lại
      </Link>
      <h1>Danh sách user bị vô hiệu hoá</h1>
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
              <th>End Disabled</th>
            </tr>
          </thead>
          <tbody>
            {disabledUser?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="success"
                    className="btn-sm"
                    onClick={() => undisabledHandler(user._id)}
                  >
                    <i class="fa-solid fa-check"></i>
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

export default UserListDisabledPage;
