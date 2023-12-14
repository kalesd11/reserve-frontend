import React from "react";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="container my-4">
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#1c2331" }}
        >
          <section className="d-flex justify-content-between p-4 bg-warning">
            <div className="me-5">
              <span>
                <b>Get connected with RESERVE on social networks:</b>
              </span>
            </div>

            <div>
              <Link to="/" className="text-primary me-4">
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
              <Link to="/" className="text-danger me-4">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>{" "}
              <Link to="/" className="text-success me-4">
                <FontAwesomeIcon icon={faWhatsapp} />
              </Link>{" "}
              <Link to="/" className="text-primary me-4">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold text-warning">
                    R E S E R V E
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  {/* <p>
                    “The journey of a thousand miles begins with one step.” -
                    Lao Tzu
                  </p>
                  <p>
                    “The world is a book, and those who do not travel read only
                    a page.” - Saint Augustine
                  </p> */}
                  {/* <p>
                    “The best way to predict the future is to create it.” -
                    Abraham Lincoln{" "}
                  </p> */}
                  <p>
                    “Life is a journey, and if you fall in love with the
                    journey, you will be in love forever.” - Peter Hagerty{" "}
                  </p>
                  {/* <p>
                    “The road to success is always under construction.” - Lily
                    Tomlin
                  </p> */}
                </div>
                {/* 
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Products</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: " #7c4dff ",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="/" className="text-white">
                      MDBootstrap
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-white">
                      MDWordPress
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-white">
                      BrandFlow
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-white">
                      Bootstrap Angular
                    </a>
                  </p>
                </div> */}

                {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: " 60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="/" className="text-white">
                      Your Account
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-white">
                      Become an Affiliate
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-white">
                      Shipping Rates
                    </a>
                  </p>
                  <p>
                    <a href="/" className="text-white">
                      Help
                    </a>
                  </p>
                </div> */}

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <i className="fas fa-home mr-3"></i> India, Maharashtra,
                    Ahmadnagar
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3"></i>{" "}
                    surajkales@outlook.com
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3"></i> + 01 234 567 88
                  </p>
                  <p>
                    <i className="fas fa-print mr-3"></i> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2020 Copyright :{" "}
            <a className="text-white" href="https://mdbootstrap.com/">
              Dreamers.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
