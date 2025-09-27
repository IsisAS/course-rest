"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const base_repository_1 = require("../../base/repositories/base.repository");
const user_model_1 = require("./user.model");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_model_1.userModel);
    }
    async validatePassword(email, password) {
        return await user_model_1.userModel.validatePassword(email, password);
    }
    async findByEmail(email) {
        return await user_model_1.userModel.findByEmail(email);
    }
    async create(userData) {
        return await user_model_1.userModel.create(userData);
    }
    async updateProfile(id, userData) {
        return await user_model_1.userModel.updateProfile(id, userData);
    }
    async changePassword(id, newPassword) {
        return await user_model_1.userModel.changePassword(id, newPassword);
    }
    async findWithEnrollments(id) {
        return await user_model_1.userModel.findWithEnrollments(id);
    }
    async findUsersWithPagination(filters = {}, page = 1, limit = 10) {
        const query = {};
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        if (filters.email) {
            query.email = { $regex: filters.email, $options: 'i' };
        }
        return await this.paginate(query, page, limit, { name: 1 });
    }
}
exports.UserRepository = UserRepository;
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map