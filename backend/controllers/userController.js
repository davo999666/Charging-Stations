import userService from "../services/userService.js";

class UserController {
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
            console.log(user.password);
            return res.status(200).json(user);
        }catch(err) {
            console.log(err);
            next(err);
        }
    }
    async resetPassword(req, res, next) {
       try {
           const user = await userService.resetPassword(req.body);
           return res.status(200).json(user);
       }catch(err) {
           console.log(err);
           next(err);
       }


    }
}

export default new UserController();