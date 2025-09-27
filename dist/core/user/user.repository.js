"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const base_repository_1 = require("../../base/repositories/base.repository");
const user_model_1 = require("./user.model");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_model_1.userModel);
    }
    // Método específico para validar senha
    async validatePassword(email, password) {
        return await user_model_1.userModel.validatePassword(email, password);
    }
    // Método para buscar usuário por email
    async findByEmail(email) {
        return await user_model_1.userModel.findByEmail(email);
    }
    // Método para criar usuário com validações específicas
    async create(userData) {
        return await user_model_1.userModel.create(userData);
    }
    // Método para atualizar perfil do usuário
    async updateProfile(id, userData) {
        return await user_model_1.userModel.updateProfile(id, userData);
    }
    // Método para alterar senha
    async changePassword(id, newPassword) {
        return await user_model_1.userModel.changePassword(id, newPassword);
    }
    // Método para buscar usuário com suas inscrições
    async findWithEnrollments(id) {
        return await user_model_1.userModel.findWithEnrollments(id);
    }
    // Método para buscar usuários com paginação
    async findUsersWithPagination(filters = {}, page = 1, limit = 10) {
        const query = {};
        // Filtro por nome
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        // Filtro por email
        if (filters.email) {
            query.email = { $regex: filters.email, $options: 'i' };
        }
        return await this.paginate(query, page, limit, { name: 1 });
    }
}
exports.UserRepository = UserRepository;
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map