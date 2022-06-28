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
        // make sure no user in db exist with that email
        // if user exist, throw an error
        // hash user password
        // lowercase email
        //create new user in the db with given info
        //return user
    }
}

module.exports = User