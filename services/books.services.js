import * as db from "./db.service.js";

export const getAllBooks = async () => {
    const result = await db.query('SELECT * FROM books');
    return result.rows
}

export const getBookById = async (id) => {
    const result = await db.query(`SELECT * FROM books WHERE id = $1 `, [id])
    return result.rows
}

export const handleBookRentById = async (bookId, UserId) => {
    const borrowedCheck = await db.query(`SELECT borrowing_date FROM books WHERE id = $1`, [bookId])
    let result

    if(!borrowedCheck.rows[0].borrowing_date)  {
        result = await db.query(`UPDATE books SET return_date = NULL, borrowing_date = CURRENT_TIMESTAMP, borrower = $1
                                 WHERE id = $2 RETURNING*`,
                                 [UserId, bookId])
    } else {
        result = await db.query(`UPDATE books SET borrowing_date = NULL, return_date = CURRENT_TIMESTAMP, borrower = NULL
                                 WHERE id = $1 RETURNING*`,
                                 [bookId])
    }

    return result.rows

}
