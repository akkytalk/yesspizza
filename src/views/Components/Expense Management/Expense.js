import React, { Component } from "react";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import ReactTable from "react-table";
import "react-table/react-table.css";
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
import {
  getExpenseTypePage,

} from "../../../redux/Creators/ExpenseTypeCreator";

const mapStateToProps = state => {
  return {
    login: state.login,
    expense: state.expense,
    category: state.category,
    addExpense: state.addExpense,
    expenseType: state.expenseType,
  };
};

const mapDispatchToProps = dispatch => ({

  getExpenseTypePage: data => {
    dispatch(getExpenseTypePage(data));
  },
  getExpensePage: data => {
    dispatch(getExpensePage(data));
  },
  getCategory: data => {
    dispatch(getCategory(data));
  },
  getExpense: data => {
    dispatch(getExpense(data));
  },
  // removeExpense: data => {
  //   dispatch(removeExpense(data));
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
    console.log("expense data", this.props.expense)
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

    await this.props.getExpensePage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.postExpense(data);
  }

  componentDidUpdate() {
    if (this.props.addExpense.expense.length > 0) {
      this.props.deleteExpense("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addExpense.delete.length > 0) {
      this.props.deleteExpense("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addExpense.edit.length > 0) {
      this.props.deleteExpense("");
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
              Header: "Expense type",
              accessor: "expense_type.name"
            },
            {
              Header: "Expense Name",
              accessor: "remark"
            },
            {
              Header: "Amount",
              accessor: "amount"
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
              Header: "Expense type",
              accessor: "expense_type.name"
            },
            {
              Header: "Expense Name",
              accessor: "remark"
            },

            {
              Header: "Amount",
              accessor: "amount"
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
                      <EditExpense
                        id={row._original}
                        categorydata={this.props.expenseType.expenseType.data}
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

    console.log("expense management", this.props.expense.expense)
    console.log("expense type", this.props.expenseType.expenseType.data)

    return (
      <Card>
        <CardHeader className="bg-primary text-white">
          <i className="fas fa-rupee-sign" /> <strong>Expense Mangement</strong>
          {
            this.props.login.login.user.type === "company" && this.props.login.login.user.role === "admin" ?
              <AddExpense categorydata={this.props.expenseType.expenseType.data} />
              : null
          }
          <a></a>
        </CardHeader>


        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.expense.isLoading}
            data={this.props.expense.expense.data}
            pages={this.props.expense.expense.last_page}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Expense));
