import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../../Custom/CustomInput";
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
  InputGroupText,
} from "reactstrap";

const mapStateToProps = (state) => {
  return {
    login: state.login,
    expenseType: state.expenseType,
    addExpenseType: state.addExpenseType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editExpenseType: (data) => {
    dispatch(editExpenseType(data));
  },
});

class EditExpenseType extends Component {
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
    if (this.props.addExpenseType.edit.length > 0) {
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
      name: values.name,
    };

    console.log("data", data);
    props.editExpenseType(data);
    setSubmitting(false);
    return;
  };

  render() {
    const data = this.props.id;
    return (
      <React.Fragment>
        <Button size="sm" className="btn-info pull-right" onClick={this.toggle}>
          <i className="fa fa-pencil-alt" />
        </Button>
        <Modal
          className="modal-info"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Edit ExpenseType</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: data ? data.name : null,
              }}
              onSubmit={this.handleSubmit}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col>
                      <Label for="name">ExpenseType Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter ExpenseType Name"
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
  connect(mapStateToProps, mapDispatchToProps)(EditExpenseType)
);
