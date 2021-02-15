import React, { Component } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomInput from "../Custom/CustomInput";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProduct } from "../../../redux/Creators/ProductCreators";
import {
  postBilling,
  deleteBilling
} from "../../../redux/Creators/BillingCreators";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    product: state.product,
    billing: state.billing,
    addBilling: state.addBilling
  };
};

const mapDispatchToProps = dispatch => ({
  getProduct: data => {
    dispatch(getProduct(data));
  },
  postBilling: data => {
    dispatch(postBilling(data));
  },
  deleteBilling: data => {
    dispatch(deleteBilling(data));
  }
});

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, redirect: false };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.fetchProduct();
    console.log("billing data", this.props.billing)
  }

  fetchProduct() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getProduct(data);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidUpdate() {
    if (this.props.addBilling.billing.length > 0) {
      this.setState({
        redirect: true
      });
      // this.props.deleteBilling(" ");
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      client_name: values.client_name,
      mobile_no: values.mobile_no,
      mode_of_payment: values.mode_of_payment,
      mode_of_order: values.mode_of_order,
      discount: values.discount,
      product_name: values.product_name,
      product: values.product
    };
    props.postBilling(data);
    setSubmitting(true);
    return;
  };

  renderRedirect() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={`/print/${this.props.addBilling.billing[0].id}`}
          {...this.props}
        />
      );
    }
  }

  render() {
    const productdata = this.props.product.productid;
    return (
      <Card>
        {this.renderRedirect()}
        <CardHeader className="bg-primary text-white">
          <i className="fas fa-box" /> <strong>Billing</strong>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              client_name: "",
              mobile_no: "",
              mode_of_payment: "cash",
              mode_of_order: "",
              discount: "0",
              product_name: "",
              product: []
            }}
            onSubmit={this.handleSubmit}
            validationSchema={Yup.object().shape({
              client_name: Yup.string().required("Client Name is required")
            })}
          >
            {formProps => (
              <Form>
                <Row className="form-group">
                  <Col md={4}>
                    <Label for="client_name">Client Name</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="far fa-calendar-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="client_name"
                        id="client_name"
                        className={
                          "form-control" +
                          (formProps.errors.client_name &&
                          formProps.touched.client_name
                            ? " is-invalid"
                            : "")
                        }
                        placeholder="Enter Customer Name"
                      />
                      <ErrorMessage
                        name="client_name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="mobile_no">Mobile No.</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="mobile_no"
                          id="mobile_no"
                          placeholder="Enter Mobile No."
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <Label for="mode_of_order">Mode Of Order</Label>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={3}>
                    <Label>
                      <input
                        type="radio"
                        name="mode_of_order"
                        value="counter"
                        checked={formProps.values.mode_of_order === "counter"}
                        onChange={() =>
                          formProps.setFieldValue("mode_of_order", "counter")
                        }
                      />
                      Counter
                    </Label>
                  </Col>
                  <Col md={3}>
                    <Label>
                      <input
                        type="radio"
                        name="mode_of_order"
                        value="swiggy"
                        checked={formProps.values.mode_of_order === "swiggy"}
                        onChange={() =>
                          formProps.setFieldValue("mode_of_order", "swiggy")
                        }
                      />
                      Swiggy
                    </Label>
                  </Col>
                  <Col md={3}>
                    <Label>
                      <input
                        type="radio"
                        name="mode_of_order"
                        value="zomato"
                        checked={formProps.values.mode_of_order === "zomato"}
                        onChange={() =>
                          formProps.setFieldValue("mode_of_order", "zomato")
                        }
                      />
                      Zomato
                    </Label>
                  </Col>
                  <Col md={3}>
                    <Label>
                      <input
                        type="radio"
                        name="mode_of_order"
                        value="other"
                        checked={formProps.values.mode_of_order === "other"}
                        onChange={() =>
                          formProps.setFieldValue("mode_of_order", "other")
                        }
                      />
                      Other
                    </Label>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <Label for="mode_of_payment">Mode Of Payment</Label>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={3}>
                    <Label>
                      <input
                        type="radio"
                        name="mode_of_payment"
                        value="cash"
                        checked={formProps.values.mode_of_payment === "cash"}
                        onChange={() =>
                          formProps.setFieldValue("mode_of_payment", "cash")
                        }
                      />
                      Cash
                    </Label>
                  </Col>
                  <Col md={3}>
                    <Label>
                      <input
                        type="radio"
                        name="mode_of_payment"
                        value="card"
                        checked={formProps.values.mode_of_payment === "card"}
                        onChange={() =>
                          formProps.setFieldValue("mode_of_payment", "card")
                        }
                      />
                      Card
                    </Label>
                  </Col>
                  <Col md={3}>
                    <Label>
                      <input
                        type="radio"
                        name="mode_of_payment"
                        value="paytm"
                        checked={formProps.values.mode_of_payment === "paytm"}
                        onChange={() =>
                          formProps.setFieldValue("mode_of_payment", "paytm")
                        }
                      />
                      Paytm
                    </Label>
                  </Col>
                  <Col md={3}>
                    <Label>
                      <input
                        type="radio"
                        name="mode_of_payment"
                        value="paytm"
                        checked={formProps.values.mode_of_payment === "paytm"}
                        onChange={() =>
                          formProps.setFieldValue("mode_of_payment", "paytm")
                        }
                      />
                      Other
                    </Label>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={4}>
                    <Label for="discount">Discount Percent</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="far fa-calendar-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="discount"
                        id="discount"
                        placeholder="Enter Discount Percent"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FieldArray
                      name="product"
                      render={arrayHelpers => (
                        <div>
                          <Row>
                            <Col md={8}>
                              <FormGroup>
                                <Label for="product_name">Product Name</Label>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="fas fa-user" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    component={CustomInput}
                                    type="text"
                                    list="productdatalist"
                                    name="product_name"
                                    id="product_name"
                                    placeholder="Enter Product Name"
                                  />
                                  <datalist id="productdatalist">
                                    {productdata.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item.product_name}
                                      />
                                    ))}
                                  </datalist>
                                  <InputGroupAddon addonType="append">
                                    <Button
                                      block
                                      color="success"
                                      onClick={() => {
                                        let obj = productdata.find((o, i) => {
                                          if (
                                            o.product_name ===
                                            formProps.values.product_name
                                          ) {
                                            arrayHelpers.push({
                                              product_name: o.product_name,
                                              sale_rate: o.sale_rate,
                                              gst_rate: o.gst_rate
                                                ? o.gst_rate
                                                : "",
                                              quantity: 1,
                                              discount: "",
                                              final_price: o.sale_rate
                                            });
                                          }
                                        });
                                      }}
                                    >
                                      Add Product
                                    </Button>
                                  </InputGroupAddon>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Table size="sm">
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Product Name</th>
                                <th>Sale Rate</th>
                                <th>GST</th>
                                <th>Quantity</th>
                                <th>Final Rate</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formProps.values.product.map(
                                (product, index) => {
                                  var sale_rate = Number(product.sale_rate);
                                  var quantity = Number(product.quantity);
                                  var gst =
                                    (Number(product.gst_rate) / 100) *
                                    sale_rate;
                                  var final = (sale_rate + gst) * quantity;
                                  product.final_price = final;
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <Field
                                          component={CustomInput}
                                          readOnly
                                          type="text"
                                          name={`product.${index}.product_name`}
                                          id="index_product_name"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          component={CustomInput}
                                          readOnly
                                          type="text"
                                          name={`product.${index}.sale_rate`}
                                          id="sale_rate"
                                          placeholder="Enter Rate"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          component={CustomInput}
                                          readOnly
                                          type="text"
                                          name={`product.${index}.gst_rate`}
                                          id="gst_rate"
                                          placeholder="Enter Rate"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          component={CustomInput}
                                          type="number"
                                          min="1"
                                          name={`product.${index}.quantity`}
                                          id="product_quantity"
                                          placeholder="Enter Quantity"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          component={CustomInput}
                                          readOnly
                                          type="text"
                                          name={`product.${index}.final_price`}
                                          id="final_price"
                                          placeholder="Final Price"
                                        />
                                      </td>
                                      <td>
                                        <Button
                                          color="danger"
                                          size="sm"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <i className="fa fa-trash" />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td>
                                  <i className="fa fa-rupee-sign" />{" "}
                                  {formProps.values.product.reduce(function(
                                    prev,
                                    cur
                                  ) {
                                    return prev + cur.final_price;
                                  },
                                  0)}
                                </td>
                                <td></td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <br />
                <Row style={{ justifyContent: "center" }}>
                  <Col md={4}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Billing)
);
