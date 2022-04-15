/** 
 * Component showing boards page of user when they are logged in
 */
import React, {useState, useEffect} from "react";
import * as service from "../../services/boards-service";

const MyBoards = () => {
    const [boards, setBoards] = useState([]);
    const [profile, setProfile] = useState({});
    useEffect(async () => {
        try {
          const user = await service.profile();
          setProfile(user);
        } catch (e) {
        
        }
      }, []);
    const AllBoardsByMe = () => 
        service.findAllBoardsByUser(profile._id)
            .then((boards) => setBoards(boards));
    useEffect(AllBoardsByMe, []);
    
    return (
          <div>
            {
              boards.map(board => {
                return (
                  <Link>
                    {board.boardName}
                  </Link>
                )
              })
            }
          </div>
        );
      
      
}