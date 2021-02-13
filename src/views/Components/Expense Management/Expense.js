import React, { Component } from "react";
// import AddProduct from "../Product/AddProduct";
import EditProduct from "../Product/EditProduct";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getExpensePage,
  getExpense,
  postExpense
} from "../../../redux/Creators/ExpenseCreators";
import { getCategory } from "../../../redux/Creators/CategoryCreators";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Container,
  Button
} from "reactstrap";
import AddExpense from "./AddExpense";

const mapStateToProps = state => {
  return {
    login: state.login,
    product: state.product,
    category: state.category,
    addProduct: state.addProduct
  };
};

const mapDispatchToProps = dispatch => ({
  getExpensePage: data => {
    dispatch(getExpensePage(data));
  },
  getCategory: data => {
    dispatch(getCategory(data));
  },
  getExpense: data => {
    dispatch(getExpense(data));
  },
  // removeProduct: data => {
  //   dispatch(removeProduct(data));
  // }
  postExpense: data => {
    dispatch(postExpense(data));
  }
});

class Expense extends Component {
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

  componentDidMount() {
    this.fetchCategory();
  }

  fetchCategory() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getCategory(data);
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

    await this.props.getProductPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.postExpense(data);
  }

  componentDidUpdate() {
    if (this.props.addProduct.product.length > 0) {
      this.props.deleteProduct("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addProduct.delete.length > 0) {
      this.props.deleteProduct("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addProduct.edit.length > 0) {
      this.props.deleteProduct("");
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
              Header: "Product Name",
              accessor: "product_name"
            },
            {
              Header: "Category Name",
              accessor: "category.category_name"
            },
            {
              Header: "Sale Rate",
              accessor: "sale_rate"
            },
            {
              Header: "Type",
              accessor: "type"
            },
            {
              Header: "Weight",
              accessor: "weight"
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
              Header: "Product Name",
              accessor: "product_name"
            },
            {
              Header: "Category Name",
              accessor: "category.category_name"
            },
            {
              Header: "Sale Rate",
              accessor: "sale_rate"
            },
            {
              Header: "Type",
              accessor: "type"
            },
            {
              Header: "Weight",
              accessor: "weight"
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
                      <EditProduct
                        id={row._original}
                        categorydata={this.props.category.categoryid}
                      />
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
          <i className="fas fa-rupee-sign" /> <strong>Expense Mangement</strong>
          {
            this.props.login.login.user.type === "company" && this.props.login.login.user.role === "admin" ? 
            <AddExpense categorydata={this.props.category.categoryid} />
             : null
          }
          <a></a>
        </CardHeader>
        
       
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.product.isLoading}
            data={this.props.product.product.data}
            pages={this.props.product.product.last_page}
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
  connect(mapStateToProps, mapDispatchToProps)(Expense)
);
