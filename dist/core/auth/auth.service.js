"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../user/user.repository"));
class AuthService {
    constructor() {
        this.userRepository = new user_repository_1.default();
    }
    async login(email, password) {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }
        const user = await this.userRepository
            .findOne({
            email: email || ""
        });
        if (user) {
            if (user.password !== password) {
                throw new Error("Senha incorreta");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                token: token,
            };
        }
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map