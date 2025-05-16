import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // find all users

        res.status(200).json({
            success: true, data: users
        })
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // find all users

        if (!user) {
            const error = new Error('User not found');
            error.status(200).json({ success: true, data: user });
        }

        res.status(200).json({
            success: true, data: user
        })
    } catch (error) {
        next(error);
    }
}