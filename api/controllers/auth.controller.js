import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';


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

    // const hashedPassword = bcryptjs.hashSync(password, 12)

    // *********************************************************************

    const newUser = new User({
        username,
        email,
        // password :hashedPassword,
        password
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



// *********************************  \\  sign in  // ******************************* \\


export const SignIn = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === "" || password === "" ){
        return next(errorHandler(400, "All fields are required."));
    }

    try {
        const validuser = await User.findOne({email});
        if(!validuser){
            return next(errorHandler(401, "user not found."))
        }

        // const validPassword = bcryptjs.compareSync(password, validuser.password);

        if(validuser.password != password){
           return next(errorHandler(401, "Invalid email or password."));
        }

        const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);

        const { password:pass, ...rest } = validuser._doc;

        return res.status(200).cookie("access_token", token, {httpOnly: true} ).json(rest);

    } catch (error) {
        next(error)
    }
}


// *********************************  \\  google  // ******************************* \\

export const Google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({email});

        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }

        else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            // const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser =  new User({
                username: name.toLowerCase().split(' ') + Math.random().toString(9).slice(-4) ,
                email,
                password: generatedPassword,
                profilePicture: googlePhotoUrl,

            });

            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password, ...rest } = newUser_doc;

            res
            .status(200)
            .cookie("access_token", token , {
                htttpsOnly: true
            }).json(rest);
        }

    } catch (error) {
        next(error);
    }
}