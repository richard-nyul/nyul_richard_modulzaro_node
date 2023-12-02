import express from "express";
import * as db from "../services/db.service.js";

const app = express();

function idError(res, message) {
  res.status(405).json({
    error: `Internal server error code: 405`,
    message: message,
  });
}

const rentingValidator = async (req, res, next) => {
  if (req.body.userId.length != 36) {
    idError(res, "UserID is invalid");
  } else {
    const userCheck = await db.query(`SELECT * FROM users WHERE id = $1`, [
      req.body.userId,
    ]);
    if (userCheck.rows.length > 0) {
        const rentCheck = await db.query(`SELECT borrower FROM books WHERE id = $1`, [
            req.params.id]);
            if(rentCheck.rows[0].borrower == req.body.userId || rentCheck.rows[0].borrower == null) {
                next();
            } else {
                idError(res, "Book is already borrowed")
            }
    } else {
      idError(res, "UserID is invalid");
    }
  }
};

export default rentingValidator;
