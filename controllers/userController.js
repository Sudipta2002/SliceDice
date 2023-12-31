const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/config');
let user = [];

const matchPassword = (userPassword, enteredPassword) => {
    return bcrypt.compareSync(enteredPassword, userPassword);
}
const createToken = (user) => {
    try {
        const result = jwt.sign(user, JWT_KEY, { expiresIn: '2h' })
        return result;
    } catch (error) {
        console.log("Something went wrong on token creation in controller layer");
        throw { error };
    }
}
const verifyToken = (token) => {
    try {
        const response = jwt.verify(token, JWT_KEY)
        return response;
    } catch (error) {
        res.status(401).json({
            error: "Verification failed"
        });
    }
}
const create = asyncHandler(async(req, res) => {
    try {
        const newUser = req.body;
        const foundUser = user.find(u => u.email === req.body.email);
        if (foundUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
                err: {},
                data: {}
            });
        }
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(req.body.password, salt);
        user.push(newUser);
        res.status(201).json({
            message: 'User added successfully',
            success: true,
            err: {},
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
const signIn = asyncHandler(async(req, res) => {
    try {
        const credentials = req.body;
        const foundUser = user.find(u => u.email === credentials.email);
        if (!foundUser) {
            return res.status(401).json({
                message: "Invalid Email or Password",
                success: false,
                err: {},
                data: {}
            });
        }
        const index = user.findIndex(u => u.email === credentials.email);
        if (!matchPassword(user[index].password, credentials.password)) {
            return res.status(401).json({
                message: "Invalid Email or Password",
                success: false,
                err: {},
                data: {}
            });
        }
        const newToken = createToken(foundUser);

        res.status(201).json({
            message: 'User logged in successfully',
            success: true,
            err: {},
            data: user,
            token: newToken
        });
        // if (foundUser) {
        //     const index = user.findIndex(u => u.email === credentials.email);

        //     if (!matchPassword(user[index].password, credentials.password)) {
        //         res.status(401);
        //         throw new Error("Invalid  or Password");
        //     } else {
        //         const newToken = createToken(credentials);
        //         // return newToken;
        //         res.status(201).json({
        //             message: 'User logged in successfully',
        //             success: true,
        //             err: {},
        //             data: user,
        //             token: newToken
        //         });
        //     }
        // } else {
        //     res.status(401);
        //     throw new Error("Invalid Email or Password");
        // }

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
const isAuthenticated = async(req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const isTokenVerified = verifyToken(token);
            if (!isTokenVerified) {
                res.status(401).json({
                    error: "Not authorized, no token"
                });
            }
            // console.log("fsfsfsffs");
            const index = user.findIndex(u => u.email === isTokenVerified.email);
            if (index < 0) {
                return res.status(401).json({
                    message: "User doesnt exist",
                    success: false,
                    err: {},
                    data: {}
                });
            }

            next();
        } catch (error) {
            res.status(401).json({
                error: "Not authorized, no token"
            });
        }
    } else {
        res.status(401).json({
            error: "No token provided"
        });
    }
};

module.exports = { create, signIn, isAuthenticated };
module.exports = { create, signIn, isAuthenticated };