import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Scale from "../../components/loader/Scale";

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.dashboard;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4">
          <Card outline color="success">
            <CardHeader className="bg-warning text-white">
              <h3 className="mb-0">Today's Sales</h3>
            </CardHeader>
            <CardBody>
            {data ? (
                data.isLoading ? (
                  <Scale />
                ) : data.dashboard ? (
                  <h3>{data.dashboard.todaysale}</h3>
                ) : null
              ) : null}
            </CardBody>
            <CardFooter>
              <h6>Amount in Ruppees</h6>
            </CardFooter>
          </Card>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4">
          <Card>
            <CardHeader className="bg-danger text-white">
              <h3 className="mb-0">Month's Sales</h3>
            </CardHeader>
            <CardBody>
            {data ? (
                data.isLoading ? (
                  <Scale />
                ) : data.dashboard ? (
                  <h3>{data.dashboard.monthsale}</h3>
                ) : null
              ) : null}
            </CardBody>
            <CardFooter>
              <h6>Amount in Ruppees</h6>
            </CardFooter>
          </Card>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4">
          <Card>
            <CardHeader className="bg-info text-white">
              <h3 className="mb-0">Total Products</h3>
            </CardHeader>
            <CardBody>
            {data ? (
                data.isLoading ? (
                  <Scale />
                ) : data.dashboard ? (
                  <h3>{data.dashboard.productcount}</h3>
                ) : null
              ) : null}
            </CardBody>
            <CardFooter>
              <h6>Products</h6>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

export default Top;
