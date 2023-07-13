import jwt from 'jsonwebtoken';

export const generateToken = (_id) => {
    return jwt.sign(
        { _id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "2d" }
    )
};