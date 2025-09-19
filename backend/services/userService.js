import userRepository from "../repositories/userRepository.js";

class UserService {
    async login(user) {
        return  userRepository.login(user);
    }
    async register(user) {
        return userRepository.register(user)
    }
    async resetPassword(user){
        return userRepository.resetPassword(user);
    }
}

export default new UserService();