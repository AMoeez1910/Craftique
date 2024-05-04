import React, { useState } from 'react'

const Orders = (props) => {
  return (
    <div className="d-flex flex-column" id="content-wrapper">
  <div id="content">
    <div className="container-fluid">
      <h3 className="text-dark mb-4">Orders</h3>
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Order Info</p>
        </div>
        <div className="card-body">
          <div
            className="table-responsive table mt-2"
            id="dataTable"
            role="grid"
            aria-describedby="dataTable_info"
          >
            <table className="table my-0" id="dataTable">
              <thead>
                <tr>
                  <th>OrderID</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {props.orderData.map((data, idx) => (
                      <tr key={idx}> {/* Added key attribute to the <tr> */}
                        <td>{idx}</td>
                        <td>{data.Status}</td>
                        <td>{new Date(data.Date).toISOString().split('T')[0]} at {data.Time}</td>
                        <td>
                          {data.Price}
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            type="button"
                            style={{ marginTop: "-6px" }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}

                  
              </tbody>
              <tfoot>
                <tr />
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Orders