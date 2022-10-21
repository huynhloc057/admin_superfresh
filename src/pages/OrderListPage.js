import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getCustomerOrders } from "../actions/orderAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckConnection from "../HOC/CheckConnection";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getCustomerOrders());
  }, [dispatch]);

  return (
    <>
      <CheckConnection>
        <Row className="align-items-center">
          <Col>
            <h1>Orders</h1>
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
                  <th>USER</th>
                  <th>TOTAL PRICE</th>
                  <th>TYPE PAYMENT</th>
                  <th>STATUS PAYMENT</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user}</td>
                    <td>{order.totalAmount}</td>
                    <td>{order.paymentType}</td>
                    <td>{order.paymentStatus}</td>
                    <td>
                      <LinkContainer to={`/admin/order/${order.slug}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </CheckConnection>
    </>
  );
};

export default OrderListPage;
