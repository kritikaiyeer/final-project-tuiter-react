import {createTuit, deleteTuit, findTuitById, findAllTuits} from "../services/tuits-service.js";
import {deleteUsersByUsername, createUser, deleteUser} from "../services/users-service.js";
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
var mongoose = require('mongoose');

describe('can create tuit with REST API', () => {
  const alice = {
    userName : "alice",
    password : "alice123",
    email : "alice@gmail.com"
  }

  const aliceTuit = {
      tuit : "I am alice. This is my tuit"
    }

  var tuitId = null;
  beforeAll(async () => {
    return await deleteUsersByUsername(alice.userName);
  })

  afterAll(async () => {
        await deleteUsersByUsername(alice.userName);
        await deleteTuit(tuitId);
  })

  test('can create tuit with REST API', async () => {
    const newUser = await createUser(alice);

    expect(newUser.userName).toEqual(alice.userName);
    expect(newUser.password).toEqual(alice.password);
    expect(newUser.email).toEqual(alice.email);

    const newUserId = newUser._id;
    const newTuit = await createTuit(newUserId, aliceTuit);
    tuitId = newTuit._id;
    expect(newTuit.tuit).toEqual(aliceTuit.tuit);


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

    var tuitId = null;

    beforeAll(async () => {
        return await deleteUsersByUsername(abcUser.userName);

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

    beforeAll(() => {
        // clean up before the test making sure the user doesn't already exist
        return deleteUsersByUsername(abcUser.userName)
    });

      // clean up after ourselves
    afterAll( async () => {
        // remove any data we inserted
        await deleteUsersByUsername(abcUser.userName);
        await deleteTuit(newTuitId);

    });

    test('can retrieve a tuit by their primary key with REST API', async () => {

        // create new user and check it
        const newUser = await createUser(abcUser);
        expect(newUser.userName).toEqual(abcUser.userName);
        expect(newUser.password).toEqual(abcUser.password);
        expect(newUser.email).toEqual(abcUser.email);

        // create the new user's tuit and check it
        const newTuit = await createTuit(newUser._id, abcTuit);
        expect(newTuit.tuit).toEqual(abcTuit.tuit);
        newTuitId = newTuit._id;

        // retrieve the created tuit and check if it is the one that was created
        const existingTuit = await findTuitById(newTuit._id);
        expect(existingTuit._id).toEqual(newTuit._id);
        expect(existingTuit.tuit).toEqual(newTuit.tuit);

    })
});

describe('can retrieve all tuits with REST API', () => {

    const id1 = new mongoose.Types.ObjectId();
    const id2 = new mongoose.Types.ObjectId();
    const id3 = new mongoose.Types.ObjectId();
    const userIds = [];
    userIds.push(id1);
    userIds.push(id2);
    userIds.push(id3);
    const users = [
        {
            _id : id1,
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



    const tuitIds = [];

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

        Promise.all(
            users.map(user => createUser(user))
        )

        const t1 = await createTuit(id1,tuits[0]);
        const t2 = await createTuit(id2,tuits[1]);
        const t3 = await createTuit(id3,tuits[2]);

        tuitIds.push(t1._id);
        tuitIds.push(t2._id);
        tuitIds.push(t3._id);
    });

    afterAll(async () => {
        await deleteUser(userIds[0]);
        await deleteUser(userIds[1]);
        await deleteUser(userIds[2]);

        await deleteTuit(tuitIds[0]);
        await deleteTuit(tuitIds[1]);
        await deleteTuit(tuitIds[2]);

    })


    test('can retrieve all tuits with REST API',async () => {

        const allTuits = await findAllTuits();

        const tuitNames = [];
        tuits.forEach(tuit => tuitNames.push(tuit.tuit));

        const allTuitsIInserted = allTuits.filter(tuit => tuitNames.indexOf(tuit.tuit) >= 0);
        expect(allTuits.length).toBeGreaterThanOrEqual(allTuitsIInserted.length);

        var i = 0;
        allTuitsIInserted.forEach(tuit => {
            const tuitObj = tuit_postedBy_map.find(t => t.tuit === tuit.tuit); // finding a tuit from 'tuits' that matches the tuit I inserted
            expect(tuit.tuit).toEqual(tuitObj.tuit);
            expect(tuit.postedBy.userName).toEqual(tuitObj.postedBy);

        });

    })

});