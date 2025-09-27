"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRepository = void 0;
const base_repository_1 = require("../../base/repositories/base.repository");
const enrollment_model_1 = require("./enrollment.model");
class EnrollmentRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(enrollment_model_1.enrollmentModel);
    }
    // Método para criar inscrição
    async createEnrollment(userId, courseId) {
        return await enrollment_model_1.enrollmentModel.createEnrollment(userId, courseId);
    }
    // Método para cancelar inscrição
    async cancelEnrollment(userId, courseId) {
        return await enrollment_model_1.enrollmentModel.cancelEnrollment(userId, courseId);
    }
    // Método para reativar inscrição
    async reactivateEnrollment(userId, courseId) {
        return await enrollment_model_1.enrollmentModel.reactivateEnrollment(userId, courseId);
    }
    // Método para buscar inscrições de um usuário
    async findUserEnrollments(userId, activeOnly = true) {
        return await enrollment_model_1.enrollmentModel.findUserEnrollments(userId, activeOnly);
    }
    // Método para buscar inscrições de um curso
    async findCourseEnrollments(courseId, activeOnly = true) {
        return await enrollment_model_1.enrollmentModel.findCourseEnrollments(courseId, activeOnly);
    }
    // Método para verificar se usuário está inscrito em um curso
    async isUserEnrolled(userId, courseId) {
        const enrollment = await this.findOne({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
        return !!enrollment;
    }
    // Método para buscar inscrições com paginação
    async findEnrollmentsWithPagination(filters = {}, page = 1, limit = 10) {
        return await enrollment_model_1.enrollmentModel.findEnrollmentsWithPagination(filters, page, limit);
    }
    // Método para obter estatísticas de inscrições
    async getEnrollmentStats() {
        return await enrollment_model_1.enrollmentModel.getEnrollmentStats();
    }
}
exports.EnrollmentRepository = EnrollmentRepository;
exports.default = EnrollmentRepository;
//# sourceMappingURL=enrollment.repository.js.map