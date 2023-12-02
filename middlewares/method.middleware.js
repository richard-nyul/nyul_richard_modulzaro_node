import express from 'express'

const app = express()

const method = (req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next();
};

export default method