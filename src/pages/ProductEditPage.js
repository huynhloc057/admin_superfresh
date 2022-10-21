import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllCategory } from "../actions/categoryAction";
import { getProductBySlug } from "../actions/productAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const ProductEditPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, SetQuantity] = useState(0);
  const [description, setDescription] = useState("");

  const { slug } = useParams();

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory());
    if (!product?.name || product?.slug !== slug) {
      dispatch(getProductBySlug(slug));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      SetQuantity(product.quantity);
      setDescription(product.description);
    }
  }, [dispatch, slug, product]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CheckConnection>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Quay lại
        </Link>
        <FormContainer>
          <h1>Cập nhật sản phẩm</h1>

          {loading ? (
            <Loader></Loader>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
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

              <Form.Group controlId="email" className="my-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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

              <Form.Group controlId="category" className="my-3">
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Form.Group>

              <Form.Group controlId="quantity" className="my-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={(e) => SetQuantity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description" className="my-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Cập nhật
              </Button>
            </Form>
          )}
        </FormContainer>
      </CheckConnection>
    </>
  );
};

export default ProductEditPage;
