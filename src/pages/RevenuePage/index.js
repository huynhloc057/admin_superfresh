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
import { useDispatch } from "react-redux";
import { getRevenue } from "../../actions/statisticAction";
import Chart from "chart.js/auto";

export default function Statistic() {
  const [chartType, setChartType] = useState("Bar");
  const [statisticType, setStatisticType] = useState("day");

  // Set init date from 7 day before til now.
  const dateNow = new Date();
  const [dateTo, setDateTo] = useState(dateNow.toISOString());
  const dateBeforeAWeek = new Date(dateNow);
  dateBeforeAWeek.setDate(dateBeforeAWeek.getDate() - 7);
  const [dateFrom, setDateFrom] = useState(dateBeforeAWeek.toISOString());

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
      const res = await dispatch(getRevenue(payload));
      const rvn = res.data.revenue;
      setRevenue(rvn);
    };
    fetchAPI();
  }, [statisticType, dateFrom, dateTo, dispatch]);

  // Fill Revenue Arr into Data field of ChartJS
  const myData = (dataArr) => {
    const labels = [];
    const data = [];
    dataArr.forEach((element) => {
      labels.push(element.date);
      data.push(element.totalAmount);
    });
    const chartData = {
      labels,
      datasets: [
        {
          label: "Total amount",
          backgroundColor: ["#3e95cd"],
          data,
        },
      ],
    };
    return chartData;
  };

  // Customize the chart
  const Chart = ({ data, options }) => {
    if (chartType === "Line") {
      return <Line data={data} options={options} />;
    } else if (chartType === "Radar ") {
      console.log(data);
      return (
        <Radar
          data={data}
          options={{ ...options, maintainAspectRatio: false }}
          height={650}
        />
      );
    }
    return <Bar data={data} options={options} />;
  };

  return (
    // <Layout sidebar>
    <Container className="statistic-wrapper">
      <Row>
        <Col md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Statistic</h3>
            <div className="task-bar_date">
              <h5> Period: </h5>
              <DatePicker
                selected={new Date(dateFrom)}
                onChange={(date) => setDateFrom(date.toString())}
              />
              <DatePicker
                selected={new Date(dateTo)}
                onChange={(date) => setDateTo(date.toString())}
              />
            </div>
            <div className="task-bar">
              <ButtonGroup size="sm" className="btn-group-order-status">
                <DropdownButton
                  className="dropdown-role"
                  as={ButtonGroup}
                  title={`By ${statisticType}`}
                  onSelect={(e) => setStatisticType(e)}
                >
                  <Dropdown.Item eventKey="day">By day</Dropdown.Item>
                  <Dropdown.Item eventKey="month">By month</Dropdown.Item>
                  <Dropdown.Item eventKey="year">By year</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
              <ButtonGroup size="sm" className="btn-group-order-status">
                <DropdownButton
                  className="dropdown-role"
                  as={ButtonGroup}
                  title={chartType}
                  onSelect={(e) => setChartType(e)}
                >
                  <Dropdown.Item eventKey="Bar">Bar</Dropdown.Item>
                  <Dropdown.Item eventKey="Line">Line</Dropdown.Item>
                  <Dropdown.Item eventKey="Radar ">Radar </Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </div>
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
