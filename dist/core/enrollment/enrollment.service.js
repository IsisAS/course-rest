"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const base_service_1 = require("../../base/base.service");
const enrollment_repository_1 = require("./enrollment.repository");
class EnrollmentService extends base_service_1.BaseService {
    constructor() {
        super(enrollment_repository_1.EnrollmentRepository);
        this.enrollmentRepository = new enrollment_repository_1.EnrollmentRepository();
    }
    // Método para criar uma nova inscrição
    async createEnrollment(userId, courseId) {
        return this.enrollmentRepository.createEnrollment(userId, courseId);
    }
    // Método para cancelar uma inscrição
    async cancelEnrollment(userId, courseId) {
        return this.enrollmentRepository.cancelEnrollment(userId, courseId);
    }
    // Método para reativar uma inscrição
    async reactivateEnrollment(userId, courseId) {
        return this.enrollmentRepository.reactivateEnrollment(userId, courseId);
    }
    // Método para buscar inscrições de um usuário
    async findUserEnrollments(userId, activeOnly = true) {
        return this.enrollmentRepository.findUserEnrollments(userId, activeOnly);
    }
    // Método para buscar inscrições de um curso
    async findCourseEnrollments(courseId, activeOnly = true) {
        return this.enrollmentRepository.findCourseEnrollments(courseId, activeOnly);
    }
    // Método para contar inscrições ativas de um curso
    async countActiveEnrollments(courseId) {
        return this.repository.count({
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
    }
    // Método para verificar se usuário está inscrito em um curso
    async isUserEnrolled(userId, courseId) {
        return this.enrollmentRepository.isUserEnrolled(userId, courseId);
    }
    // Método para buscar inscrições com paginação
    async findEnrollmentsWithPagination(filters = {}, page = 1, limit = 10) {
        return this.enrollmentRepository.findEnrollmentsWithPagination(filters, page, limit);
    }
    // Método para obter estatísticas de inscrições
    async getEnrollmentStats() {
        return this.enrollmentRepository.getEnrollmentStats();
    }
    // Método para buscar inscrições ativas
    async findActiveEnrollments() {
        return this.repository.find({
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
    }
    // Método para buscar inscrições canceladas
    async findCanceledEnrollments() {
        return this.repository.find({
            isEnrollmentCanceled: true
        });
    }
}
exports.EnrollmentService = EnrollmentService;
exports.default = EnrollmentService;
//# sourceMappingURL=enrollment.service.js.map