import {createTuit, deleteTuit, findTuitById, findAllTuits} from "../services/tuits-service.js";
import {deleteUsersByUsername, createUser, deleteUser} from "../services/users-service.js";
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
var mongoose = require('mongoose');

describe('can create tuit with REST API', () => {

    // creating a dummy user object
    const alice = {
        userName : "alice",
        password : "alice123",
        email : "alice@gmail.com"
    }

    // creating a dummy tuit object
    const aliceTuit = {
        tuit : "I am alice. This is my tuit"
    }

    // declaring a variable to store the tuit that I will be inserting later, so that I can delete it
    // after the test
    var tuitId = null;

    beforeAll(async () => {
        return await deleteUsersByUsername(alice.userName);
    })

    afterAll(async () => {
        await deleteUsersByUsername(alice.userName);
        await deleteTuit(tuitId);
    })

    test('can create tuit with REST API', async () => {

        // creating new user
        const newUser = await createUser(alice);

        // checking if the user in inserted properly
        expect(newUser.userName).toEqual(alice.userName);
        expect(newUser.password).toEqual(alice.password);
        expect(newUser.email).toEqual(alice.email);

        // extracting the newly created user's id as it is need to create a tuit by that user
        const newUserId = newUser._id;

        // creating a tuit by that user
        const newTuit = await createTuit(newUserId, aliceTuit);

        // storing the tuit id in a variable declared above so that I can delete it after test
        tuitId = newTuit._id;

        // checking that new tuit content matches the one that we inserted
        expect(newTuit.tuit).toEqual(aliceTuit.tuit);
        // checking that new tuit's postedBy field has the same id as that of the user I inserted
        expect(newTuit.postedBy).toEqual(newUserId);

    });

});

describe('can delete tuit with REST API', () => {

    const abcUser = {
        userName : "abc",
        password : "abc123",
        email : "abc@gmail.com"
    }

    const abcTuit = {
        tuit : "I am ABC. This is my tuit"
    }

    // variable for storing the newly crested tuit's id so I can delete it after test
    var tuitId = null;

    beforeAll(async () => {
        await deleteUsersByUsername(abcUser.userName);
    })

    afterAll(async () => {

        await deleteUsersByUsername(abcUser.userName);
        await deleteTuit(tuitId);
    })

    test('can delete tuit with REST API', async () => {

        // create new user and check it
        const newUser = await createUser(abcUser);
        expect(newUser.userName).toEqual(abcUser.userName);
        expect(newUser.password).toEqual(abcUser.password);
        expect(newUser.email).toEqual(abcUser.email);

        // create user's tuit and check it
        const newUserId = newUser._id;
        const newTuit = await createTuit(newUserId, abcTuit);
        tuitId = newTuit._id;
        expect(newTuit.tuit).toEqual(abcTuit.tuit);

        const status = await deleteTuit(tuitId);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const abcUser = {
        userName : "abc",
        password : "abc123",
        email : "abc@gmail.com"
    }

    const abcTuit = {
        tuit : "I am ABC. This is my tuit"
    }

    var newTuitId = null;

    beforeAll(async () => {
        await deleteUsersByUsername(abcUser.userName)
    });


    afterAll( async () => {

        await deleteUsersByUsername(abcUser.userName);
        await deleteTuit(newTuitId);

    });

    test('can retrieve a tuit by their primary key with REST API', async () => {

        // create new user and check if it is properly inserted
        const newUser = await createUser(abcUser);
        expect(newUser.userName).toEqual(abcUser.userName);
        expect(newUser.password).toEqual(abcUser.password);
        expect(newUser.email).toEqual(abcUser.email);

        // create the new user's tuit and check if it is the one we inserted
        const newTuit = await createTuit(newUser._id, abcTuit);
        expect(newTuit.tuit).toEqual(abcTuit.tuit);  // checking tuit content
        expect(newTuit.postedBy).toEqual(newUser._id);  // checking postedBy field
        newTuitId = newTuit._id;

        // retrieve the created tuit and check if it is the one that was created
        const existingTuit = await findTuitById(newTuit._id);
        expect(existingTuit._id).toEqual(newTuit._id);  // comparing IDs
        expect(existingTuit.tuit).toEqual(newTuit.tuit);  // comparing tuit content

    })
});

describe('can retrieve all tuits with REST API', () => {

    // mocking mongoose object IDs as user IDs so that dummy users can be inserted
    const id1 = new mongoose.Types.ObjectId();
    const id2 = new mongoose.Types.ObjectId();
    const id3 = new mongoose.Types.ObjectId();

    // maintaining a list of all the user IDs. Useful to delete users after running the test.
    const userIds = [];
    userIds.push(id1);
    userIds.push(id2);
    userIds.push(id3);

    // creating dummy user objects
    const users = [
        {
            _id : id1,  // mocked ID
            userName : "larry",
            password : "larry123",
            email : "larry@gmail.com"
        },
        {
            _id : id2,
            userName : "carl",
            password : "carl123",
            email : "carl@gmail.com"
        },
        {
            _id : id3,
            userName : "joe",
            password : "joe123",
            email : "joe@gmail.com"
        }
    ]

    // creating dummy tuit objects
    const tuits = [
        {
            tuit : "larry's tuit",
        },
        {
            tuit : "carl's tuit",
        },
        {
            tuit : "joe's tuit",
        }
    ]

    // declaring a variable that later maintains a list of all the tuit IDs.
    // Useful to delete tuits after running the test.
    const tuitIds = [];

    // creating an array for the purpose of checking that the tuit and the user that posted it
    // is in sync
    const tuit_postedBy_map = [
        {
            tuit : "larry's tuit",
            postedBy : "larry"
        },
        {
            tuit : "carl's tuit",
            postedBy : "carl"
        },
        {
            tuit : "joe's tuit",
            postedBy : "joe"
        },

    ]


    beforeAll(async () =>{
        // inserting dummy users
        Promise.all(
            users.map(user => createUser(user))
        )

        // inserting dummy tuits
        const t1 = await createTuit(id1,tuits[0]);
        const t2 = await createTuit(id2,tuits[1]);
        const t3 = await createTuit(id3,tuits[2]);

        // maintaining list of the inserted tuits' IDs
        tuitIds.push(t1._id);
        tuitIds.push(t2._id);
        tuitIds.push(t3._id);
    });

    afterAll(async () => {

        // deleting inserted users
        await deleteUser(userIds[0]);
        await deleteUser(userIds[1]);
        await deleteUser(userIds[2]);

        // deleting inserted tuits
        await deleteTuit(tuitIds[0]);
        await deleteTuit(tuitIds[1]);
        await deleteTuit(tuitIds[2]);

    })


    test('can retrieve all tuits with REST API',async () => {

        // using findAllTuits service
        const allTuits = await findAllTuits();

        // maintaining a list of 'tuit' field's values so that I can filter the tuits I have inserted
        // from all the tuits I receive by calling findAllTuits()
        const tuitNames = [];
        tuits.forEach(tuit => tuitNames.push(tuit.tuit));

        const allTuitsIInserted = allTuits.filter(tuit => tuitNames.indexOf(tuit.tuit) >= 0);

        // checking if "atleast" same of of tuits are retrieved. There can be more if there already exists
        // tuits with same content
        expect(allTuits.length).toBeGreaterThanOrEqual(allTuitsIInserted.length);


        allTuitsIInserted.forEach(tuit => {
            // finding an object from 'tuit_postedBy_map' that matches
            // the tuit I had inserted and retrieved now
            const tuitObj = tuit_postedBy_map.find(t => t.tuit === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitObj.tuit);    // checking tuit content
            expect(tuit.postedBy.userName).toEqual(tuitObj.postedBy);  // checking username

        });

    })

});