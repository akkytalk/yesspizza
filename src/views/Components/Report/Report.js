import React, { Component } from "react";
import CustomInput from "../Custom/CustomInput";
import { showReport } from "../../../redux/Creators/BillingCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import {
  ExcelExport,
  ExcelExportColumn
} from "@progress/kendo-react-excel-export";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Button,
  Table
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    billing: state.billing
  };
};

const mapDispatchToProps = dispatch => ({
  showReport: data => {
    dispatch(showReport(data));
  }
});

class Search extends Component {

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;

    let data = {
      token: token,
      from_date: values.from_date,
      to_date: values.to_date
    };
    
    props.showReport(data);
    // alert("Form Submitted");
    setSubmitting(false);
    return;
  };

  _exporter;
  export = () => {
    this._exporter.save();
  };

  render() {
    const data = this.props.billing.report;
    
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="fas fa-barcode" /> Reports
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Formik
                initialValues={{
                  from_date: "",
                  to_date: ""
                }}
                validate={values => {
                  let errors = [];

                  if (!values.email) errors.email = "Email Address Required";

                  //check if my values have errors
                  return errors;
                }}
                onSubmit={this.handleSubmit}
                render={formProps => {
                  return (
                    <Form>
                      <Row className="form-group">
                        <Col>
                          <Label for="name">Date</Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-file-excel" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Field
                              component={CustomInput}
                              type="date"
                              name="from_date"
                              id="from_date"
                              placeholder="Enter Barcode Number"
                            />
                            <Field
                              component={CustomInput}
                              type="date"
                              name="to_date"
                              id="to_date"
                              placeholder="Enter Barcode Number"
                            />
                            <InputGroupAddon addonType="append">
                              <Button
                                type="submit"
                                disabled={formProps.isSubmitting}
                                color="success"
                                block
                              >
                                Submit
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-dark text-white">
                  <strong>Bill Report</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Button className="k-Button" onClick={this.export}>
                        Export Report
                      </Button>
                    </Col>
                  </Row>

                  <ExcelExport
                    data={data}
                    fileName="Billing.xlsx"
                    ref={exporter => {
                      this._exporter = exporter;
                    }}
                  >
                    <ExcelExportColumn
                      field="invoice_no"
                      title="Invoice No."
                      locked={true}
                      width={100}
                    />
                    <ExcelExportColumn
                      field="invoice_date"
                      title="Invoice Date"
                      width={150}
                    />
                    <ExcelExportColumn
                      field="customer_name"
                      title="Customer Name"
                      width={200}
                    />
                    <ExcelExportColumn
                      field="mode_of_payment"
                      title="Payment Mode"
                      width={150}
                    />
                    <ExcelExportColumn
                      field="gst_total"
                      title="Total GST"
                      width={200}
                    />
                    <ExcelExportColumn
                      field="total_amount"
                      title="Total Amount"
                      width={200}
                    />
                  </ExcelExport>

                  {data ? (
                    <React.Fragment>
                      <Table>
                        <thead>
                          <tr>
                            <th>Invoice No.</th>
                            <th>Invoice Date</th>
                            <th>Customer Name</th>
                            <th>Payment Mode</th>
                            <th>GST Amount</th>
                            <th>Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data
                            ? data.map((bill, index) => (
                                <tr key={index}>
                                  <td>{bill.invoice_no}</td>
                                  <td>{bill.invoice_date}</td>
                                  <td>{bill.customer_name}</td>
                                  <td>{bill.mode_of_payment}</td>
                                  <td>{bill.gst_total}</td>
                                  <td>{bill.total_tax_amount}</td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </Table>
                    </React.Fragment>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
