import userRepository from "../repositories/userRepository.js";
import { sendEmail } from "../utils/sendEmail.js";
import NodeCache from "node-cache";
import {createHash} from "../utils/createHash.js";
import {User} from "../models/index.js";
import {createHashToken} from "../utils/createTokenBase.js";
export const cache = new NodeCache({ stdTTL: 300 });

class UserService {
    async login(user) {
        const foundUser = await userRepository.login(user);
        const tokenHase = createHashToken(foundUser.role);
        return {tokenHase, foundUser};
    }
    async register(user) {
        const hash = await createHash(user.password);
        delete user.password;
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const data = {...user, password_hash: hash, code};
        cache.set(`pending:${user.email}`, data);
        await sendEmail("verify", user.email, { code });
        return { message: "Verification code sent to email" };
    }

    async verify({email, code}) {
        const data = cache.get(`pending:${email}`);
        if (!data) throw new Error("Verification expired or not found");
        if (data.code !== code) {
            throw new Error("Invalid code");
        }

        delete data.code;

        const user = await userRepository.register(data);

        // delete from cache (optional, TTL auto-expires anyway)
        cache.del(`pending:${email}`);

        return { message: "User verified and registered", user };
    }

    async resetPassword(login, currentPassword, newPassword) {
        const user = await User.scope("withPassword").findByPk(login);
        if (!user) throw new Error("User not found");
        const valid = await user.validatePassword(currentPassword);
        if (!valid) throw new Error("Current password is incorrect");
        return userRepository.resetPassword(user, newPassword);
    }
}

export default new UserService();
