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

    async resetPassword({ login, currentPassword, newPassword }) {
        const user = await User.scope("withPassword").findByPk(login);
        if (!user) throw new Error("User not found");
        const valid = await user.validatePassword(currentPassword);
        if (!valid) throw new Error("Current password is incorrect");
        await user.setPassword(newPassword);
        await user.save();

        return user;
    }
}

export default new UserRepository();
