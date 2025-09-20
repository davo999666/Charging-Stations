import userRepository from "../repositories/userRepository.js";
import { sendEmail } from "../utils/sendEmail.js";
import NodeCache from "node-cache";
import {createHash} from "../utils/createHash.js";
const cache = new NodeCache({ stdTTL: 300 });

class UserService {
    async login(user) {
        return userRepository.login(user);
    }
    async register(user) {
        const hash = await createHash(user.password);
        delete user.password;
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const data = {
            ...user,
            password_hash: hash,
            code
        };
        cache.set(`pending:${user.login}`, data);
        await sendEmail("verify", user.email, { code });
        return { message: "Verification code sent to email" };
    }

    async verify({login, code}) {
        const data = cache.get(`pending:${login}`);
        if (!data) throw new Error("Verification expired or not found");

        if (data.code !== code) {
            throw new Error("Invalid code");
        }

        delete data.code;

        const user = await userRepository.register(data);

        // delete from cache (optional, TTL auto-expires anyway)
        cache.del(`pending:${login}`);

        return { message: "User verified and registered", user };
    }

    async resetPassword(user) {
        return userRepository.resetPassword(user);
    }
}

export default new UserService();
