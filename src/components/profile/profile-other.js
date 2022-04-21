/**
 Component of showing profile page of the user when it is logged in
 */
import React, {useEffect, useState} from "react";
import MyTuits from "./my-tuits";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/auth-service";
import TuitsAndReplies from "./tuits-and-replies";
import Media from "./media";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";
import MyBoards from "./my-boards";
import Dashboard from "../admin-dashboard";
import OtherTuits from "./other-tuits";
import OtherBoards from "./other-boards";

/**
 * The below function renders profile
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileOther = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState({});

    useEffect(async () => {
    setProfile(location.state)
    })

    return(
        <div className="ttr-profile">
            <div className="border border-bottom-0">
                <h4 className="p-2 mb-0 pb-0 fw-bolder">{profile.userName}<i className="fa fa-badge-check text-primary"></i></h4>
                <span className="ps-2">67.6K Tuits</span>
                <div className="mb-5 position-relative">
                    <img className="w-100" src="../images/nasa-profile-header.jpg"/>
                    <div className="bottom-0 left-0 position-absolute">
                        <div className="position-relative">
                            <img async className="position-relative ttr-z-index-1 ttr-top-120px ttr-width-100px"
                                 src={profile.profilePhoto}/>
                        </div>
                    </div>
                    <Link to="/profile/edit"
                          className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
                        Edit profile
                    </Link>

                </div>

                <div className="p-2">
                    <h4 className="fw-bolder pb-0 mb-0">
                        {profile.userName}<i className="fa fa-badge-check text-primary"></i>
                    </h4>
                    <h6 className="pt-0">@{profile.userName}</h6>
                    <p className="pt-2">
                        There's space for everybody. Sparkles
                    </p>
                    <p>
                        <i className="far fa-location-dot me-2"></i>
                        Pale Blue Dot
                        <i className="far fa-link ms-3 me-2"></i>
                        <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
                        <i className="far fa-balloon ms-3 me-2"></i>
                        Born October 1, 1958
                        <br/>
                        <i className="far fa-calendar me-2"></i>
                        Joined December 2007
                    </p>
                    <b>178</b> Following
                    <b className="ms-4">51.1M</b> Followers
                    <ul className="mt-4 nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link to="/profile-others/mytuits" state={profile}
                                  className={`nav-link ${location.pathname.indexOf('/mytuits') >= 0 ? 'active':''}`}>
                                Tuits</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile-others/boards" state={profile}
                                  className={`nav-link ${location.pathname.indexOf('/boards') >= 0 ? 'active':''}`}>
                                Boards</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/mytuits" element={<OtherTuits/>}/>
                <Route path= "/boards" element={<OtherBoards profile={profile}/>}/>

            </Routes>
        </div>
    );
}
export default ProfileOther;