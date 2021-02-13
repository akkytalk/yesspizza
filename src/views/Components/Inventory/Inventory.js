import React, { Component } from 'react'
import { Card, CardHeader, CardBody, Table } from "reactstrap";

class Inventory extends Component {
    render() {
        return (
            <Card>
        <CardHeader className="bg-primary text-white">
          <i className="fas fa-box" /> <strong>Inventory</strong>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Kellogs</td>
                <td>Cereals</td>
                <td>89</td>
                <td>250</td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Thums Up</td>
                <td>Cold Drink</td>
                <td>250</td>
                <td>35</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
        )
    }
}

export default Inventory;