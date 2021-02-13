import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Col, Row } from "reactstrap";
import { Line, Pie } from "react-chartjs-2";

class SalesSummary extends Component {
  render() {
    const data = this.props.dashboard;
    let chartdata = [];
    let labeldata = [];

    if (data) {
      if (data.dailysale) {
        data.dailysale.map((data, index) => {
          chartdata.push(data.amount);
          labeldata.push(data.date);
        });
      }
    }

    let lineData = {
      labels: labeldata,
      datasets: [
        {
          label: "Daily Sales",
          borderWidth: 1,
          backgroundColor: "rgba(94,114,228,.1)",
          borderColor: "rgb(94,114,228)",
          pointBorderColor: "rgb(94,114,228)",
          pointBackgroundColor: "rgb(94,114,228)",
          data: chartdata
        }
      ]
    };

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle>Sales Summary</CardTitle>
              <CardSubtitle>summary of the month</CardSubtitle>
            </div>
          </div>
          <Row>
            <Col lg="12">
              <div className="campaign ct-charts">
                <div
                  className="chart-wrapper"
                  style={{ width: "100%", margin: "0 auto", height: 250 }}
                >
                  <Line
                    data={lineData}
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: true,
                        labels: { fontFamily: "Nunito Sans" }
                      },
                      scales: {
                        yAxes: [
                          {
                            stacked: true,
                            gridLines: { display: true },
                            ticks: { fontFamily: "Nunito Sans" }
                          }
                        ],
                        xAxes: [
                          {
                            gridLines: { display: true },
                            ticks: { fontFamily: "Nunito Sans" }
                          }
                        ]
                      }
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default SalesSummary;
