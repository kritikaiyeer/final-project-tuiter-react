/**
 * Component showing boards page of user when they are logged in
 */
import React, {useState, useEffect} from "react";
import {findAllBoardsByUser, findAllTuitsFromBoard} from "../../services/boards-service";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Carousel from "react-multi-carousel";
import Tuit from "../tuits/tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";
import {useLocation, useNavigate} from "react-router-dom";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 60
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30
    }
};



const OtherBoards = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const profile = location.state;
    const [boards, setBoards] = useState([]);
    const [tuitBoards, setTuitBoards] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        try {
            const boards = await findAllBoardsByUser(profile._id);
            setBoards(boards);
        } catch (e) {

        }
    }, []);

    const [modal, showModal] = useState(false);

    const handleClose = () => {
        showModal(false);
    };

    const showTuitCarousel = async(bid) => {
        const tuitBoards = await findAllTuitsFromBoard(bid);
        setTuitBoards(tuitBoards);
        showModal(true);
    };

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
                        {tuitBoards.map(tuitBoard => {
                            return (

                                <p> {tuitBoard.tuit.tuit}</p>
                            )
                        })
                        }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default OtherBoards;



