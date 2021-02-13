import React, { Component } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import CustomInput from "../Custom/CustomInput";
import * as Yup from "yup";
import { postClient } from "../../../redux/Creators/ClientCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Button,
  Table,
  InputGroup,
  InputGroupAddon,
  Label,
  InputGroupText
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    client: state.client,
    addClient: state.addClient
  };
};

const mapDispatchToProps = dispatch => ({
  postClient: data => {
    dispatch(postClient(data));
  }
});

class AddCategory extends Component {
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
    if (this.props.addClient.client.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      client_name: values.client_name,
      client_address: values.client_address,
      city: values.city,
      zipcode: values.zipcode,
      state: values.state,
      discount: values.discount,
      client_contact: values.client_contact
    };
    props.postClient(data);
    setSubmitting(false);
    return;
  };

  render() {
    const client = this.props.client.clientid;
    const productdata = this.props.product.productid;
    return (
      <React.Fragment>
        <Button className="btn-success pull-right" onClick={this.toggle}>
          Add Client
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Client</ModalHeader>
          <ModalBody>
          
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddCategory)
);
