import React, { Component } from "react";

// import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getExpenseTypePage,
  getExpenseType,
  postExpenseType
} from "../../../../redux/Creators/ExpenseTypeCreator";
 
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col, 
  Container,
  Button
} from "reactstrap";

import { getCategory } from "../../../../redux/Creators/CategoryCreators";
import AddExpenseType from "./AddExpenseType";
import EditExpenseType from "./EditExpenseType";

const mapStateToProps = state => {
  return {
    login: state.login,
    expenseType: state.expenseType,
    category: state.category,
    addExpenseType: state.addExpenseType
  };
};

const mapDispatchToProps = dispatch => ({
  getExpenseTypePage: data => {
    dispatch(getExpenseTypePage(data));
  },
  getCategory: data => {
    dispatch(getCategory(data));
  },
  getExpenseType: data => {
    dispatch(getExpenseType(data));
  },
  // removeExpenseType: data => {
  //   dispatch(removeExpenseType(data));
  // }
  postExpenseType: data => {
    dispatch(postExpenseType(data));
  }
});

class ExpenseType extends Component {
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
    console.log("expenseType data", this.props.expenseType)
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

    await this.props.getExpenseTypePage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.postExpenseType(data);
  }

  componentDidUpdate() {
    if (this.props.addExpenseType.expenseType.length > 0) {
      this.props.deleteExpenseType("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addExpenseType.delete.length > 0) {
      this.props.deleteExpenseType("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addExpenseType.edit.length > 0) {
      this.props.deleteExpenseType("");
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
            
            // {
            //   Header: "Expense type",
            //   accessor: "expenseType_type.name"
            // },
            // {
            //   Header: "Expense Name",
            //   accessor: "remark"
            // },
            {
              Header: "Expense Type",
              accessor: "name"
            }
          ]
        }
      ];
    } else {
      columns = [
        {
          Header: "Data",
          columns: [
            // {
            //   Header: "Expense type",
            //   accessor: "expenseType_type.name"
            // },
            // {
            //   Header: "Expense Name",
            //   accessor: "remark"
            // },
      
            {
              Header: "Expense Type",
              accessor: "name"
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
                      <EditExpenseType
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
          <i className="fas fa-rupee-sign" /> <strong>Expense Type</strong>
          {
            this.props.login.login.user.type === "company" && this.props.login.login.user.role === "admin" ? 
            <AddExpenseType categorydata={this.props.category.categoryid} />
             : null
          }
          <a></a>
        </CardHeader>
        
       
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.expenseType.isLoading}
            // data={this.props.expenseType.expenseType.data}
            // pages={this.props.expenseType.expenseType.last_page}
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

export default withRouter( connect(mapStateToProps, mapDispatchToProps )(ExpenseType));
