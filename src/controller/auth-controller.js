import User from "../models/user.js";

async function getAll(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function createUser(req, res) {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function login(req, res) {
    try {
        const findUser = await User.findOne({username: req.body.username, password: req.body.password});
        if (findUser !== null){
            req.session.userID = findUser._id;
            req.session.loggedIn = true;
            req.session.save();
            res.status(200).json(findUser);
        } else {
            res.status(400).json("Invalid login");
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function deleteAll(req,res) {
    try {
        const del = await User.deleteMany();
        res.status(201).json(del);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export default {getAll, createUser, login, deleteAll};