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
    async create(userData) {
        if (userData.birthDate && typeof userData.birthDate === 'string') {
            userData.birthDate = new Date(userData.birthDate);
        }
        return await this.userRepository.create(userData);
    }
    async findById(id) {
        const user = await this.userRepository.findWithEnrollments(id);
        if (!user) {
            return null;
        }
        return {
            ...user,
            course: user.enrollments?.map((enrollment) => enrollment.course) || []
        };
    }
    async validatePassword(email, password) {
        return await this.userRepository.validatePassword(email, password);
    }
    async findByEmail(email) {
        return await this.userRepository.findByEmail(email);
    }
    async updateProfile(id, userData) {
        return await this.userRepository.updateProfile(id, userData);
    }
    async changePassword(id, newPassword) {
        return await this.userRepository.changePassword(id, newPassword);
    }
    async findUsersWithFilters(filters = {}, page = 1, limit = 10) {
        return await this.userRepository.findUsersWithPagination(filters, page, limit);
    }
    async emailExists(email) {
        const user = await this.findByEmail(email);
        return !!user;
    }
    async findActiveUsers() {
        return await this.getAll();
    }
}
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=user.service.js.map