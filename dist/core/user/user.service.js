"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const base_service_1 = __importDefault(require("../../base/base.service"));
const user_repository_1 = __importDefault(require("./user.repository"));
class UserService extends base_service_1.default {
    constructor() {
        super(user_repository_1.default);
        this.userRepository = new user_repository_1.default();
    }
    // Método para criar usuário com validações específicas
    async create(userData) {
        // Converter birthDate se for string
        if (userData.birthDate && typeof userData.birthDate === 'string') {
            userData.birthDate = new Date(userData.birthDate);
        }
        return await this.userRepository.create(userData);
    }
    // Método para buscar usuário por ID com inscrições
    async findById(id) {
        const user = await this.userRepository.findWithEnrollments(id);
        if (!user) {
            return null;
        }
        // Formatar resposta para compatibilidade
        return {
            ...user,
            course: user.enrollments?.map((enrollment) => enrollment.course) || []
        };
    }
    // Método para validar senha
    async validatePassword(email, password) {
        return await this.userRepository.validatePassword(email, password);
    }
    // Método para buscar usuário por email
    async findByEmail(email) {
        return await this.userRepository.findByEmail(email);
    }
    // Método para atualizar perfil do usuário
    async updateProfile(id, userData) {
        return await this.userRepository.updateProfile(id, userData);
    }
    // Método para alterar senha
    async changePassword(id, newPassword) {
        return await this.userRepository.changePassword(id, newPassword);
    }
    // Método para buscar usuários com filtros
    async findUsersWithFilters(filters = {}, page = 1, limit = 10) {
        return await this.userRepository.findUsersWithPagination(filters, page, limit);
    }
    // Método para verificar se email já existe
    async emailExists(email) {
        const user = await this.findByEmail(email);
        return !!user;
    }
    // Método para buscar usuários ativos
    async findActiveUsers() {
        return await this.getAll();
    }
}
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=user.service.js.map