import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrintBill from "./PrintBill";
import {
  getBillingPage,
  removeBilling,
  deleteBilling
} from "../../../redux/Creators/BillingCreators";
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  Container,
  CardHeader
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    billing: state.billing,
    addBilling: state.addBilling
  };
};

const mapDispatchToProps = dispatch => ({
  getBillingPage: data => {
    dispatch(getBillingPage(data));
  },
  deleteBilling: data => {
    dispatch(deleteBilling(data));
  },
  removeBilling: data => {
    dispatch(removeBilling(data));
  }
});

class BillHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async fetchData(state, instance) {
    const token = this.props.login.login.access_token;
    let pageno = state.page + 1;
    let pageSize = 10;

    if (state.pageSize) {
      pageSize = state.pageSize;
    }
    let data = {
      pageno: pageno,
      pageSize: pageSize,
      token: token
    };
    await this.props.getBillingPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeBilling(data);
  }

  componentDidUpdate() {
    if (this.props.addBilling.billing.length > 0) {
      this.props.deleteBilling("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addBilling.delete.length > 0) {
      this.props.deleteBilling("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addBilling.edit.length > 0) {
      this.props.deleteBilling("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    let columns = [];

    if (
      this.props.login.login.user.type === "company" &&
      this.props.login.login.user.role === "admin"
    ){
      columns = [
        {
          Header: "Data",
          columns: [
            {
              Header: "Invoice No",
              accessor: "invoice_no"
            },
            {
              Header: "Invoice Date",
              accessor: "invoice_date"
            },
            {
              Header: "Payment Mode",
              accessor: "mode_of_payment"
            },
            {
              Header: "Total Amount",
              accessor: "total_tax_amount"
            }
          ]
        },
        {
          Header: "Action",
          columns: [
            {
              Header: "Print",
              maxWidth: 60,
              Cell: ({ row }) => (
                <Container>
                  <Row>
                    <Col>
                      <PrintBill id={row._original} />
                    </Col>
                  </Row>
                </Container>
              )
            },
            {
              Header: "Delete",
              maxWidth: 60,
              Cell: ({ row }) => (
                <Container>
                  <Row>
                    <Col>
                      <Button
                        color="danger"
                        size="sm"
                        id="delete"
                        onClick={e => this.handleDelete(row._original, e)}
                      >
                        <i className="fas fa-ban" />
                      </Button>
                    </Col>
                  </Row>
                </Container>
              )
            }
          ]
        }
      ];
    } else {
      columns = [
        {
          Header: "Data",
          columns: [
            {
              Header: "Invoice No",
              accessor: "invoice_no"
            },
            {
              Header: "Invoice Date",
              accessor: "invoice_date"
            },
            {
              Header: "Payment Mode",
              accessor: "mode_of_payment"
            },
            {
              Header: "Total Amount",
              accessor: "total_tax_amount"
            }
          ]
        },
        {
          Header: "Action",
          columns: [
            {
              Header: "Print",
              maxWidth: 60,
              Cell: ({ row }) => (
                <Container>
                  <Row>
                    <Col>
                      <PrintBill id={row._original} />
                    </Col>
                  </Row>
                </Container>
              )
            }
          ]
        }
      ];
    }

    return (
      <Card>
        <CardHeader className="bg-primary text-white">
          <i className="fas fa-box" /> <strong>Order</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.billing.isLoading}
            data={this.props.billing.billing.data}
            pages={this.props.billing.billing.last_page}
            onFetchData={(state, instance) => this.fetchData(state, instance)}
            defaultPageSize={10}
            // filterable
            className="-highlight"
            page={this.state.page}
            pageSize={this.state.pageSize}
            filtered={this.state.filtered}
            // Callbacks
            onPageChange={page => this.setState({ page })}
            onPageSizeChange={(pageSize, page) =>
              this.setState({ page, pageSize })
            }
          />
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BillHistory)
);