import React, { Component } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCategoryPage,
  deleteCategory,
  removeCategory
} from "../../../redux/Creators/CategoryCreators";
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
    category: state.category,
    addCategory: state.addCategory
  };
};

const mapDispatchToProps = dispatch => ({
  getCategoryPage: data => {
    dispatch(getCategoryPage(data));
  },
  deleteCategory: data => {
    dispatch(deleteCategory(data));
  },
  removeCategory: data => {
    dispatch(removeCategory(data));
  }
});

class Category extends Component {
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

    await this.props.getCategoryPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeCategory(data);
  }

  componentDidUpdate() {
    if (this.props.addCategory.category.length > 0) {
      this.props.deleteCategory("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addCategory.delete.length > 0) {
      this.props.deleteCategory("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addCategory.edit.length > 0) {
      this.props.deleteCategory("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    let columns = [];
    if (
      this.props.login.login.user.type === "company" &&
      this.props.login.login.user.role === "audit"
    ) {
      columns = [
        {
          Header: "Data",
          columns: [
            {
              Header: "Category Name",
              accessor: "category_name" // String-based value accessors!
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
              Header: "Category Name",
              accessor: "category_name" // String-based value accessors!
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
                    <Col>
                      <EditCategory id={row._original} />
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
    }

    return (
      <Card>
        <CardHeader className="bg-primary text-white">
          <i className="far fa-sticky-note" /> <strong>Category</strong>
          {this.props.login.login.user.type === "company" &&
          this.props.login.login.user.role === "admin" ? (
            <AddCategory />
          ) : null}
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.category.isLoading}
            data={this.props.category.category.data}
            pages={this.props.category.category.last_page}
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
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
