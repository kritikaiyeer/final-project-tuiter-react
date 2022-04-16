/** 
 * Component showing boards page of user when they are logged in
 */
 import React, {useState, useEffect} from "react";
 import {findAllBoardsByUser} from "../../services/boards-service";
 import * as service from "../../services/auth-service";
 import DialogActions from "@material-ui/core/DialogActions";
 import DialogContent from "@material-ui/core/DialogContent";
 import DialogTitle from "@material-ui/core/DialogTitle";
 import DialogContentText from "@material-ui/core/DialogContentText";
 import Dialog from "@material-ui/core/Dialog";
 import Button from "@material-ui/core/Button";
 import Switch from '@material-ui/core/Switch';
 import FormGroup from '@material-ui/core/FormGroup';
 import FormControlLabel from '@material-ui/core/FormControlLabel';
 
 const MyBoards = (profile) => {
     const [boards, setBoards] = useState([]);
     
     // eslint-disable-next-line react-hooks/exhaustive-deps
     useEffect(async () => {
         try {
           const boards = await findAllBoardsByUser(profile.profile._id);
           setBoards(boards);
         } catch (e) {
         
         }
       }, []);
       
     const [modal, showModal] = useState(false);
     const [tuitBoards, setTuitBoards] = useState([]);
     const handleClose = () => {
        showModal(false);
      };

     const showTuitCarousel = (bid) => {showModal(true)};
     console.log(boards);
     return (
           <div>
           <div>
             {
               boards.map(board => {
                 return (
                   <p onClick={() => showTuitCarousel(board._id)}> 

                     {board.boardName}
                   </p>
                 )
               })
             }
           </div>
           <Dialog open={modal} onClose={handleClose}>
           <DialogTitle>Tuiter Boards</DialogTitle>
           <DialogContent>
             <DialogContentText>
               
             </DialogContentText>
           </DialogContent>
           
         </Dialog>
         </div>
         );
    };
    export default MyBoards;

       
 
