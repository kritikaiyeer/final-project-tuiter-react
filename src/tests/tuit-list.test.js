import {Tuits} from "../components/tuits/index";
import {Tuit} from "../components/tuits/tuit";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits,createTuit} from "../services/tuits-service";
import {createUser} from "../services/users-service";
import axios from "axios";


const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

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


  const linkElement1 = screen.getByText("alice tuit");
  const linkElement2 = screen.getByText("bob tuit");
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

     render(
       <HashRouter>
         <Tuits tuits={tuits}/>
       </HashRouter>
     );

     const linkElement1 = screen.getByText("alice tuit");
     const linkElement2 = screen.getByText("bob tuit");
     const linkElement3 = screen.getByText("charlie tuit");

     expect(linkElement1).toBeInTheDocument();
     expect(linkElement1).toBeInTheDocument();
     expect(linkElement1).toBeInTheDocument();

     mock.mockRestore();
});
