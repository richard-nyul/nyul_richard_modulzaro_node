import express from "express";
import * as usersController from "../controllers/users.controllers.js"

const router = express.Router();

router.post('/', usersController.registerUser)
router.get('/:id/books', usersController.listUsersBooks)
router.delete('/:id', usersController.destroyUser)


export default router