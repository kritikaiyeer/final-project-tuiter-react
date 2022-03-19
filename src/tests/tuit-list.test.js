import {Tuits} from "../components/tuits/index";
import {Tuit} from "../components/tuits/tuit";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits,createTuit} from "../services/tuits-service";
import {createUser} from "../services/users-service";
import axios from "axios";

// created mock tuits
const NEW_MOCKED_TUITS = [
    {_id:1, tuit:"alice tuit", postedBy : {username:"alice", password:"alice123", email: "a@g.com"}},
    {_id:2, tuit:"bob tuit", postedBy : {username:"bob", password:"bob123", email: "b@g.com"}},
    {_id:3, tuit:"charlie tuit", postedBy : {username:"charlie", password:"charlie123", email: "c@g.com"}},
]


test('tuit list renders static tuit array', () => {

    render(
        <HashRouter>
            <Tuits tuits={NEW_MOCKED_TUITS}/>
        </HashRouter>
    );

    // looking up the tuit content of all three inserted tuits in the document
    // and verifying that it is present
    const linkElement1 = screen.getByText("alice tuit");
    const linkElement2 = screen.getByText("bob tuit");
    const linkElement3 = screen.getByText("charlie tuit");

    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();

});

test('tuit list renders async', async () => {

    // The test passes if there is a tuit with the content "My name is Alice. This is my first tuit!"
    // in the database.

    // using the service of finding all tuits
    const allTuits = await findAllTuits();

    // passing those tuits to render
    render(
        <HashRouter>
            <Tuits tuits={allTuits}/>
        </HashRouter>
    );

    // checking if the tuit content is rendered properly
    const linkElement1 = screen.getByText("My name is Alice. This is my first tuit!");
    expect(linkElement1).toBeInTheDocument();

})

test('tuit list renders mocked', async () => {

    // mocking the service findAllTuits
    const mock = jest.spyOn(axios, 'get');
        mock.mockImplementation(() =>
            Promise.resolve({ data: {tuits: NEW_MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    // rendering the mocked tuits
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );

    // checking tuit content
    const linkElement1 = screen.getByText("alice tuit");
    const linkElement2 = screen.getByText("bob tuit");
    const linkElement3 = screen.getByText("charlie tuit");

    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();

    mock.mockRestore();
});
