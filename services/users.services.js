import * as db from "./db.service.js";

export const userRegistration = async (firstName, lastName, email, phone) => {
    const result = await db.query(`INSERT INTO users (first_name, last_name, email, phone)
                                  VALUES($1, $2, $3, $4) RETURNING *`,
                                  [firstName, lastName, email, phone]);

    const user = result.rows[0]
    return { firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        id: user.id};
}

export const getUsersBooksById = async (id) => {
    const result = await db.query(`SELECT * FROM books WHERE borrower = $1`, [id])
    return result.rows
}

export const destroyUserById = async (id) => {
    let borrowCheck = await getUsersBooksById(id)
    let result
    if (borrowCheck.length > 0) {
        throw new Error('Elmenekülnél a könyvekkel mi?')
    } else {
        result = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id])
        const user = result.rows[0]
        return { firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            id: user.id};
    }
}