"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(repositoryClass) {
        this.repository = new repositoryClass();
    }
    // Método para buscar todos os registros
    async getAll(filters = {}) {
        return await this.repository.find(filters);
    }
    // Método para buscar por ID
    async findById(id) {
        return await this.repository.findById(id);
    }
    // Método para criar um novo registro
    async create(data) {
        return await this.repository.create(data);
    }
    // Método para atualizar por ID
    async updateById(id, data) {
        return await this.repository.updateById(id, data);
    }
    // Método para deletar por ID
    async deleteById(id) {
        return await this.repository.deleteById(id);
    }
    // Método para buscar um registro
    async findOne(filters) {
        return await this.repository.findOne(filters);
    }
    // Método para contar registros
    async count(filters = {}) {
        return await this.repository.count(filters);
    }
    // Método para verificar se existe
    async exists(filters) {
        return await this.repository.exists(filters);
    }
    // Método para paginação
    async paginate(filters = {}, page = 1, limit = 10, sort = {}) {
        return await this.repository.paginate(filters, page, limit, sort);
    }
    // Método para buscar primeiro registro (compatibilidade)
    async first(filters) {
        return await this.repository.findOne(filters);
    }
    // Método para buscar múltiplos registros (compatibilidade)
    async findMany(filters = {}) {
        return await this.repository.find(filters);
    }
}
exports.BaseService = BaseService;
exports.default = BaseService;
//# sourceMappingURL=base.service.js.map