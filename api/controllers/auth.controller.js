import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";


export const signup = async (req, res, next) => {
    // res.json({message : "success"});
    // console.log(req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        // return res.status(400).json({ message: "Please fill in all fields" });

        next(errorHandler(400, "All fields are required."))
    }

    // *********************************************************************
                    // password hashing //

    const hashedPassword = bcryptjs.hashSync(password, 12)

    // *********************************************************************

    const newUser = new User({
        username,
        email,
        password :hashedPassword,
    });

    try {
        await newUser.save();
        res.json({ message: "success" });
        console.log(req.body);
    }

    catch (error) {
       next(error);
    }
};
