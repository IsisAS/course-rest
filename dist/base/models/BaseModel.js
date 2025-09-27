"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class BaseModel {
    constructor(modelName, schema) {
        this.schema = schema;
        // Adiciona timestamps automáticos se não existirem
        if (!schema.paths.createdAt) {
            schema.add({ createdAt: { type: Date, default: Date.now } });
        }
        if (!schema.paths.updatedAt) {
            schema.add({ updatedAt: { type: Date, default: Date.now } });
        }
        // Middleware para atualizar updatedAt
        schema.pre('save', function (next) {
            if (this.isModified() && !this.isNew) {
                this.updatedAt = new Date();
            }
            next();
        });
        schema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
            this.set({ updatedAt: new Date() });
            next();
        });
        this.model = mongoose_1.default.model(modelName, schema);
    }
    // Métodos CRUD básicos
    async create(data) {
        const result = await this.model.create(data);
        return result;
    }
    async findById(id) {
        const result = await this.model.findById(id).lean();
        return result;
    }
    async findOne(filter) {
        const result = await this.model.findOne(filter).lean();
        return result;
    }
    async find(filter = {}, options = {}) {
        const result = await this.model.find(filter, null, options).lean();
        return result;
    }
    async updateById(id, data) {
        const result = await this.model.findByIdAndUpdate(id, data, { new: true }).lean();
        return result;
    }
    async updateOne(filter, data) {
        const result = await this.model.findOneAndUpdate(filter, data, { new: true }).lean();
        return result;
    }
    async deleteById(id) {
        const result = await this.model.findByIdAndDelete(id).lean();
        return result;
    }
    async deleteOne(filter) {
        const result = await this.model.findOneAndDelete(filter).lean();
        return result;
    }
    async deleteMany(filter) {
        return await this.model.deleteMany(filter);
    }
    async count(filter = {}) {
        return await this.model.countDocuments(filter);
    }
    async exists(filter) {
        const result = await this.model.exists(filter);
        return result !== null;
    }
    // Método para paginação
    async paginate(filter = {}, page = 1, limit = 10, sort = { createdAt: -1 }) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter)
        ]);
        return {
            data: data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    // Getter para acessar o modelo Mongoose diretamente quando necessário
    getModel() {
        return this.model;
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map