// EmailVerify.jsx
import { useEffect, useState, Fragment } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";

const TIMEOUT = 10000; // Timeout in milliseconds (e.g., 10 seconds)

const EmailVerify = () => {
  const { id, expirationTimestamp } = useParams();
  const [validUrl, VerifyUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`/verify/${id}/${expirationTimestamp}`, { timeout: TIMEOUT });
        if (data) {
          VerifyUrl(true);
        }
        else{
          setLoading(false)
        }
      } catch (error) {
        VerifyUrl(false);
      } finally {
        setLoading(false); 
      }
    };

    verifyEmail();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div className="text-center ">
      <div className="loading-spinner"></div>
  </div>
      ) : validUrl ? (
        <section className="py-5 mt-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2 className="display-6 fw-bold mb-4">Email Verified</h2>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-md-6">
                <div>
                  <form className="p-3 p-xl-4" method="post" data-bs-theme="light">
                    <div>
                      <Link to="/login">
                        <button
                          className="btn btn-primary shadow d-block w-100"
                          type="submit"
                        >
                          Login
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/error" replace={true} />
      )}
    </Fragment>
  );
};

export default EmailVerify;
