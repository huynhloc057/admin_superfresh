import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory } from "../actions/categoryAction";
import { productConstants } from "../actions/constant";
import { getProductBySlug, updateProduct } from "../actions/productAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const ProductEditPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);

  const { slug } = useParams();

  const dispatch = useDispatch();

  const { loading, error, product, success } = useSelector(
    (state) => state.product
  );
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    if (success) {
      setImagesPreview([]);
      toast.success("Update product success !");
      dispatch({ type: productConstants.ADD_PRODUCT_RESET });
    }
    dispatch(getAllCategory());
    if (!product?.name || product?.slug !== slug) {
      dispatch(getProductBySlug(slug));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category._id);
      setQuantity(product.quantity);
      setDescription(product.description);
      setOldImages(product.productPictures);
      setDiscountPercent(product.discountPercent);
    }
  }, [dispatch, slug, product, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", category);
    form.append("discountPercent", discountPercent);

    for (let pic of images) {
      form.append("productPictures", pic);
    }
    dispatch(updateProduct(slug, form));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([...files]);
    setImagesPreview([]);
    setOldImages([]);

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
  console.log(category);

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
                  type="file"
                  onChange={updateProductImagesChange}
                  multiple
                  className="mb-3"
                ></Form.Control>
                <div id="createProductFormImage">
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.img}
                        alt="Old Product Preview"
                      />
                    ))}
                </div>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>
              </Form.Group>

              <Form.Group controlId="category" className="my-3">
                <select
                  className="form-control"
                  value={category._id}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>{product?.category?.name}</option>
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
                  onChange={(e) => setQuantity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="discountPercent" className="my-3">
                <Form.Label>Discount Percent</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter discount percent"
                  value={discountPercent}
                  isInvalid={
                    !(parseInt(discountPercent) > 0) && discountPercent.length
                  }
                  onChange={(e) => setDiscountPercent(e.target.value)}
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
