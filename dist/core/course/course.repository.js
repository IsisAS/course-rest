"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const base_repository_1 = require("../../base/repositories/base.repository");
const course_model_1 = require("./course.model");
class CourseRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(course_model_1.courseModel);
    }
    // Método para buscar cursos disponíveis
    async findAvailable() {
        return await course_model_1.courseModel.findAvailableCourses();
    }
    // Método para buscar cursos por nome
    async searchByName(name) {
        return await course_model_1.courseModel.searchByName(name);
    }
    // Método para incrementar contador de inscrições
    async incrementEnrollmentCount(id) {
        return await course_model_1.courseModel.incrementEnrollmentCount(id);
    }
    // Método para decrementar contador de inscrições
    async decrementEnrollmentCount(id) {
        return await course_model_1.courseModel.decrementEnrollmentCount(id);
    }
    // Método para buscar cursos com filtros e paginação
    async findWithFilters(filters = {}, page = 1, limit = 10) {
        return await course_model_1.courseModel.findCoursesWithFilters(filters, page, limit);
    }
    // Método para buscar cursos populares
    async findPopular(limit = 10) {
        return await course_model_1.courseModel.findPopularCourses(limit);
    }
    // Método para cancelar curso
    async cancelCourse(id) {
        return await course_model_1.courseModel.cancelCourse(id);
    }
}
exports.CourseRepository = CourseRepository;
exports.default = CourseRepository;
//# sourceMappingURL=course.repository.js.map