"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const BaseModel_1 = require("../../base/models/BaseModel");
const bcrypt = __importStar(require("bcryptjs"));
class UserModel extends BaseModel_1.BaseModel {
    constructor() {
        const userSchema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                maxlength: 255
            },
            email: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                lowercase: true,
                maxlength: 255
            },
            password: {
                type: String,
                required: true,
                minlength: 6
            },
            birthDate: {
                type: Date,
                required: true
            }
        });
        // Middleware para hash da senha antes de salvar
        userSchema.pre('save', async function (next) {
            if (!this.isModified('password'))
                return next();
            try {
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password, salt);
                next();
            }
            catch (error) {
                next(error);
            }
        });
        super('User', userSchema);
    }
    // Método específico para validar senha
    async validatePassword(email, password) {
        const user = await this.model.findOne({ email }).lean();
        if (!user)
            return null;
        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }
    // Método para buscar usuário por email
    async findByEmail(email) {
        return await this.model.findOne({ email }).lean();
    }
    // Método para criar usuário (sobrescreve o método base para validações específicas)
    async create(userData) {
        // Validação de email único
        if (userData.email) {
            const existingUser = await this.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email já está em uso');
            }
        }
        return await super.create(userData);
    }
    // Método para atualizar usuário sem alterar a senha diretamente
    async updateProfile(id, userData) {
        return await this.updateById(id, userData);
    }
    // Método para alterar senha
    async changePassword(id, newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        return await this.updateById(id, { password: hashedPassword });
    }
    // Método para buscar usuários com suas inscrições
    async findWithEnrollments(id) {
        return await this.model.findById(id)
            .populate({
            path: 'enrollments',
            populate: {
                path: 'course',
                model: 'Course'
            }
        })
            .lean();
    }
}
exports.UserModel = UserModel;
// Singleton instance
exports.userModel = new UserModel();
//# sourceMappingURL=user.model.js.map