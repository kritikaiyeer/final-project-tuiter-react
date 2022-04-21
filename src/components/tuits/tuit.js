/**
    Component that renders a tuit
*/
import React, {useEffect} from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import {useNavigate, Link, Route, Routes} from "react-router-dom";
import * as service from "../../services/auth-service";
import MyTuits from "../profile/my-tuits";
import ProfileOther from "../profile/profile-other";

const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit}) => {
    let user=null
    useEffect(async () => {

             user = await service.profile();

    }, []);
    const navigate = useNavigate();
    const daysOld = (tuit) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(tuit.postedOn);
        const postedMillis = posted.getTime();
        const oldMillis = nowMillis - postedMillis;
        let old = 0.0;
        const secondsOld = oldMillis/1000.0;
        const minutesOld = secondsOld/60.0;
        const hoursOld = minutesOld/60.0;
        const daysOld = hoursOld/24.0;
        if(daysOld > 1) {
            old = Math.round(daysOld) + 'd';
        } else if(hoursOld > 1) {
            old = Math.round(hoursOld) + 'h';
        } else if(minutesOld > 1) {
            old = Math.round(minutesOld) + 'm';
        } else if(secondsOld > 1) {
            old = Math.round(secondsOld) + 's';
        }
        return old;
    }
  return(
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {
          tuit.postedBy &&
          <img async className="ttr-tuit-avatar-logo rounded-circle"
               src={tuit.postedBy.profilePhoto}/>

        }
      </div>
      <div className="w-100">
          <i onClick={() => {
              if(user._id===tuit.postedBy._id) {
                  deleteTuit(tuit._id)
                  window.location. reload(true);
              }
              else {
                 // window.location. reload(true);
                 alert("You can only delete your Tuits.")

              }

          }} className="fas fa-remove fa-2x fa-pull-right"></i>

          <Link to={`/profile-others`} state={ tuit.postedBy }>
          <i className="float-end fas fa-circle-ellipsis me-1"></i>
          </Link>
        <h2
          className="fs-5">
          {tuit.postedBy && tuit.postedBy.userName}
          @{tuit.postedBy && tuit.postedBy.userName} -
            <span className="ms-1">{daysOld(tuit)}</span></h2>
        {tuit.tuit}
        {
          tuit.youtube &&
            <TuitVideo tuit={tuit}/>
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit}/>
        }
        <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit} />
      </div>

    </li>
  );
}
export default Tuit;