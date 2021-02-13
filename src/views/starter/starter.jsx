import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Top from "./top";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCount,
  getDaily,
  getItemwise
} from "../../redux/Creators/DashCreators";
import { SalesSummary, PieChart } from "components/dashboard-components";

const mapStateToProps = state => {
  return {
    login: state.login,
    dashboard: state.dashboard
  };
};

const mapDispatchToProps = dispatch => ({
  getCount: data => {
    dispatch(getCount(data));
  },
  getDaily: data => {
    dispatch(getDaily(data));
  },
  getItemwise: data => {
    dispatch(getItemwise(data));
  }
});

class Starter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchCount();
    this.fetchDaily();
    this.fetchItemwise();
  }

  async fetchCount() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    await this.props.getCount(data);
  }

  async fetchItemwise() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    await this.props.getItemwise(data);
  }

  async fetchDaily() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    await this.props.getDaily(data);
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Top {...this.props} />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <Export />
          </Col>
        </Row> */}
        <Row>
          <Col>
            <SalesSummary {...this.props} />
          </Col>
        </Row>
        <Row>
          {/* <Col>
            <PieChart {...this.props} />
          </Col> */}
        </Row>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Starter)
);
