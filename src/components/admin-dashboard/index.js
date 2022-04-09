/**
    Component of showing profile page of the user when it is logged in
*/
import React, { useState, useEffect } from "react";
import * as service from "../../services/admin-service";

const Dashboard = () => {
  const uppercase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const [allusers, setAllUsers] = useState([]);
  const findAllUsers = () =>
    service.findAllUsers("me").then((users) => setAllUsers(users));
  useEffect(findAllUsers, []);
  
  return (
    <div className="app-card">
    <div className="container">
      <header className="clearfix mt-4">
        <h2>Admin Controls</h2>
      </header>
      <div className="cards-outer">
        <div className="column">
          {allusers.map((data) => (
            <div className="col-md-4 animated fadeIn" key={data._id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
                      src={data.profilePhoto}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                  <h5 className="card-title">
                    {uppercase(data.userName)}
                  </h5>
                  <p className="card-text">
                    {"ACCOUNT TYPE:" + " " + uppercase(data.accountType)}
                    <br />
                    <span className="phone">{data.email}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};
export default Dashboard;
