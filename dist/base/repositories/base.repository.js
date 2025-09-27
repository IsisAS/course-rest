"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseId = exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return await this.model.create(data);
    }
    async findById(id) {
        return await this.model.findById(id);
    }
    async findOne(filter) {
        return await this.model.findOne(filter);
    }
    async find(filter = {}, options = {}) {
        return await this.model.find(filter, options);
    }
    async findMany(filter = {}, options = {}) {
        return await this.model.find(filter, options);
    }
    async updateById(id, data) {
        return await this.model.updateById(id, data);
    }
    async updateOne(filter, data) {
        return await this.model.updateOne(filter, data);
    }
    async deleteById(id) {
        return await this.model.deleteById(id);
    }
    async deleteOne(filter) {
        return await this.model.deleteOne(filter);
    }
    async deleteMany(filter) {
        return await this.model.deleteMany(filter);
    }
    async count(filter = {}) {
        return await this.model.count(filter);
    }
    async exists(filter) {
        return await this.model.exists(filter);
    }
    async paginate(filter = {}, page = 1, limit = 10, sort = { createdAt: -1 }) {
        return await this.model.paginate(filter, page, limit, sort);
    }
    // Método para acessar o modelo diretamente quando necessário
    getModel() {
        return this.model;
    }
}
exports.BaseRepository = BaseRepository;
const parseId = function (value) {
    return typeof value === 'string' ? value : String(value);
};
exports.parseId = parseId;
//# sourceMappingURL=base.repository.js.map