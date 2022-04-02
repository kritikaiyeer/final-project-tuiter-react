import React from "react";
import * as likesService from "../../services/likes-service";

const TuitStats = ({tuit, likeTuit, dislikeTuit}) => {

    const loggedInUserLikes = (tuit) =>
        likesService.findUserLikesTuit("me", tuit._id)
            .then(response => response.data)
            .catch(e => alert(e))

    const loggedInUserDislikes = (tuit) =>
        likesService.findUserDislikesTuit("me", tuit._id)
            .then(response => response.data)
            .catch(e => alert(e))

    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
               {
                 tuit.stats.likes > 0 &&
                    <i class="fa-solid fa-thumbs-up"></i>
               }
               {
                  tuit.stats.likes <= 0 &&
                     <i class="fa-light fa-thumbs-up"></i>
               }
            <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>

          </span>
        </div>
        <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => dislikeTuit(tuit)}>
               {
                    tuit.stats.dislikes > 0 &&
                       <i class="fa-solid fa-thumbs-down"></i>
               }
               {
                    tuit.stats.dislikes <= 0 &&
                       <i class="fa-light fa-thumbs-down"></i>
               }
            <span className="ttr-stats-likes">{tuit.stats && tuit.stats.dislikes}</span>
          </span>
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;