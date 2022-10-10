import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategoryDetail } from "../actions/categoryAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CategoryEditPage = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryDetail } = useSelector((state) => state.category);

  const [name, setName] = useState(categoryDetail?.category?.name);
  const [image, setImage] = useState(categoryDetail?.category?.image);
  useEffect(() => {
    if (
      !categoryDetail?.category.name ||
      categoryDetail?.category._id !== _id
    ) {
      dispatch(getCategoryDetail(_id));
    } else {
      setName(categoryDetail?.category.name);
      setImage(categoryDetail?.category.image);
    }
  }, [_id, dispatch, categoryDetail]);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Link to="/admin/categorylist" className="btn btn-light my-3">
        Quay lại
      </Link>
      <FormContainer>
        <h1>Cập nhật danh mục sản phẩm</h1>
        {/* {loadingUpdate && <Loader />}{" "} */}
        {/* {errorUpdate && <Message>{errorUpdate}</Message>} */}
        {/* {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : ( */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Cập nhật
          </Button>
        </Form>
        {/* )} */}
      </FormContainer>
    </>
  );
};

export default CategoryEditPage;
