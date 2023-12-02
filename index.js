import "dotenv/config";
import express from "express"
import booksRouter from "./routes/books.routes.js"
import usersRouter from "./routes/users.routes.js"
import method from "./middlewares/method.middleware.js";

const port = process.env.PORT

const app = express();

app.use(express.json())

app.use(method)

app.use("/books", booksRouter)

app.use("/users", usersRouter)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

