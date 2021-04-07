import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../Custom/CustomInput";
import CustomSelect from "../Custom/CustomSelect";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editExpense } from "../../../redux/Creators/ExpenseCreators";
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
  InputGroupText,
} from "reactstrap";

const mapStateToProps = (state) => {
  return {
    login: state.login,
    expense: state.expense,
    addExpense: state.addExpense,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editExpense: (data) => {
    dispatch(editExpense(data));
  },
});

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidUpdate() {
    if (this.props.addExpense.edit.length > 0) {
      this.setState({
        modal: false,
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    const id = props.id.id;
    let data = {
      token: token,
      id: id,
      expenseType_name: values.expenseType_name,
      remark: values.remark,
      amount: values.amount,
      name: values.name,
    };
    props.editExpense(data);
    setSubmitting(false);
    return;
  };

  render() {
    const data = this.props.id;
    const category = this.props.categorydata;
    return (
      <React.Fragment>
        <Button size="sm" className="btn-info pull-right" onClick={this.toggle}>
          <i className="fa fa-pencil-alt" />
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Edit Category</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                expenseType_name: data
                  ? data.expense_type
                    ? data.expense_type.name
                    : ""
                  : "",
                remark: data ? data.remark : "",
                amount: data ? data.amount : "",
                name: data ? data.name : "",
              }}
              onSubmit={this.handleSubmit}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="expenseType_name">Expense Type</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i class="fas fa-dollar-sign"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomSelect}
                          name="expenseType_name"
                          id="expenseType_name"
                          placeholder="Enter Expense Name"
                        >
                          <option hidden>Select Expense Type</option>
                          <option disabled>Select Expense Type</option>
                          {category
                            ? category.map((data, index) => (
                                <option key={index} value={data.name}>
                                  {data.name}
                                </option>
                              ))
                            : null}
                        </Field>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="name">Expense Name</Label>
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
                          placeholder="Enter Expense Name"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="remark">Remarks</Label>
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
                          placeholder="Enter Expense Remark"
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
                          type="number"
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
  connect(mapStateToProps, mapDispatchToProps)(EditExpense)
);
