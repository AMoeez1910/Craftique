import React from 'react'
import error from '../assets/404.png'

const NotFound = () => {
  return (
    <section className="py-5 mt-5">
      <div className="container">
        <div className="row row-cols-1 d-flex justify-content-center align-items-center">
          <div className="col-md-10 text-center">
            <img className="img-fluid w-50" src={error} />
          </div>
          <div className="col text-center">
            <h2 className="display-4 fw-bold mb-4">Page Not Found</h2>
            <p className="fs-4 text-muted">
              Page not found. Looks like it pulled a disappearing act. We're on
              it, but in the meantime, consider it our website's way of playing
              hide and seek!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound
