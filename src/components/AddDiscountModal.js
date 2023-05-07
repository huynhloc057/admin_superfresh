import { ToggleButtonGroup, ToggleButton, Modal } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { Row, Col, Form } from "react-bootstrap";
import NewModal from "./Modal";

export default function AddDiscountModal(props) {
  const { show, handleClose, onSubmit, categories, discount, setDiscount } =
    props;

  const SelectOptions = () => {
    if (discount.type === "category") {
      return (
        <select
          className="form-control"
          value={discount._id}
          onChange={(e) => setDiscount({ ...discount, _id: e.target.value })}
        >
          <option>select category</option>
          {categories?.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      );
    }
    return null;
  };

  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      modalTitle={"Add Discount"}
      onSubmit={onSubmit}
    >
      <div className="wrapper-discount">
        <h5>Discount By </h5>
        <ToggleButtonGroup
          name="value"
          type="radio"
          size="md"
          value={discount.type}
          onChange={(value) => setDiscount({ ...discount, type: value })}
        >
          <ToggleButton value={"category"}>Category</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <hr />
      <SelectOptions />
      <hr />

      <Form>
        <Form.Group>
          <Form.Label>Discount Percent</Form.Label>
          <RangeSlider
            value={discount.discountPercent}
            size="lg"
            tooltipLabel={(currentValue) => `${currentValue}%`}
            tooltip="on"
            onChange={(e) =>
              setDiscount({ ...discount, discountPercent: e.target.value })
            }
          />
        </Form.Group>
      </Form>
    </NewModal>
  );
}
