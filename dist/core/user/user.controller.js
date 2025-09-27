"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.findAll = exports.deleteById = exports.updateProfile = exports.updateById = exports.findById = exports.create = void 0;
const user_service_1 = require("./user.service");
const create = async (req, res) => {
    try {
        const userService = new user_service_1.UserService();
        const props = req.body;
        // Validação básica
        if (!props.email || !props.password || !props.name || !props.birthDate) {
            res.status(400).json({
                error: "Campos obrigatórios: email, password, name, birthDate"
            });
            return;
        }
        const data = await userService.create(props);
        res.status(201).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.create = create;
const findById = async (req, res) => {
    try {
        const userService = new user_service_1.UserService();
        const { id } = req.params;
        const data = await userService.findById(id);
        if (!data) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.findById = findById;
const updateById = async (req, res) => {
    try {
        const userService = new user_service_1.UserService();
        const { id } = req.params;
        const props = req.body;
        const data = await userService.updateProfile(id, props);
        if (!data) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateById = updateById;
const updateProfile = async (req, res) => {
    try {
        const userService = new user_service_1.UserService();
        const { id } = req.params;
        const props = req.body;
        const data = await userService.updateProfile(id, props);
        if (!data) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateProfile = updateProfile;
const deleteById = async (req, res) => {
    try {
        const userService = new user_service_1.UserService();
        const { id } = req.params;
        const data = await userService.deleteById(id);
        if (!data) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }
        res.json({ message: "Usuário deletado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteById = deleteById;
const findAll = async (req, res) => {
    try {
        const userService = new user_service_1.UserService();
        const { page = 1, limit = 10, name, email, birthDate } = req.query;
        const filters = {};
        if (name)
            filters.name = name;
        if (email)
            filters.email = email;
        if (birthDate)
            filters.birthDate = new Date(birthDate);
        const data = await userService.findUsersWithFilters(filters, Number(page), Number(limit));
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.findAll = findAll;
const changePassword = async (req, res) => {
    try {
        const userService = new user_service_1.UserService();
        const { id } = req.params;
        const { newPassword } = req.body;
        if (!newPassword) {
            res.status(400).json({ error: "Nova senha é obrigatória" });
            return;
        }
        const data = await userService.changePassword(id, newPassword);
        if (!data) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }
        res.json({ message: "Senha alterada com sucesso" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=user.controller.js.map