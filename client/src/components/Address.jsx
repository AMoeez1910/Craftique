import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Address = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    shippingAddress:'',
    shippingCity:'',
    shippingCountry:'',
    billingAddress:'',
    billingCity:'',
    billingCountry:'',
  });

  useEffect(() => {
    setData(
      {
    shippingAddress:props.addressData.shippingAddress.address,
    shippingCity:props.addressData.shippingAddress.city,
    shippingCountry:props.addressData.shippingAddress.country,
    billingAddress:props.addressData.billingAddress.address,
    billingCity:props.addressData.billingAddress.city,
    billingCountry:props.addressData.billingAddress.country
  });
}, [props]);


  const handleSubmit = async (e) => {
    // backend logic implement
    
    e.preventDefault();
    try {
        const response = await axios.patch(`/update-user-address/${props.id}`,{data})
        if(response.data.success)
          {
            toast.success(response.data.success);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
          else{
            toast.error(response.data.error);
          }
        console.log(data)
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevVal => ({ ...prevVal, [name]: value }));
  };

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
                        name="shippingAddress"
                        value={data.shippingAddress}
                        onChange={handleChange}
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
                            name="shippingCity"
                            value={data.shippingCity}
                            onChange={handleChange}
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
                            name="shippingCountry"
                            value={data.shippingCountry}
                            onChange={handleChange}
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
                        name="billingAddress"
                        value={data.billingAddress}
                        onChange={handleChange}
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
                            name="billingCity"
                            value={data.billingCity}
                            onChange={handleChange}
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
                            name="billingCountry"
                            value={data.billingCountry}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                  </form>
                  
                </div>
              </div>
            </div>
            <div className="mb-3 mt-3">
                      <button className="btn btn-primary btn-sm" type="submit" onClick={handleSubmit}>
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