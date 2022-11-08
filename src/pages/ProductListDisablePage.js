import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { productConstants } from "../actions/constant";
import { enableProduct, getAllProductsDisable } from "../actions/productAction";

import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const ProductListDisablePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error, successEnable } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (successEnable) {
      toast.success("Enable product successfully!");
      dispatch({ type: productConstants.ADD_PRODUCT_RESET });
    }
    dispatch(getAllProductsDisable());
  }, [dispatch, successEnable]);
  const enableHandler = (productId) => {
    if (window.confirm("Are you sure")) {
      dispatch(enableProduct(productId));
    }
  };
  return (
    <>
      <CheckConnection>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Quay lại
        </Link>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
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
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category.name}</td>
                    <td>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={() => enableHandler(product._id)}
                      >
                        <i class="fa-solid fa-check"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* <Paginate pages={pages} page={page} isAdmin={true}></Paginate> */}
          </>
        )}
      </CheckConnection>
    </>
  );
};

export default ProductListDisablePage;
