import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productConstants } from "../actions/constant";
import {
  deleteProduct,
  getAllProducts,
  updateDiscount,
} from "../actions/productAction";

import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";
import { useState } from "react";
import Input from "../components/Input";
import AddDiscountModal from "../components/AddDiscountModal";
import { getAllCategory } from "../actions/categoryAction";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, successDelete, success } = useSelector(
    (state) => state.product
  );
  const { categories } = useSelector((state) => state.category);

  const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);
  const [discount, setDiscount] = useState({
    type: "category",
    _id: "",
    discountPercent: 0,
  });
  const [searchText, setSearchText] = useState("");
  const [productFiltered, setProductFiltered] = useState(products);

  const [sort, setSort] = useState(false);

  useEffect(() => {
    if (successDelete) {
      toast.error("Disabled product success !");
      dispatch({ type: productConstants.ADD_PRODUCT_RESET });
    }
    dispatch(getAllProducts());
    dispatch(getAllCategory());
  }, [dispatch, successDelete, success]);
  const createProductHandler = () => {
    navigate("/admin/product/add");
  };

  const onSubmitDiscountModal = () => {
    dispatch(updateDiscount(discount));
  };

  const filterProductsByName = (sText) => {
    const arrProducts = products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(sText.toLowerCase()) !== -1 ||
        product.name.toLowerCase().indexOf(sText.toLowerCase()) !== -1
    );
    arrProducts.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    // sort by Ascending
    if (sort) {
      return arrProducts.reverse();
    }
    return arrProducts;
  };

  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(productId));
    }
  };

  const onSearchProduct = (e) => {
    setSearchText(e.target.value);
    setProductFiltered(filterProductsByName(searchText));
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>

        <Col className="text-right">
          <Button
            className="my-3"
            onClick={() => navigate("/admin/product/disable")}
          >
            <i class="fa-solid fa-user-slash"></i> Disabled Products
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Input
              type="text"
              style={{ marginBottom: "15px" }}
              placeholder="Search by name"
              value={searchText}
              onChange={onSearchProduct}
            />
          </Row>
          <div className="wrapper-btn">
            <Button
              variant="success"
              onClick={() => setShowAddDiscountModal(true)}
            >
              Set Discount
            </Button>
          </div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productFiltered?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product.slug}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <AddDiscountModal
            show={showAddDiscountModal}
            onSubmit={onSubmitDiscountModal}
            handleClose={() => setShowAddDiscountModal(false)}
            categories={categories}
            discount={discount}
            setDiscount={setDiscount}
          />
          {/* <Paginate pages={pages} page={page} isAdmin={true}></Paginate> */}
        </>
      )}
    </>
  );
};

export default ProductListPage;
