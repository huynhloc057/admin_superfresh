import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategory, getAllCategory } from "../actions/categoryAction";
import { categoryConstants } from "../actions/constant";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const CategogyListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error, successDelete } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (successDelete) {
      toast.error("Delete category success!");
      dispatch({ type: categoryConstants.DELETE_CATEGORIES_RESET });
    }
    dispatch(getAllCategory());
  }, [dispatch, successDelete]);
  const createProductHandler = () => {
    navigate("/admin/category/add");
  };
  const deleteHandler = (_id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCategory({ _id }));
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Category
          </Button>
        </Col>

        <Col className="text-right">
          <Button
            className="my-3"
            onClick={() => navigate("/admin/categorydisablelist")}
          >
            <i class="fa-solid fa-user-slash"></i> Disabled Category
          </Button>
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
                    <LinkContainer to={`/admin/category/${category._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(category._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default CategogyListPage;
