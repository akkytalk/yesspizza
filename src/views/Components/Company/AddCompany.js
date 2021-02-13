import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../Custom/CustomInput";
import * as Yup from "yup";
import { postCompany } from "../../../redux/Creators/CompanyCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  InputGroup,
  InputGroupAddon,
  Label,
  InputGroupText
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    company: state.company,
    addCompany: state.addCompany
  };
};

const mapDispatchToProps = dispatch => ({
  postCompany: data => {
    dispatch(postCompany(data));
  }
});

class AddCompany extends Component {
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

  componentDidUpdate() {
    if (this.props.addCompany.company.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      company_name: values.company_name,
      address: values.address,
      city: values.city,
      zipcode: values.zipcode,
      state: values.state
    };
    props.postCompany(data);
    setSubmitting(false);
    return;
  };

  render() {
    return (
      <React.Fragment>
        <Button className="btn-success pull-right" onClick={this.toggle}>
          Add Company
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Company</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                company_name: "",
                address: "",
                city: "",
                zipcode: "",
                state: ""
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                company_name: Yup.string().required(
                  "Name of Company is required"
                )
              })}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col>
                      <Label for="company_name">Company Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="company_name"
                          id="company_name"
                          className={
                            "form-control" +
                            (formProps.errors.company_name &&
                            formProps.touched.company_name
                              ? " is-invalid"
                              : "")
                          }
                          placeholder="Enter Company Name"
                        />
                        <ErrorMessage
                          name="company_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <Label for="address">Company Address</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="textarea"
                          name="address"
                          id="address"
                          placeholder="Enter Company Address"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col>
                      <Label for="city">Company City</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Enter Company City"
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <Label for="zipcode">Company Pincode</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          placeholder="Enter Company Pincode"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col>
                      <Label for="state">Company State</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="state"
                          id="state"
                          placeholder="Enter Company State"
                        />
                      </InputGroup>
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
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddCompany)
);
