"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const base_service_1 = __importDefault(require("../../base/base.service"));
const course_repository_1 = __importDefault(require("./course.repository"));
const enrollment_service_1 = __importDefault(require("../enrollment/enrollment.service"));
class CourseService extends base_service_1.default {
    constructor() {
        super(course_repository_1.default);
        this.courseRepository = new course_repository_1.default();
        this.enrollmentService = new enrollment_service_1.default();
    }
    // Método para registrar usuário em um curso
    async register(props) {
        // Verificar se o curso existe e está ativo
        const course = await this.courseRepository.findById(props.courseId);
        if (!course || !course.isActive) {
            throw new Error("Curso não encontrado ou inativo");
        }
        // Verificar se o usuário já está inscrito
        const existingEnrollment = await this.enrollmentService.findOne({
            courseId: props.courseId,
            userId: props.userId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
        if (existingEnrollment) {
            throw new Error("Usuário já está inscrito neste curso");
        }
        // Criar a inscrição
        const enrollment = await this.enrollmentService.create({
            courseId: props.courseId,
            userId: props.userId,
            isEnrollmentCanceled: false,
            isEnrolled: true,
        });
        // Incrementar contador de inscrições do curso
        await this.courseRepository.incrementEnrollmentCount(props.courseId);
        return enrollment;
    }
    // Método para cancelar inscrição
    async cancelRegistration(props) {
        const enrollment = await this.enrollmentService.findOne({
            courseId: props.courseId,
            userId: props.userId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
        if (!enrollment || !enrollment._id) {
            throw new Error("Inscrição não encontrada");
        }
        // Cancelar a inscrição
        const updatedEnrollment = await this.enrollmentService.updateById(enrollment._id, {
            isEnrollmentCanceled: true,
            isEnrolled: false
        });
        // Decrementar contador de inscrições do curso
        await this.courseRepository.decrementEnrollmentCount(props.courseId);
        return updatedEnrollment;
    }
    // Método para buscar cursos disponíveis
    async findAvailableCourses() {
        return this.repository.find({ isEnrolled: false, enrollmentCancelled: false });
    }
    // Método para buscar cursos por nome
    async searchCoursesByName(name) {
        return this.repository.find({ name: { $regex: name, $options: 'i' } });
    }
    // Método para buscar cursos com filtros
    async findCoursesWithFilters(filters = {}, page = 1, limit = 10) {
        const mongoFilters = {};
        if (filters.name) {
            mongoFilters.name = { $regex: filters.name, $options: 'i' };
        }
        if (filters.startDate) {
            mongoFilters.startDate = {};
            if (filters.startDate.from) {
                mongoFilters.startDate.$gte = filters.startDate.from;
            }
            if (filters.startDate.to) {
                mongoFilters.startDate.$lte = filters.startDate.to;
            }
        }
        if (filters.isEnrolled !== undefined) {
            mongoFilters.isEnrolled = filters.isEnrolled;
        }
        return this.repository.paginate(mongoFilters, page, limit);
    }
    // Método para buscar cursos populares
    async findPopularCourses(limit = 10) {
        const courses = await this.repository.find({}, { sort: { enrollmentsCount: -1 }, limit });
        return courses;
    }
    // Método para cancelar curso
    async cancelCourse(courseId) {
        return this.repository.updateById(courseId, { enrollmentCancelled: true });
    }
    // Método para verificar se usuário está inscrito em um curso
    async isUserEnrolledInCourse(userId, courseId) {
        const enrollment = await this.enrollmentService.findOne({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
        return !!enrollment;
    }
}
exports.CourseService = CourseService;
exports.default = CourseService;
//# sourceMappingURL=course.service.js.map