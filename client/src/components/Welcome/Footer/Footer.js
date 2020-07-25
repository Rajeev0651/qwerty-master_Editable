import React from "react";
import "./Footer.css";
const Footer = () => (
  <div className="container-fluid">
    <section style={{ height: "0px" }}></section>
    <div className="row" style={{ textAlign: "center" }}></div>
    <footer className="footer-bs">
      <div className="row">
        <div className="col-md-3 footer-brand animated fadeInLeft">
          <h2>Logo</h2>
          <p>Online disscussing Real Time Public gathering Platform</p>
          <p>© 2020 Copyright, All rights reserved</p>
        </div>
        <div className="col-md-4 footer-nav animated fadeInUp">
          <div className="col-md-6">
            <ul className="list">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contacts</a>
              </li>
              <li>
                <a href="#">Terms & Condition</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-2 footer-social animated fadeInDown">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
        <div className="col-md-3 footer-ns animated fadeInRight">
          <h4>FeedBack</h4>
          
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="write here..."
              ></input>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <span className="glyphicon glyphicon-envelope"></span>
                </button>
              </span>
            </div>
          
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
