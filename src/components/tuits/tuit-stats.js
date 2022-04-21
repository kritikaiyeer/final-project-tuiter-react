/**
    Component of showing statistics of the various tuits like number of replies, retuits,
    likes and dislikes
*/
import React, { useState, useEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import * as service from "../../services/boards-service";
import * as service1 from "../../services/auth-service";




const TuitStats = ({ tuit, likeTuit, dislikeTuit}) => {
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState([]);
  const [selected, setSelected] = useState("");
  const [newBoard, setNewBoard] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };
  const openDialog = async () => {
    const response = await service1.profile()
    if (response._id==tuit.postedBy._id) {
      setShowModal(true);}
      else{
      setShowModal(false);
      alert("You can only add your Tuits to the board.")
    }
  }
  ;

  function handleChange(event) {
    setSelected(event.target.value);
  }

  const addBoard = async () => {
    const response = await service.createBoard(tuit.postedBy._id, newBoard)
    if(response){
      alert("board added")
    } else{
      alert("sorry something went wrong!")
    }
  };


  const handleYes = async () => {
    const response = await service.addTuitToBoard(selected,tuit._id, tuit.postedBy._id)
    if(response){
      alert("Tuit added to selected board")
    } else{
      alert("sorry something went wrong!")
    }
    handleClose()
  }

  useEffect(async () => {
    try {

      const boards = await service.findAllBoardsByUser(tuit.postedBy._id);
      setValues(boards);
    } catch (e) {

    }
  }, []);

  return (
    <div>
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          <span className="ttr-stats-replies">
            {tuit.stats && tuit.stats.replies}
          </span>
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          <span className="ttr-stats-retuits">
            {tuit.stats && tuit.stats.retuits}
          </span>
        </div>
        <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
            {tuit.stats.likes > 0 && <i className="fa-solid fa-thumbs-up"></i>}
            {tuit.stats.likes <= 0 && <i className="fa-light fa-thumbs-up"></i>}
            <span className="ttr-stats-likes">
              {tuit.stats && tuit.stats.likes}
            </span>
          </span>
        </div>
        <div className="col">
          <span
            className="ttr-dislike-tuit-click"
            onClick={() => dislikeTuit(tuit)}
          >
            {tuit.stats.dislikes > 0 && (
              <i className="fa-solid fa-thumbs-down"></i>
            )}
            {tuit.stats.dislikes <= 0 && (
              <i className="fa-light fa-thumbs-down"></i>
            )}
            <span className="ttr-stats-dislikes">
              {tuit.stats && tuit.stats.dislikes}
            </span>
          </span>
        </div>
        <div className="col">
          {
            <i class="fa-light fa-thumbtack" onClick={openDialog}></i>
          }
        </div>
      </div>
      <Dialog open ={showModal} onClose={handleClose}>
        <DialogTitle>Choose one of the following boards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="row">
              <input
                type="text"
                name="board"
                onChange={(e) => setNewBoard(e.target.value)}
              />
              <button onClick={addBoard}>add board</button>;
            </div>
            <FormControl>
              <InputLabel htmlFor="agent-simple">Agent</InputLabel>
              <Select
                value={selected}
                onChange={handleChange}
                inputProps={{
                  name: "Boards",
                  id: "age-simple",
                }}
              >
                {values.map((value, index) => {
                  return <MenuItem value={value._id}>{value.boardName}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default TuitStats;
