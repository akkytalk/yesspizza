import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../../Custom/CustomInput";
import CustomSelect from "../../Custom/CustomSelect";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editExpenseType } from "../../../../redux/Creators/ExpenseTypeCreator";
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
    expenseType: state.expenseType,
    addExpense: state.addExpense
  };
};

const mapDispatchToProps = dispatch => ({
  editExpense: data => {
    dispatch(editExpenseType(data));
  }
});

class EditExpenseType extends Component {
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
    if (this.props.addExpenseType.edit.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    const id = props.id.id;
    let data = {
      token: token,
      id: id,
      category_name: values.category_name,
      expenseType_name: values.expenseType_name,
      hsn_code: values.hsn_code,
      type: values.type,
      weight: values.weight,
      size: values.size,
      color: values.color,
      sale_rate: values.sale_rate,
      gst_rate: values.gst_rate
    };
    props.editExpenseType(data);
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
                category_name: data
                  ? data.category
                    ? data.category.category_name
                    : ""
                  : "",
                
                // expenseType_type_id: data ? data.expenseType_type_id : "",
                remark: data ? data.remark : "",
                amount: data ? data.amount : "",
            
              }}
              onSubmit={this.handleSubmit}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="category_name">Category Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomSelect}
                          name="category_name"
                          id="category_name"
                          placeholder="Enter ExpenseType Name"
                        >
                          <option hidden>Select Category</option>
                          <option disabled>Select Category</option>
                          {category
                            ? category.map((category, index) => (
                                <option key={index}>
                                  {category.category_name}
                                </option>
                              ))
                            : null}
                        </Field>
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="expenseType_name">ExpenseType Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="remark"
                          id="remark"
                          placeholder="Enter ExpenseType Name"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="amount">HSN Code</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="amount"
                          id="amount"
                          placeholder="Enter ExpenseType Amount"
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
  )(EditExpenseType)
);
