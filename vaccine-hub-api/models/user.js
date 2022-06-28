const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
class User {
    static async login(creds) {
        //required fields are email and password, throw error if either are missing

        //looking the user in the db by email
        // if the user is found, compare the password with the submitted password
        // if they match, return user
        // else throw an error
        throw new UnauthorizedError("Invalid email/password")
    }

    static async register(creds) {
        //user should submit email, pw, resvp status and # of guest
        // if any of the field are missing, throw an error
        const requiredFields = ["email", 'password', 'firstName', 'lastName', 'location']
        requiredFields.forEach(field => {
            if (!creds.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if(creds.email.indexOf('@') <= 0) {
            throw new BadRequestError('Invalid email')
        }
        // make sure no user in db exist with that email
        // if user exist, throw an error
        const existingUser = await User.fetchUserByEmail(creds.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${creds.email}`)
        }

        // hash user password
        // lowercase email
        const lowercasedEmail = creds.email.toLowerCase()
        //create new user in the db with given info
        const result = await db.query(`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                location
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, password, first_name, last_name, location, date;
        `,
        [lowercasedEmail, creds.password, creds.firstName, creds.lastName, creds.location]
        )
        //return user
        return result.rows[0]
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
}

module.exports = User