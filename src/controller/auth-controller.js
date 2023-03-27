import User from "../models/user.js";
import bcrypt from "bcrypt";

async function getAll(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function createUser(req, res) {
    if(req.body.password === undefined || req.body.username === undefined){
        res.status(400).json("Missing inputs.");
        return;
    }
    if (User.find({username: req.body.username}) !== null){
        res.status(409).json("Error. Duplicate usernames.")
        return;
    }

    const salt = 10;
    try {
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            password: hashedPass
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function login(req, res) {
    try {
        const findUser = await User.findOne({username: req.body.username});
        if (findUser !== null){
            const compare = await bcrypt.compare(req.body.password, findUser.password);
            if (compare){
                req.session.userID = findUser._id;
                req.session.loggedIn = true;
                req.session.save();
                res.status(200).json(findUser);
                return;
            }
        }
        res.status(400).json("Login failed.");
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export default {getAll, createUser, login};