import React, { Component } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProductPage,
  deleteProduct,
  removeProduct
} from "../../../redux/Creators/ProductCreators";
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

const mapStateToProps = state => {
  return {
    login: state.login,
    product: state.product,
    category: state.category,
    addProduct: state.addProduct
  };
};

const mapDispatchToProps = dispatch => ({
  getProductPage: data => {
    dispatch(getProductPage(data));
  },
  getCategory: data => {
    dispatch(getCategory(data));
  },
  deleteProduct: data => {
    dispatch(deleteProduct(data));
  },
  removeProduct: data => {
    dispatch(removeProduct(data));
  }
});

class Product extends Component {
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
    console.log("product data", this.props.product)
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
    await this.props.removeProduct(data);
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
          <i className="fas fa-box" /> <strong>Product</strong>
          {
            this.props.login.login.user.type === "company" && this.props.login.login.user.role === "admin" ? 
            <AddProduct categorydata={this.props.category.categoryid} />
              : null
          } 
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
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
