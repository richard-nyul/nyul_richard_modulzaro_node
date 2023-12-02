import { getAllBooks, getBookById, handleBookRentById } from "../services/books.services.js"

export const list = async (req, res) => {
    const { available, title } = req.query
    let result = await getAllBooks();
    

    // if (available == true) {
    //     result = result.filter((book) => book.borrower == null )
    // } else if (available == false) {
    //     result = result.filter((book) => book.borrower != null )
    // } 

    if(title) {
        result = result.filter((book) => book.title == title)
        // if (result.length == 0) {
        //     res.json(
        //         {code: 404,
        //         message: 'Title not found'}
        //     )
        // }
    }
   
    res.json(result)
}

export const listById = async (req, res) => {
    try {
    const result = await getBookById(req.params.id)
    if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          error: 404,
          message: "ID not found"
        });
      }
    } catch (err) {
      res.status(400).json({
        error: `Internal server error code: 400`,
        message: err.message,
      });
    }
} 

export const updateById = async (req, res) => {

    try {
    const result = await handleBookRentById(req.params.id, req.body.userId)

        res.json(result)

    } catch (err) {

        if(err.message == "Cannot read properties of undefined (reading 'borrowing_date')") {
            res.status(404).json({
                error: 404,
                message: "ID not found"
                
            })
        } else {
        
        res.status(400).json({
            error: `Internal server error code: 400`,
            message: err.message
        })
    }
    }
}
