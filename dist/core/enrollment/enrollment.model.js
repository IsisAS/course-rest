"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentModel = exports.EnrollmentModel = void 0;
const mongoose_1 = require("mongoose");
const BaseModel_1 = require("../../base/models/BaseModel");
class EnrollmentModel extends BaseModel_1.BaseModel {
    constructor() {
        const enrollmentSchema = new mongoose_1.Schema({
            userId: {
                type: String,
                required: true,
                ref: 'User'
            },
            courseId: {
                type: String,
                required: true,
                ref: 'Course'
            },
            isEnrollmentCanceled: {
                type: Boolean,
                default: false
            },
            isEnrolled: {
                type: Boolean,
                default: true
            }
        });
        // Índice único composto para evitar inscrições duplicadas
        enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
        // Índices para melhor performance
        enrollmentSchema.index({ userId: 1 });
        enrollmentSchema.index({ courseId: 1 });
        enrollmentSchema.index({ isEnrolled: 1 });
        super('Enrollment', enrollmentSchema);
    }
    // Método para criar inscrição com validação
    async createEnrollment(userId, courseId) {
        // Verifica se já existe uma inscrição ativa
        const existingEnrollment = await this.findOne({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
        if (existingEnrollment) {
            throw new Error('Usuário já está inscrito neste curso');
        }
        return await this.create({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
    }
    // Método para cancelar inscrição
    async cancelEnrollment(userId, courseId) {
        return await this.updateOne({ userId, courseId }, {
            isEnrollmentCanceled: true,
            isEnrolled: false
        });
    }
    // Método para reativar inscrição
    async reactivateEnrollment(userId, courseId) {
        return await this.updateOne({ userId, courseId }, {
            isEnrollmentCanceled: false,
            isEnrolled: true
        });
    }
    // Método para buscar inscrições de um usuário
    async findUserEnrollments(userId, activeOnly = true) {
        const filter = { userId };
        if (activeOnly) {
            filter.isEnrolled = true;
            filter.isEnrollmentCanceled = false;
        }
        return await this.model.find(filter)
            .populate('courseId', 'name description cover startDate')
            .lean();
    }
    // Método para buscar inscrições de um curso
    async findCourseEnrollments(courseId, activeOnly = true) {
        const filter = { courseId };
        if (activeOnly) {
            filter.isEnrolled = true;
            filter.isEnrollmentCanceled = false;
        }
        return await this.model.find(filter)
            .populate('userId', 'name email')
            .lean();
    }
    // Método para contar inscrições ativas de um curso
    async countActiveEnrollments(courseId) {
        return await this.count({
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
    }
    // Método para verificar se usuário está inscrito em um curso
    async isUserEnrolled(userId, courseId) {
        return await this.exists({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
    }
    // Método para buscar inscrições com paginação
    async findEnrollmentsWithPagination(filters = {}, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find(filters)
                .populate('userId', 'name email')
                .populate('courseId', 'name description cover')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.count(filters)
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    // Método para buscar estatísticas de inscrições
    async getEnrollmentStats() {
        const [total, active, canceled] = await Promise.all([
            this.count({}),
            this.count({ isEnrolled: true, isEnrollmentCanceled: false }),
            this.count({ isEnrollmentCanceled: true })
        ]);
        return {
            totalEnrollments: total,
            activeEnrollments: active,
            canceledEnrollments: canceled
        };
    }
}
exports.EnrollmentModel = EnrollmentModel;
// Singleton instance
exports.enrollmentModel = new EnrollmentModel();
//# sourceMappingURL=enrollment.model.js.map