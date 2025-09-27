"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const login = async (req, res) => {
    try {
        const authService = new auth_service_1.default();
        const { email, password } = req.body;
        console.log("ENTROU AQUI", password);
        if (!email || !password) {
            res.status(400).json({
                error: "Email e senha são obrigatórios"
            });
            return;
        }
        const data = await authService.login(email, password);
        if (!data) {
            res.status(401).json({
                error: "Credenciais inválidas"
            });
            return;
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map