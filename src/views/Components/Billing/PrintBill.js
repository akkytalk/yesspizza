import React, { Component } from "react";
import printJS from "print-js";
import {
  Row,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from "reactstrap";

class PrintBill extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  newPrint() {
    printJS({
      printable: "divToPrint",
      type: "html",
      scanStyles: "true",
      targetStyles: "[*]"
    });
  }

  render() {
    const data = this.props.id;
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          <i className="fa fa-eye" />
        </Button>
        <Modal
          className="modal-info"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Print</ModalHeader>
          <ModalBody>
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
              <h5 className="c_name text-dark">
                {data
                  ? data.company
                    ? data.company.company_name
                    : null
                  : null}
              </h5>
              <h6 className="address text-dark">
                {data ? (data.company ? data.company.address : null) : null}
              </h6>
              <table className="w-100 text-dark">
                <thead>
                  <tr
                    style={{
                      borderTop: "1px solid #000000",
                      borderBottom: "1px solid #000000"
                    }}
                  >
                    <th scope="col">Name:</th>
                    <th scope="col">{data.customer_name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Date:</td>
                    <td>{data.created_at}</td>
                  </tr>
                  <tr>
                    <td>Cashier: 1</td>
                    <td>Bill No.:{data.invoice_no}</td>
                  </tr>
                </tbody>
              </table>
              <table className="w-100 text-dark">
                <thead>
                  <tr
                    style={{
                      borderTop: "1px solid #000000",
                      borderBottom: "1px solid #000000"
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
                    ? data.bill_detail
                      ? data.bill_detail.map((product, index) => (
                          <tr key={index}>
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
                    borderBottom: "1px solid #000000"
                  }}
                >
                  <tr>
                    <td>Sub Total</td>
                    <th>{data.total_amount}</th>
                  </tr>
                  {data ? (
                    data.discount ? (
                      <tr style={{ color: "#000000" }}>
                        <td>Discount</td>
                        <th>{data.discount_amount}</th>
                      </tr>
                    ) : null
                  ) : null}
                </thead>
              </table>
              <table className="w-100 text-dark">
                <tbody
                  style={{
                    borderTop: "1px solid #000000",
                    borderBottom: "1px solid #000000"
                  }}
                >
                  <tr>
                    <th>Grand Total</th>
                    <th>{data.total_tax_amount}</th>
                  </tr>
                </tbody>
              </table>

              <h6 className="thanks text-dark">THANK YOU VISIT AGAIN!</h6>
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
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default PrintBill;
