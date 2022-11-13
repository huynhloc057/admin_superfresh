import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addCategory } from "../actions/categoryAction";
import { categoryConstants } from "../actions/constant";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const CategoryAddPage = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { success, loading, error } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("name", name);
    for (let pic of images) {
      form.append("categoryImage", pic);
    }
    dispatch(addCategory(form));
  };
  const updateCategoryImagesChange = (e) => {
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
  console.log("image", images);

  useEffect(() => {
    if (success) {
      toast.success("Add Category success");
      navigate("/admin/categorylist");
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_RESET,
      });
    }
  }, [success, navigate, dispatch]);

  return (
    <>
      <CheckConnection>
        <Link to="/admin/categorylist" className="btn btn-light my-3">
          Quay lại
        </Link>
        <FormContainer>
          <h1>Thêm danh mục sản phẩm</h1>
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

              <Form.Group controlId="images">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  required
                  type="file"
                  className="mb-3"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={updateCategoryImagesChange}
                  multiple
                ></Form.Control>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Category Preview" />
                  ))}
                </div>
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

export default CategoryAddPage;
