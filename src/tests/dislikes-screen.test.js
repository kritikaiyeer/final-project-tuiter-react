
const MOCKED_TUITS = [
    {_id:1, tuit:"alice tuit", postedBy : {userName:"alice", password:"alice123", email: "a@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}},
    {_id:2, tuit:"user tuit", postedBy : {userName:"user", password:"user123", email: "u@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}},
    {_id:3, tuit:"charlie tuit", postedBy : {userName:"charlie", password:"charlie123", email: "c@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}},
]

test('test whether dislikes screen is rendered properly with proper tuits', () => {

    render(
        <HashRouter>
            <MyDislikes
        </HashRouter>
    )



})