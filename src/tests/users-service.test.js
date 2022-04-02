/**
 * @jest-environment node
 */

import {
    createUser,
    deleteUsersByUsername,
    findAllUsers,
    findUserById
} from "../services/users-service";

describe('createUser', () => {
    // sample user to insert
    const ripley = {
        userName: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        const resp = await deleteUsersByUsername(ripley.userName);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteUsersByUsername(ripley.userName);
    })

    test('can insert new users with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(ripley);

        // verify inserted user's properties match parameter user
        expect(newUser.userName).toEqual(ripley.userName);
        expect(newUser.password).toEqual(ripley.password);
        expect(newUser.email).toEqual(ripley.email);

    });
});

describe('deleteUsersByUsername', () => {

    // sample user to delete
    const sowell = {
        userName: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    // setup the tests before verification
    beforeAll(() => {
        // insert the sample user we then try to remove
        return createUser(sowell);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(sowell.userName);
    });

    test('can delete users from REST API by username', async () => {
        // delete a user by their username. Assumes user already exists
        const status = await deleteUsersByUsername(sowell.userName);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('findUserById',  () => {
    // sample user we want to retrieve
    const adam = {
        userName: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    // setup before running test
    beforeAll(() => {
        // clean up before the test making sure the user doesn't already exist
        return deleteUsersByUsername(adam.userName)
    });

    // clean up after ourselves
    afterAll(() => {
        // remove any data we inserted
        return deleteUsersByUsername(adam.userName);
    });

    test('can retrieve user from REST API by primary key', async () => {
        // insert the user in the database
        const newUser = await createUser(adam);

        // verify new user matches the parameter user
        expect(newUser.userName).toEqual(adam.userName);
        expect(newUser.password).toEqual(adam.password);
        expect(newUser.email).toEqual(adam.email);

        // retrieve the user from the database by its primary key
        const existingUser = await findUserById(newUser._id);

        // verify retrieved user matches parameter user
        expect(existingUser.userName).toEqual(adam.userName);
        expect(existingUser.password).toEqual(adam.password);
        expect(existingUser.email).toEqual(adam.email);
    });
});


describe('findAllUsers',  () => {

    // sample users we'll insert to then retrieve
    const usernames = [
        "larry", "curley", "moe"
    ];

    // setup data before test
    beforeAll(() =>
        // insert several known users
        Promise.all(
            usernames.map(username =>
                createUser({
                    userName : username,
                    password: `${username}123`,
                    email: `${username}@stooges.com`
                })
            )
        )
    );

    // clean up after ourselves
    afterAll(() =>
        // delete the users we inserted
        Promise.all(
            usernames.map(username =>
                deleteUsersByUsername(username)
            )
        )
    );

    test('can retrieve all users from REST API', async () => {
        // retrieve all the users
        const users =  await findAllUsers();
        // there should be a minimum number of users
        expect(users.length).toBeGreaterThanOrEqual(usernames.length);

        // let's check each user we inserted
        const usersWeInserted = users.filter(
            user => usernames.indexOf(user.userName) >= 0);

        // compare the actual users in database with the ones we sent
        usersWeInserted.forEach(user => {
            const username = usernames.find(username => username === user.userName);
            expect(user.userName).toEqual(username);
            expect(user.password).toEqual(`${username}123`);
            expect(user.email).toEqual(`${username}@stooges.com`);
        });
    });
});
