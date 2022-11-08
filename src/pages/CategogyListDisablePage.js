import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  enableCategory,
  getAllDisableCategory,
} from "../actions/categoryAction";
import { categoryConstants } from "../actions/constant";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const CategogyListDisablePage = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, success } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (success) {
      toast.success("Enable category success!");
      dispatch({ type: categoryConstants.DELETE_CATEGORIES_RESET });
    }
    dispatch(getAllDisableCategory());
  }, [dispatch, success]);
  const enableHandler = (_id) => {
    if (window.confirm("Are you sure")) {
      dispatch(enableCategory({ _id }));
    }
  };
  return (
    <>
      <CheckConnection>
        <Link to="/admin/categorylist" className="btn btn-light my-3">
          Quay lại
        </Link>
        <Row className="align-items-center">
          <Col>
            <h1>Disable Categories</h1>
          </Col>
        </Row>

        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => (
                  <tr key={category._id}>
                    <td>{category._id}</td>
                    <td>{category.name}</td>
                    <td>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={() => enableHandler(category._id)}
                      >
                        <i className="fa-solid fa-check"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </CheckConnection>
    </>
  );
};

export default CategogyListDisablePage;
