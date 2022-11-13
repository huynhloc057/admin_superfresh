import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategoryDetail, updateCategory } from "../actions/categoryAction";
import { categoryConstants } from "../actions/constant";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const CategoryEditPage = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();

  const { categoryDetail, loading, error, success } = useSelector(
    (state) => state.category
  );

  const [name, setName] = useState("");
  useEffect(() => {
    if (success) {
      toast.success("Update category successfully!");
      dispatch({ type: categoryConstants.DELETE_CATEGORIES_RESET });
    }
    if (
      !categoryDetail?.category?.name ||
      categoryDetail?.category?._id !== _id
    ) {
      dispatch(getCategoryDetail(_id));
    } else {
      setName(categoryDetail?.category.name);
    }
  }, [_id, dispatch, categoryDetail, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory(_id, name));
  };

  return (
    <>
      <CheckConnection>
        <Link to="/admin/categorylist" className="btn btn-light my-3">
          Quay lại
        </Link>
        <FormContainer>
          <h1>Cập nhật danh mục sản phẩm</h1>
          {loading ? (
            <Loader></Loader>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="username">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                Cập nhật
              </Button>
            </Form>
          )}
        </FormContainer>
      </CheckConnection>
    </>
  );
};

export default CategoryEditPage;
