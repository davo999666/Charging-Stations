import {User} from "../models/index.js";


class UserRepository {
    async register(user) {
        return User.create(user);
    }


    async login({ login, password }) {
        let user = await User.scope("withPassword").findByPk(login);
        if (!user) throw new Error("Invalid login");
        const valid = await user.validatePassword(password);
        if (!valid) throw new Error("Invalid password");
        return user;
    }

    async resetPassword(user, newPassword) {
        await user.setPassword(newPassword);
        await user.save();
        return user;
    }
    async updateUserRole(login, newRole) {
        const user = await User.findByPk(login);
        if (!user) throw new Error("User not found");
        user.role = newRole;
        await user.save();
        return user;
    }
}

export default new UserRepository();
