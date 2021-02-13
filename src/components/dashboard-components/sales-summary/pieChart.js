import React, { Component } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Pie } from "react-chartjs-2";
import { intersection } from "lodash";

const COLORS = [
    "#3366cc",
    "#dc3912",
    "#ff9900",
    "#109618",
    "#990099",
    "#0099c6",
    "#dd4477",
    "#66aa00",
    "#b82e2e",
    "#316395",
    "#3366cc",
    "#994499",
    "#22aa99",
    "#aaaa11",
    "#6633cc",
    "#e67300",
    "#8b0707",
    "#651067",
    "#329262",
    "#5574a6",
    "#3b3eac",
    "#b77322",
    "#16d620",
    "#b91383",
    "#f4359e",
    "#9c5935",
    "#a9c413",
    "#2a778d",
    "#668d1c",
    "#bea413",
    "#0c5922",
    "#743411"
  ];
let labelColors = {}; 

const mapColorsToLabels = labels => {
    const usedKeys = intersection(Object.keys(labelColors), labels);
    let firstAvailColor = usedKeys.length; // sensible place to start looking for new colors
    
    let chartColors = [];
    let usedColors = {};
    
    // get previously used colors for all labels in current report
    usedKeys.forEach(label => {
      usedColors[labelColors[label]] = true;
    });
    
    labels.forEach(label => {
      // if we've never seen this label before
      if (!labelColors[label]) {
        
        while (usedColors[COLORS[firstAvailColor]]) {
          // if we are already using this color, get the next color
          firstAvailColor += 1;
        }
        // if we are not already using this color, save it
        labelColors[label] = COLORS[firstAvailColor];
        firstAvailColor += 1;
      }
      
      // add color for new label to array that we will push to Chart.js
      chartColors.push(labelColors[label]);
    });
    
    // return 1D array of colors assigned to current labels
    return chartColors;
  };

class PieChart extends Component {
  render() {
    const data = this.props.dashboard;
    console.log(this.props);
    let chartdata = [];
    let labeldata = [];

    if (data) {
      if (data.itemwise) {
        data.itemwise.map((data, index) => {
          chartdata.push(data.amount);
          labeldata.push(data.product_name);
        });
      }
    }

    let lineData = {
      labels: labeldata,
      datasets: [
        {
          label: "Daily Sales",
          backgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: "rgb(94,114,228)",
          pointBackgroundColor: "rgb(94,114,228)",
          data: chartdata
        }
      ]
    };

    const colors = mapColorsToLabels(labeldata);

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle>Total Product Sales</CardTitle>
            </div>
          </div>
          <Row>
            <Col lg="12">
              <div className="campaign ct-charts">
                <div
                  className="chart-wrapper"
                  style={{ width: "100%", margin: "0 auto" }}
                >
                  <Pie
                    data={lineData}
                    options={{
                      maintainAspectRatio: true,
                      legend: {
                        display: true,
                        labels: { fontFamily: "Nunito Sans" }
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

export default PieChart;
