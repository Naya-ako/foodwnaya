const db = require('../db.js')
const timestamp = require('../middlewares/timestamp.js')
const validator = require('validator')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

class Accounts {

    static async signUp(username, email, password) {

        const id = uuid.v4()
        const created_at = await timestamp()

        // validate email and password
        if (!username || !email || !password) throw Error('All fields must be filled')
        if (!validator.isEmail(email)) throw Error("Invalid Email Address")

        // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
        if (!validator.isStrongPassword(password)) throw Error("Password not strong enough")

        const isExist = await this.userExist(username)

        if (isExist) throw Error('User Exists')
        else {
            // to hash the password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            let sql = `INSERT INTO foodwnaya_table (id, username, email, password, created_at)
                    VALUES ('${id}', '${username}', '${email}', '${hash}', '${created_at}')
        `

            await db.execute(sql)
        }


    }

    static async login(username, password) {

        // validate email and password
        if (!username || !password) throw Error('All fields must be filled')
        // if (!validator.is(username)) throw Error("Invalid Email Address")

        // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
      

        const user = await this.userExist(username)

        if (!user) throw Error('User does not exist')
        const match = await bcrypt.compare(password, user.password)

        if (!match) throw Error('Incorrect password')
        if (!validator.isStrongPassword(password)) throw Error("Password not strong enough")
        return { id: user.id, username: user.username }


    }

    static async userExist(username) {
        let sql = `SELECT * FROM foodwnaya_table WHERE username='${username}'`

        const [user] = await db.execute(sql)

        return user[0]
    }
}

module.exports = Accounts