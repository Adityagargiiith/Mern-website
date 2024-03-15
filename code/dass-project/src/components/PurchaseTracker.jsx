import React from "react";

export default function PurchaseTracker() {
  return (
    <>
      <p></p>
      <hr></hr>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Item Name</th>
            <th scope="col">Purchase Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Nuts & Bolts</td>
            <td>26</td>
            <td class="table-warning">Pending</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Spray Paints</td>
            <td>23</td>
            <td class="table-success">Arrived</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>dog</td>
            <td>13</td>
            <td class="table-success">Arrived</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
