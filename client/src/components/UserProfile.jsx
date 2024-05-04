import React from 'react'

const UserProfile = (props) => {
  return (
    <div className="d-flex flex-column " id="content-wrapper">
  <div id="content">
    <div className="container-fluid">
      <h3 className="text-dark mb-4">Profile</h3>
      <div className="row mb-3">
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-body text-center shadow">
              <img
                className="rounded-circle mb-3 mt-4"
                src="assets/img/dogs/image2.jpeg"
                width={160}
                height={160}
              />
              <div className="mb-3">
                <button className="btn btn-primary btn-sm" type="button">
                  Change Photo
                </button>
              </div>
            </div>
          </div>
          <div className="card shadow mb-4" />
        </div>
        <div className="col-lg-8">
          
          <div className="row">
            <div className="col">
              <div className="card shadow mb-3">
                <div className="card-header py-3">
                  <p className="text-primary m-0 fw-bold">User Settings</p>
                </div>
                <div className="card-body">
                  <form>
                    {!!props.googleID ? (
                        <>
                        <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="email">
                            <strong>Email Address</strong>
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            id="email"
                            placeholder={props.email}
                            name="email"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="first_name">
                            <strong>First Name</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="first_name"
                            placeholder={props.FirstName}
                            name="first_name"
                            disabled
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="first_name">
                            <strong>New Password</strong>
                          </label>
                          <input className="form-control" type="password" 
                            disabled />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="last_name">
                            <strong>Last Name</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="last_name"
                            placeholder={props.LastName}
                            name="last_name"
                            disabled
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="last_name">
                            <strong>Confirm Password</strong>
                          </label>
                          <input className="form-control" type="password" 
                            disabled />
                        </div>
                      </div>
                    </div>
                        </>
                    ):(<>
                        <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="email">
                            <strong>Email Address</strong>
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            id="email"
                            placeholder={props.email}
                            name="email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="first_name">
                            <strong>First Name</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="first_name"
                            placeholder={props.FirstName}
                            name="first_name"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="first_name">
                            <strong>New Password</strong>
                          </label>
                          <input className="form-control" type="password" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="last_name">
                            <strong>Last Name</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="last_name"
                            placeholder={props.LastName}
                            name="last_name"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="last_name">
                            <strong>Confirm Password</strong>
                          </label>
                          <input className="form-control" type="password" />
                        </div>
                      </div>
                    </div>
                        </>
                        
                    )}
                    <div className="mb-3">
                      <button className="btn btn-primary btn-sm" type="submit">
                        Save Settings
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default UserProfile