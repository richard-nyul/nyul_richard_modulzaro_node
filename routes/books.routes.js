import express from "express";
import * as booksController from "../controllers/books.controllers.js"
import rentingValidator from "../middlewares/RentingValidator.middleware.js";

const router = express.Router();

router.get('/', booksController.list)
router.get('/:id', booksController.listById)
router.patch('/:id',rentingValidator, booksController.updateById)

export default router