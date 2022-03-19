import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../services/users-service";
import axios from "axios";


const MOCKED_USERS = [
    {userName: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {userName: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

test('user list renders static user array', () => {
    render(
        <HashRouter>
            <UserList users={MOCKED_USERS}/>
        </HashRouter>);

    const linkElement = screen.getByText(/ellen_ripley/i);
    expect(linkElement).toBeInTheDocument();
});

test('user list renders async', async () => {
    const users = await findAllUsers();
    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);

    // The test passes if there is a user with username 'alice123' already in the database.
    const linkElement = screen.getByText(/alice123/i);
    expect(linkElement).toBeInTheDocument();
})



test('user list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
        Promise.resolve({ data: {users: MOCKED_USERS} }));

    const response = await findAllUsers();
    const users = response.users;

    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);

    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
    mock.mockRestore();
});
