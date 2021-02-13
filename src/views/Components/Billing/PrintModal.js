import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import printJS from "print-js";
import Loader from "../../../components/loader/Loader";
import { showBilling } from "../../../redux/Creators/BillingCreators";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  Button
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    billing: state.billing,
    addBilling: state.addBilling
  };
};

const mapDispatchToProps = dispatch => ({
  showBilling: data => {
    dispatch(showBilling(data));
  }
});

class PrintModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchdata();
  }

  fetchdata() {
    const token = this.props.login.login.access_token;
    const id = this.props.match.params.id;
    let data = {
      id: id,
      token: token
    };
    this.props.showBilling(data);
  }

  newPrint() {
    printJS({
      printable: "divToPrint",
      type: "html",
      documentTitle: "Bill",
      scanStyles: "true",
      targetStyles: "[*]"
    });
  }

  render() {
    const data = this.props.billing;
    return (
      <Card className="col-4">
        <CardHeader>
          <strong>Print</strong>
        </CardHeader>
        <CardBody>
          <div>
            {data ? (
              data.isLoading ? (
                <div className="container">
                  <div className="row">
                    <div
                      className="col"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh"
                      }}
                    >
                      <Loader />
                    </div>
                  </div>
                </div>
              ) : data.billing ? (
                <div
                  id="divToPrint"
                  className="container"
                  style={{
                    width: "3.2in",
                    padding: 0,
                    margin: 0,
                    textAlign: "center"
                  }}
                >
                  <h5 className="c_name" style={{ color: "#000000" }}>
                    {data.billing
                      ? data.billing.company
                        ? data.billing.company.company_name
                        : null
                      : null}
                  </h5>
                  <h6 className="address" style={{ color: "#000000" }}>
                    {data.billing
                      ? data.billing.company
                        ? data.billing.company.address
                        : null
                      : null}
                  </h6>
                  <table className="w-100 text-dark">
                    <thead>
                      <tr
                        style={{
                          borderTop: "1px solid #000000",
                          borderBottom: "1px solid #000000",
                          color: "#000000"
                        }}
                      >
                        <th scope="col">Name:</th>
                        <th scope="col">{data.billing.customer_name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ color: "#000000" }}>
                        <td>Date:</td>
                        <td>{data.billing.created_at}</td>
                      </tr>
                      <tr style={{ color: "#000000" }}>
                        <td>Cashier: 1</td>
                        <td>Bill No.:{data.billing.invoice_no}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="w-100 text-dark">
                    <thead>
                      <tr
                        style={{
                          borderTop: "1px solid #000000",
                          borderBottom: "1px solid #000000",
                          color: "#000000"
                        }}
                      >
                        <th scope="col">Item</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        ? data.billing.bill_detail
                          ? data.billing.bill_detail.map((product, index) => (
                              <tr key={index} style={{ color: "#000000" }}>
                                <td>
                                  {product.product
                                    ? product.product.product_name
                                    : null}
                                </td>
                                <td>{product.quantity}</td>
                                <td>{product.bill_rate}</td>
                                <td>{product.bill_amount}</td>
                              </tr>
                            ))
                          : null
                        : null}
                    </tbody>
                  </table>
                  <table className="w-100 text-dark">
                    <thead
                      style={{
                        borderTop: "1px solid #000000",
                        borderBottom: "1px solid #000000",
                        color: "#000000"
                      }}
                    >
                      <tr style={{ color: "#000000" }}>
                        <td>Sub Total</td>
                        <th>{data.billing.total_amount}</th>
                      </tr>
                      {data.billing ? (
                        data.billing.discount ? (
                          <tr style={{ color: "#000000" }}>
                            <td>Discount</td>
                            <th>{data.billing.discount_amount}</th>
                          </tr>
                        ) : null
                      ) : null}
                    </thead>
                  </table>
                  <table className="w-100 text-dark">
                    <tbody
                      style={{
                        borderTop: "1px solid #000000",
                        borderBottom: "1px solid #000000",
                        color: "#000000"
                      }}
                    >
                      <tr>
                        <th>Grand Total</th>
                        <th>{data.billing.total_tax_amount}</th>
                      </tr>
                    </tbody>
                  </table>

                  <h6 className="thanks" style={{ color: "#000000" }}>
                    THANK YOU VISIT AGAIN!
                  </h6>
                </div>
              ) : null
            ) : null}
          </div>
          <Container>
            <Row>
              <Col>
                <Button color="warning" onClick={this.newPrint} block>
                  <i className="fa fa-eye" />
                  Print Bill
                </Button>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrintModal)
);
