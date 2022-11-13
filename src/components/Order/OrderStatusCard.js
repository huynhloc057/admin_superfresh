import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
// import { updateOrderStatus } from "../../../actions";
import "./OrderStatusCard.scss";
import Input from "../Input";
import Card from "../Card/Card";
import { updateOrderStatus } from "../../actions/orderAction";

export default function OrderStatusCard(props) {
  const { orderItem } = props;
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onUpdateStatus = () => {
    const payload = { orderId: orderItem._id, type };
    dispatch(updateOrderStatus(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };

  const optionsOrderStatusUnconfirmed = (status) => {
    const options = [];
    status.map((stt) => {
      if (!stt.isCompleted) {
        options.push({ name: stt.type, value: stt.type });
      }
    });
    return options;
  };

  return (
    <Card
      style={{
        margin: "10px 0",
      }}
      headerLeft={`Order ID: ${orderItem._id}`}
    >
      <div className="order-details">
        <div>
          <div className="title">Items Name</div>
          {orderItem.items.map((item) => (
            <div className="value">{item.productId.name}</div>
          ))}
        </div>
        <div>
          <span className="title">Total Price</span>
          <br />
          <span className="value">{orderItem.totalAmount}</span>
        </div>
        <div>
          <span className="title">Payment Type</span>
          <br />
          <span className="value">{orderItem.paymentType}</span>
        </div>
        <div>
          <span className="title">Payment Status</span>
          <br />
          <span className="value">{orderItem.paymentStatus}</span>
        </div>
      </div>
      <div className="order-status-box">
        <div className="order-track">
          {orderItem.orderStatus.map((status) => (
            <div
              className={`order-status ${status.isCompleted ? "active" : ""}`}
            >
              <div
                className={`point ${status.isCompleted ? "active" : ""}`}
              ></div>
              <div className="order-info">
                <div className="status">{status.type}</div>
                <div className="date">{formatDate(status.date)}</div>
              </div>
            </div>
          ))}
        </div>
        {optionsOrderStatusUnconfirmed(orderItem.orderStatus).length > 0 ? (
          <div className="order-select-confirm">
            <Input
              type="select"
              placeholder="select status"
              value={type}
              options={optionsOrderStatusUnconfirmed(orderItem.orderStatus)}
              onChange={(e) => setType(e.target.value)}
            />
            <Button
              variant="success"
              style={{ margin: "0 5px 10px" }}
              onClick={onUpdateStatus}
            >
              Confirm
            </Button>
          </div>
        ) : (
          <h2> COMPLETED </h2>
        )}
      </div>
    </Card>
  );
}
