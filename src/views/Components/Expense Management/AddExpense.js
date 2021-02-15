import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../Custom/CustomInput";
import CustomSelect from "../Custom/CustomSelect";
import { postExpense } from "../../../redux/Creators/ExpenseCreators";
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
    expense: state.expense,
    addExpense: state.addExpense
  };
};

const mapDispatchToProps = dispatch => ({
  postExpense: data => {
    dispatch(postExpense(data));
  }
});

class AddExpense extends Component {
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
    if (this.props.addExpense.expense.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      expense_type_id: values.category_name,
      remark: values.remark,
      amount: values.amount,
      
    };
    console.log("data value", data);
    props.postExpense(data);
    setSubmitting(false);
    return;
  };

  render() {
    const data = this.props.categorydata;
    return (
      <React.Fragment>
        <Button className="btn-success pull-right" onClick={this.toggle}>
          Add Expense
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Expense</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                expense_type_id: "",
                remark: "",
                amount: "",
                
              }}
              onSubmit={this.handleSubmit}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="expense_type_id">Expense Type</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-dollar-sign"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomSelect}
                          name="category_name"
                          id="category_name"
                          placeholder="Enter Expense Name"
                        >
                          <option hidden>Select Category</option>
                          <option disabled>Select Category</option>
                          {data
                            ? data.map((data, index) => (
                                <option key={index}>
                                  {data.category_name}
                                </option>
                              ))
                            : null}
                        </Field>
                      </InputGroup>
                    </Col>
                   
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="remark">Expense Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-dollar-sign"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="remark"
                          id="remark"
                          placeholder="Enter Expense Name"
                        />
                      </InputGroup>
                    </Col>
                    
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="type">Expense Amount</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-dollar-sign"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="amount"
                          id="amount"
                          placeholder="Enter Expense Amount"
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddExpense)
);
