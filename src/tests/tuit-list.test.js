import {Tuits} from "../components/tuits/index";
import {Tuit} from "../components/tuits/tuit";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits,createTuit} from "../services/tuits-service";
import {createUser} from "../services/users-service";
import axios from "axios";


const NEW_MOCKED_TUITS = [
    {_id:1, tuit:"alice tuit", postedBy : {userName:"alice", password:"alice123", email: "a@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}},
    {_id:2, tuit:"user tuit", postedBy : {userName:"user", password:"user123", email: "u@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}},
    {_id:3, tuit:"charlie tuit", postedBy : {userName:"charlie", password:"charlie123", email: "c@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}},
]


test('tuit list renders static tuit array', () => {

    render(
        <HashRouter>
            <Tuits tuits={NEW_MOCKED_TUITS}/>
        </HashRouter>
    );


    const linkElement1 = screen.getByText("alice tuit");
    const linkElement2 = screen.getByText("user tuit");
    const linkElement3 = screen.getByText("charlie tuit");

    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();

});

test('tuit list renders async', async () => {


    const allTuits = await findAllTuits();


    render(
        <HashRouter>
            <Tuits tuits={allTuits}/>
        </HashRouter>
    );


    const linkElement1 = screen.getByText("My name is Alice. This is my first tuit!");
    expect(linkElement1).toBeInTheDocument();

})

test('tuit list renders mocked', async () => {

    const mock = jest.spyOn(axios, 'get');
        mock.mockImplementation(() =>
            Promise.resolve({ data: {tuits: NEW_MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;
    console.log(tuits);
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );


    const linkElement1 = screen.getByText("alice tuit");
    const linkElement2 = screen.getByText("user tuit");
    const linkElement3 = screen.getByText("charlie tuit");

    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();

    mock.mockRestore();
});
