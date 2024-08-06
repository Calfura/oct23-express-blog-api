const { BlogModel } = require("../models/BlogModel");
const { UserModel } = require("../models/UserModel");
const { comparePasswords, createJwt, validateJwt } = require("./authHelpers");
const { databaseConnect, databaseClear, databaseClose } = require("./database");
const dotenv = require("dotenv")
dotenv.config();


async function seedUsers () {
    let userData = [
        {
            username: "Alex",
            password: "password"
        },
        {
            username: "Pikachu",
            password: "password"
        },
    ];

    let thirdUser = {
        username: "callum",
        password: "supercool"
    }

    console.log("Creating user with .create")
    let callum = await UserModel.create(thirdUser);

    console.log("Calling save on the created user:")
    await callum.save();

    console.log("Callum's encrypted password is: " + callum.password);
    let doesSupercoolMatch = await comparePasswords("supercool", callum.password);
    console.log("Callum's password is supercool: " + doesSupercoolMatch);

    // console.log("Creating users from insertMany:")
    // let result = await UserModel.insertMany(userData)

    // If we wanted pre-save on the insertMany, this is the code to do it:
    let result = await Promise.all(userData.map(async(user) => {
        let newUser = await UserModel.create(user);
        return newUser;
    }));

    console.log(...result, callum)
    return [...result, callum];
};

async function seedBlogPosts (usersToUse) {
    let blogData = [
        {
            title: "Super cool blog post",
            content: "Pretend this is 3000 words",
            author: usersToUse[0].id,
            headerImage: "https://placehold.co/600x400/EEE/31343C",
            tags: ["seeded", "blog", "pokemon", "cool beans"],
            categories: ["coding", "travel"]
        },
        {
            title: "Another cool blog post",
            content: "Pretend this is 4000 words",
            author: usersToUse[1].id,
            headerImage: "https://placehold.co/600x400/EEE/31343C",
            tags: ["seeded", "tada!", "pokemon", "food"],
            categories: ["life", "photography"]
        },
        {
            title: "The Third Cool Blog Post",
            content: "Pretend this is 3000 words",
            author: usersToUse[1].id,
            headerImage: "https://placehold.co/600x400/EEE/31343C",
            tags: ["seeded", "blog", "pokemon", "cool beans"],
            categories: ["coding", "travel"]
        }
    ];

    let result = await BlogModel.insertMany(blogData);
    console.log(result);
    return result;
};

async function seed () {

    await databaseConnect();
    await databaseClear();

    let newUsers = await seedUsers();
    let newBlogs = await seedBlogPosts(newUsers);

    let newJwt = createJwt(newUsers[0]._id);
    console.log("New JWT: " + newJwt);

    validateJwt(newJwt);

    console.log("Seeded data!");
    await databaseClose();
};

seed();