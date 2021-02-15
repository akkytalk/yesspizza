import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../../Custom/CustomInput";
import CustomSelect from "../../Custom/CustomSelect";
import { postExpense } from "../../../../redux/Creators/ExpenseCreators";
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

class AddExpenseType extends Component {
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
      name: values.name
      
    };
    console.log("data value", data);
    props.postExpenseType(data);
    setSubmitting(false);
    return;
  };

  render() {
    // const data = this.props.categorydata;
    return (
      <React.Fragment>
        <Button className="btn-success pull-right" onClick={this.toggle}>
          Add Expense Type
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Expense Type</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name:""
                
              }}
              onSubmit={this.handleSubmit}
            >
              {formProps => (
                <Form>
                  {/* <Row className="form-group">
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
                   
                  </Row> */}
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="name">Expense Type</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-dollar-sign"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Expense Type"
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
  )(AddExpenseType)
);
