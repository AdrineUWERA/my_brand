import User from "../models/User.js"

class UserService {
    static async createUser(data) {
        const newUser = await new User(data)
        await newUser.save()
        return newUser
    }

    static async userExist(data) {
        return await User.findOne(data)
    }
}

export default UserService