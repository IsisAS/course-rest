"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseModel = exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
const BaseModel_1 = require("../../base/models/BaseModel");
class CourseModel extends BaseModel_1.BaseModel {
    constructor() {
        const courseSchema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                maxlength: 255
            },
            description: {
                type: String,
                trim: true
            },
            cover: {
                type: String,
                maxlength: 500
            },
            enrollmentsCount: {
                type: Number,
                default: 0,
                min: 0
            },
            startDate: {
                type: Date
            },
            isEnrolled: {
                type: Boolean,
                default: false
            },
            enrollmentCancelled: {
                type: Boolean,
                default: false
            },
            isActive: {
                type: Boolean,
                default: true
            }
        });
        // Índices para melhor performance
        courseSchema.index({ name: 1 });
        courseSchema.index({ startDate: 1 });
        courseSchema.index({ isEnrolled: 1 });
        super('Course', courseSchema);
    }
    // Método para buscar cursos disponíveis
    async findAvailableCourses() {
        return await this.find({
            enrollmentCancelled: false
        });
    }
    // Método para buscar cursos por nome (busca parcial)
    async searchByName(name) {
        return await this.model.find({
            name: { $regex: name, $options: 'i' },
            enrollmentCancelled: false
        }).lean();
    }
    // Método para incrementar contador de inscrições
    async incrementEnrollmentCount(courseId) {
        return await this.model.findByIdAndUpdate(courseId, { $inc: { enrollmentsCount: 1 } }, { new: true }).lean();
    }
    // Método para decrementar contador de inscrições
    async decrementEnrollmentCount(courseId) {
        return await this.model.findByIdAndUpdate(courseId, { $inc: { enrollmentsCount: -1 } }, { new: true }).lean();
    }
    // Método para buscar cursos com paginação e filtros
    async findCoursesWithFilters(filters = {}, page = 1, limit = 10) {
        const query = { enrollmentCancelled: false };
        // Filtro por nome
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        // Filtro por data de início
        if (filters.startDate) {
            query.startDate = {};
            if (filters.startDate.from) {
                query.startDate.$gte = filters.startDate.from;
            }
            if (filters.startDate.to) {
                query.startDate.$lte = filters.startDate.to;
            }
        }
        // Filtro por status de inscrição
        if (filters.isEnrolled !== undefined) {
            query.isEnrolled = filters.isEnrolled;
        }
        return await this.paginate(query, page, limit, { startDate: 1, name: 1 });
    }
    // Método para buscar cursos populares (com mais inscrições)
    async findPopularCourses(limit = 10) {
        return await this.model.find({
            enrollmentCancelled: false
        })
            .sort({ enrollmentsCount: -1 })
            .limit(limit)
            .lean();
    }
    // Método para marcar curso como cancelado
    async cancelCourse(courseId) {
        return await this.updateById(courseId, {
            enrollmentCancelled: true,
            isEnrolled: false
        });
    }
}
exports.CourseModel = CourseModel;
// Singleton instance
exports.courseModel = new CourseModel();
//# sourceMappingURL=course.model.js.map