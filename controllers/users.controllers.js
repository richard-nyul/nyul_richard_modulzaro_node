import { userRegistration, getUsersBooksById, destroyUserById } from "../services/users.services.js"

export const registerUser = async (req, res) => {
    try{
    const {firstName, lastName, email, phone} = req.body
    const result = await userRegistration(firstName, lastName, email, phone)

        res.status(201).json(result)

    } catch (err) {
        res.status(400).json({
            error: `Internal server error code: 400`,
            message: err.message
        })
    }
}

export const listUsersBooks = async(req, res) => {
   
    try {
        const result = await getUsersBooksById(req.params.id)
        if (result.length > 0) {
            res.status(200).json(result);
          } else {
            res.status(404).json({
              error: 404,
              message: "ID not found or user does not have books borrowed"
            });
          }
        } catch (err) {
          res.status(400).json({
            error: `Internal server error code: 400`,
            message: err.message,
          });
        }
    } 
    export const destroyUser = async(req, res) => {
        try {
        const result = await destroyUserById(req.params.id)
        res.json(result)
        } catch (err) {
            res.status(400).json({
                error: `Internal server error code: 400`,
                message: err.message,
              });
        }

    }
    