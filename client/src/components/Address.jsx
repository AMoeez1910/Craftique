import React from 'react'

const Address = (props) => {

  return (
    <div className="d-flex flex-column" id="content-wrapper">
  <div id="content">
    <div className="container-fluid">
      <h3 className="text-dark mb-4">Address</h3>
      <div className="card shadow">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-primary m-0 fw-bold">Shipping Address</p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="address">
                        <strong>Address</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="address"
                        placeholder={props.addressData.shippingAddress.address}
                        name="address"
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            <strong>City</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="city"
                            placeholder={props.addressData.shippingAddress.city}
                            name="city"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="country">
                            <strong>Country</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="country"
                            placeholder={props.addressData.shippingAddress.country}
                            name="country"
                          />
                        </div>
                      </div>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-primary m-0 fw-bold">Billing Address</p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="address">
                        <strong>Address</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="address-1"
                        placeholder={props.addressData.billingAddress.address}
                        name="address"
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="city">
                            <strong>City</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="city-1"
                            placeholder={props.addressData.billingAddress.city}
                            name="city"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="country">
                            <strong>Country</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="country-1"
                            placeholder={props.addressData.billingAddress.country}
                            name="country"
                          />
                        </div>
                      </div>
                    </div>
                    
                  </form>
                  
                </div>
              </div>
            </div>
            <div className="mb-3 mt-3">
                      <button className="btn btn-primary btn-sm" type="submit">
                        Save&nbsp;Settings
                      </button>
                    </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Address