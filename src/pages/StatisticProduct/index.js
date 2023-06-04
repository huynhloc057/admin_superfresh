import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Bar, Line, Radar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getRevenue } from "../../actions/statisticAction";
import Chart from "chart.js/auto";
import { getAllProducts } from "../../actions/productAction";

export default function Statistic() {
  const [chartType, setChartType] = useState("Bar");
  const [statisticType, setStatisticType] = useState("day");

  // Set init date from 7 day before til now.
  const dateNow = new Date();
  const [dateTo, setDateTo] = useState(dateNow.toISOString());
  const dateBeforeAWeek = new Date(dateNow);
  dateBeforeAWeek.setDate(dateBeforeAWeek.getDate() - 7);
  const [dateFrom, setDateFrom] = useState(dateBeforeAWeek.toISOString());
  const { products, loading, error, successDelete, success } = useSelector(
    (state) => state.product
  );

  const [revenue, setRevenue] = useState(null);
  const dispatch = useDispatch();

  // Fetching API when type or date changed
  useEffect(() => {
    const fetchAPI = async () => {
      const payload = {
        type: statisticType,
        dateFrom,
        dateTo,
      };
      await dispatch(getAllProducts());

      setRevenue(products);
    };
    fetchAPI();
  }, [statisticType, dateFrom, dateTo, dispatch]);

  // Fill Revenue Arr into Data field of ChartJS
  const myData = (dataArr) => {
    console.log(dataArr);
    const labels = [];
    const data = [];
    dataArr.forEach((element) => {
      labels.push(element.name);
      data.push(element.quantity);
    });
    const chartData = {
      labels,
      datasets: [
        {
          label: "Total products",
          backgroundColor: ["#3e95cd"],
          data,
        },
      ],
    };
    return chartData;
  };

  // Customize the chart
  const Chart = ({ data, options }) => {
    // if (chartType === "Line") {
    //   return <Line data={data} options={options} />;
    // } else if (chartType === "Radar ") {
    //   console.log(data);
    //   return (
    //     <Radar
    //       data={data}
    //       options={{ ...options, maintainAspectRatio: false }}
    //       height={650}
    //     />
    //   );
    // }
    return <Bar data={data} options={options} />;
  };

  return (
    // <Layout sidebar>
    <Container className="statistic-wrapper">
      <Row>
        <Col md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Statistic Product</h3>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        {revenue && (
          <Chart
            data={myData(revenue)}
            options={{
              legend: { display: false },
              title: {
                display: true,
                text: "Predicted world population (millions) in 2050",
              },
            }}
          />
        )}
      </Row>
    </Container>
    // </Layout>
  );
}
