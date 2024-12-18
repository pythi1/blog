import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js'

export const test = (req, res) => {
    res.json({ message: 'this is test api.' });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'you are not allowed to update this user.'));
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'password must be at least 6 characters.'));
        }
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'username must be between 7 and 20 characters.'));
        }

        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'username connot contain spaces'));
        }

        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'username must be in lowercase.'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'username can only be contain letter and number only.'));
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            },
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);


    } catch (error) {
        next(error);
    }

};

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId) {
        next(errorHandler('you are not allowed to delete this account.'))
    }

    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
        next(error);
    }
}