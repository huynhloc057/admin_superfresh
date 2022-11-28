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
import CheckConnection from "../HOC/CheckConnection";

const ProductAddPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const { categories } = useSelector((state) => state.category);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

    for (let pic of images) {
      form.append("productPictures", pic);
    }

    dispatch(addProduct(form));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([...files]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  console.log("images", images);

  return (
    <>
      <CheckConnection>
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
                  required
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email" className="my-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter price"
                  isInvalid={!(parseInt(price) > 0) && price.length}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="images" className="my-3">
                <Form.Control
                  required
                  type="file"
                  className="mb-3"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={updateProductImagesChange}
                  multiple
                ></Form.Control>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>
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
                  required
                  type="number"
                  placeholder="Enter Quantity"
                  value={quantity}
                  isInvalid={!(parseInt(quantity) > 0) && quantity.length}
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
      </CheckConnection>
    </>
  );
};

export default ProductAddPage;
