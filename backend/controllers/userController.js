import userService from "../services/userService.js";

class UserController {
    async verification(req, res, next) {
        try {
            const user = await userService.verify(req.body);
            return res.status(200).json(user);
        }catch(err) {
            console.log(err);
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            const user = await userService.login(req.body);
            return res.status(200).json(user);

        }catch(err) {
            console.log(err);
            next(err);
        }
    }
    async register(req, res, next) {
        try {
            const user = await userService.register(req.body);
            return res.status(200).json(user);
        }catch(err) {
            console.log(err);
            next(err);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const { login } = req.params;       // get login from query string
            const  newPassword  = req.body;
            const user = await userService.resetPassword(login, newPassword);
            return res.status(200).json({ message: "Password reset successful", user });
        } catch (err) {
            console.error("Error resetting password:", err);
            next(err);
        }
    }
}

export default new UserController();