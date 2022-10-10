import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategory } from "../actions/categoryAction";
import { addProduct } from "../actions/productAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { productConstants } from "../actions/constant";
import { toast } from "react-toastify";

const ProductAddPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllCategory());
    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/productlist");
      dispatch({ type: productConstants.ADD_PRODUCT_RESET });
    }
  }, [dispatch, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", category);

    for (let pic of image) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));
  };

  console.log(image);
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Quay lại
      </Link>
      <FormContainer>
        <h1>Thêm sản phẩm</h1>
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

            <Form.Group controlId="image" className="my-3">
              <input
                type="file"
                name="productPicture"
                accept="image/x-png,image/gif,image/jpeg"
                // onChange={(e) => setImage([...image, e.target.files[0]])}
                onChange={(e) => setImage([...image, e.target.files[0]])}
              />
              {image && image.length > 0 && (
                <div id="createProductFormImage" className="truncate">
                  {image.map((item, index) => (
                    <span key={index}>
                      {item.name} <br></br>
                    </span>
                  ))}
                </div>
              )}
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

            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
              Thêm
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductAddPage;
