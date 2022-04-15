/**
    Component of showing profile page of the user when it is logged in
*/
import React, { useState, useEffect } from "react";
import * as service from "../../services/admin-service";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const Dashboard = () => {
  const uppercase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const [allusers, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tuits, setTuits] = useState(true);
  const [likes, setLikes] = useState(true);
  const [signIn, setsignIn] = useState(true);
  const [user, setUser] = useState(null);

  const handleClose = () => {
    setShowModal(false);
  };

  const toggleTuits = () => {
    setTuits((prev) => !prev);
    if(tuits){
      revokeAccess(user,"allowTuits")
    }else{
      giveAccess(user,"allowTuits")
    }
  };

  const toggleLikes = () => {
    setLikes((prev) => !prev);
    if(tuits){
      revokeAccess(user,"allowLikes")
    }else{
      giveAccess(user,"allowLikes")
    }
  };

  const toggleSignIn = () => {
    setsignIn((prev) => !prev);
    if(tuits){
      revokeAccess(user,"allowSignIn")
    }else{
      giveAccess(user,"allowSignIn")
    }
  };

  const openDialog = (data) => {
    console.log({data})
    setUser(data._id)
    setShowModal(true)
  }

  const revokeAccess = (uid,privilege) => {
    service.setPrivelageRevokeAccess(uid,privilege)
  }

  const giveAccess = (uid,privilege) => {
    service.setPrivelageAccess(uid,privilege)
  }


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
                <a onClick={() => openDialog(data)}>
                  <div className="card">
                    <div className="card-body">
                      <div className="avatar">
                        <img
                          src={data.profilePhoto}
                          className="card-img-top"
                          alt=""
                        />
                      </div>
                      <h5 className="card-title">{uppercase(data.userName)}</h5>
                      <p className="card-text">
                        {"ACCOUNT TYPE:" + " " + uppercase(data.accountType)}
                        <br />
                        <span className="phone">{data.email}</span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>Choose one of the following</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={tuits}
                    onChange={toggleTuits}
                  />
                }
                label="Allow Tuits"
              />
              <FormControlLabel
                control={<Switch checked={likes} onChange={toggleLikes} />}
                label="Allow Likes"
              />
              <FormControlLabel
                control={<Switch checked={signIn} onChange={toggleSignIn} />}
                label="Allow Sign In"
              />
            </FormGroup>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Dashboard;
