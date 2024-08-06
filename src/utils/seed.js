const { BlogModel } = require("../models/BlogModel");
const { UserModel } = require("../models/UserModel");
const { databaseConnect, databaseClear, databaseClose } = require("./database");


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

    console.log("Creating users from insertMany:")
    let result = await UserModel.insertMany(userData)
    console.log(result)
    return result;
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

    console.log("Seeded data!");
    await databaseClose();
};

seed();