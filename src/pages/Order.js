import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getCustomerOrders } from "../actions/orderAction";
import OrderStatusCard from "../components/Order/OrderStatusCard";

export default function Order() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [typeSort, setTypeSort] = useState("all");
  useEffect(() => {
    dispatch(getCustomerOrders());
  }, [dispatch]);
  const listOrderByType = (type) => {
    if (type === "all") return order.orders;
    const listOrder = order.orders.filter((item) => {
      if (lastCompletedType(item) === type) return true;
      return false;
    });
    return listOrder;
  };
  // Lay ra orderStatus.type cuoi cung de sort
  const lastCompletedType = (item) => {
    for (let i = item.orderStatus.length - 1; i >= 0; i--) {
      if (item.orderStatus[i].isCompleted) return item.orderStatus[i].type;
    }
  };

  return (
    <Container className="table-order">
      <Row>
        <Col md={12}>
          <div className="title">
            <h3>Orders</h3>
            <div>
              <ButtonGroup size="sm" className="btn-group-order-status">
                <DropdownButton
                  className="dropdown-role"
                  as={ButtonGroup}
                  title={typeSort}
                  onSelect={(e) => setTypeSort(e)}
                >
                  <Dropdown.Item eventKey="all">all</Dropdown.Item>
                  <Dropdown.Item eventKey="ordered">ordered</Dropdown.Item>
                  <Dropdown.Item eventKey="packed">packed</Dropdown.Item>
                  <Dropdown.Item eventKey="shipped">shipped</Dropdown.Item>
                  <Dropdown.Item eventKey="delivered">delivered</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </div>
          </div>
        </Col>
      </Row>
      {listOrderByType(typeSort).map((order, index) => (
        <OrderStatusCard orderItem={order} key={index} />
      ))}
    </Container>
  );
}
