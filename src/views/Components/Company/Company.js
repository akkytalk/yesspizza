import React, { Component } from "react";
import AddCompany from "./AddCompany";
import EditCompany from "./EditCompany";
//import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCompanyPage,
  deleteCompany,
  removeCompany
} from "../../../redux/Creators/CompanyCreators";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    company: state.company,
    addCompany: state.addCompany
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanyPage: data => {
    dispatch(getCompanyPage(data));
  },
  deleteCompany: data => {
    dispatch(deleteCompany(data));
  },
  removeCompany: data => {
    dispatch(removeCompany(data));
  }
});

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      id: null,
      page: 0,
      pageSize: 10,
      filtered: []
    };
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

    await this.props.getCompanyPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeCompany(data);
  }

  componentDidUpdate() {
    if (this.props.addCompany.company.length > 0) {
      this.props.deleteCompany("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addCompany.delete.length > 0) {
      this.props.deleteCompany("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addCompany.edit.length > 0) {
      this.props.deleteCompany("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    let columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Company Name",
            accessor: "company_name" // String-based value accessors!
          },
          {
            Header: "Company Address",
            accessor: "address" // String-based value accessors!
          },
          {
            Header: "Company City",
            accessor: "city" // String-based value accessors!
          }
        ]
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Edit",
            maxWidth: 60,
            Cell: ({ row }) => (
              <Container>
                <Row>
                  <Col><EditCompany id={row._original} /></Col>
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

    return (
      <Card>
        <CardHeader className="bg-primary text-white">
          <i className="far fa-sticky-note" /> <strong>Company</strong>
          <AddCompany />
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.company.isLoading}
            data={this.props.company.company.data}
            pages={this.props.company.company.last_page}
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
  connect(mapStateToProps, mapDispatchToProps)(Company)
);
