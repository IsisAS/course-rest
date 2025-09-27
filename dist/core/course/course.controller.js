"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCourses = exports.getPopularCourses = exports.getAvailableCourses = exports.cancelRegistration = exports.register = exports.findById = exports.create = exports.getAllCourses = void 0;
const course_service_1 = require("./course.service");
const getAllCourses = async (req, res) => {
    try {
        const courseService = new course_service_1.CourseService();
        const { page = 1, limit = 10, name, startDate, isEnrolled } = req.query;
        const filters = {};
        if (name)
            filters.name = name;
        if (startDate)
            filters.startDate = { from: new Date(startDate) };
        if (isEnrolled !== undefined)
            filters.isEnrolled = isEnrolled === 'true';
        const data = await courseService.findCoursesWithFilters(filters, Number(page), Number(limit));
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllCourses = getAllCourses;
const create = async (req, res) => {
    try {
        const courseService = new course_service_1.CourseService();
        const props = req.body;
        // Validação básica
        if (!props.name) {
            res.status(400).json({ error: "Nome do curso é obrigatório" });
            return;
        }
        // Adicionar campos padrão se não fornecidos
        const courseData = {
            ...props,
            enrollmentsCount: props.enrollmentsCount || 0,
            isEnrolled: props.isEnrolled || false,
            enrollmentCancelled: props.enrollmentCancelled || false
        };
        const data = await courseService.create(courseData);
        res.status(201).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.create = create;
const findById = async (req, res) => {
    try {
        const courseService = new course_service_1.CourseService();
        const { id } = req.params;
        const data = await courseService.findById(id);
        if (!data) {
            res.status(404).json({ error: "Curso não encontrado" });
            return;
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.findById = findById;
const register = async (req, res) => {
    try {
        const courseService = new course_service_1.CourseService();
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            res.status(400).json({
                error: "userId e courseId são obrigatórios"
            });
            return;
        }
        const data = await courseService.register({ userId, courseId });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
const cancelRegistration = async (req, res) => {
    try {
        const courseService = new course_service_1.CourseService();
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            res.status(400).json({
                error: "userId e courseId são obrigatórios"
            });
            return;
        }
        const data = await courseService.cancelRegistration({ userId, courseId });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.cancelRegistration = cancelRegistration;
const getAvailableCourses = async (req, res) => {
    try {
        const courseService = new course_service_1.CourseService();
        const data = await courseService.findAvailableCourses();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAvailableCourses = getAvailableCourses;
const getPopularCourses = async (req, res) => {
    try {
        const courseService = new course_service_1.CourseService();
        const { limit = 10 } = req.query;
        const data = await courseService.findPopularCourses(Number(limit));
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPopularCourses = getPopularCourses;
const searchCourses = async (req, res) => {
    try {
        const courseService = new course_service_1.CourseService();
        const { name } = req.query;
        if (!name) {
            res.status(400).json({ error: "Nome para busca é obrigatório" });
            return;
        }
        const data = await courseService.searchCoursesByName(name);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.searchCourses = searchCourses;
//# sourceMappingURL=course.controller.js.map