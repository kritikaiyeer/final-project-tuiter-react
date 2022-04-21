/**
 Component of showing the tuits that the logged in user has tuited
 */

import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits/index";
import {useLocation, useNavigate} from "react-router-dom";

const OtherTuits = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)


    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitByUser(location.state._id)
            .then(tuits => setTuits(tuits));
    useEffect(findMyTuits, []);
    return(
        <Tuits tuits={tuits}
               refreshTuits={findMyTuits}/>
    );
};

export default OtherTuits;