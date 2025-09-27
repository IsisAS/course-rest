"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserEnrollment = exports.getEnrollmentStats = exports.getCourseEnrollments = exports.getUserEnrollments = exports.reactivateEnrollment = exports.cancelEnrollment = exports.create = exports.getAllEnrollments = void 0;
const enrollment_service_1 = require("./enrollment.service");
const getAllEnrollments = async (req, res) => {
    try {
        const enrollmentService = new enrollment_service_1.EnrollmentService();
        const { page = 1, limit = 10, userId, courseId, isEnrolled, isEnrollmentCanceled } = req.query;
        const filters = {
            ...(userId && { userId: userId }),
            ...(courseId && { courseId: courseId }),
            ...(isEnrolled !== undefined && { isEnrolled: isEnrolled === 'true' }),
            ...(isEnrollmentCanceled !== undefined && { isEnrollmentCanceled: isEnrollmentCanceled === 'true' })
        };
        const data = await enrollmentService.findEnrollmentsWithPagination(filters, Number(page), Number(limit));
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllEnrollments = getAllEnrollments;
const create = async (req, res) => {
    try {
        const enrollmentService = new enrollment_service_1.EnrollmentService();
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            res.status(400).json({
                error: "userId e courseId são obrigatórios"
            });
            return;
        }
        const data = await enrollmentService.createEnrollment(userId, courseId);
        res.status(201).json({ message: "Inscrição criada com sucesso!", data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.create = create;
const cancelEnrollment = async (req, res) => {
    try {
        const enrollmentService = new enrollment_service_1.EnrollmentService();
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            res.status(400).json({
                error: "userId e courseId são obrigatórios"
            });
            return;
        }
        const data = await enrollmentService.cancelEnrollment(userId, courseId);
        if (!data) {
            res.status(404).json({ error: "Inscrição não encontrada" });
            return;
        }
        res.json({ message: "Inscrição cancelada com sucesso!", data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.cancelEnrollment = cancelEnrollment;
const reactivateEnrollment = async (req, res) => {
    try {
        const enrollmentService = new enrollment_service_1.EnrollmentService();
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            res.status(400).json({
                error: "userId e courseId são obrigatórios"
            });
            return;
        }
        const data = await enrollmentService.reactivateEnrollment(userId, courseId);
        if (!data) {
            res.status(404).json({ error: "Inscrição não encontrada" });
            return;
        }
        res.json({ message: "Inscrição reativada com sucesso!", data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.reactivateEnrollment = reactivateEnrollment;
const getUserEnrollments = async (req, res) => {
    try {
        const enrollmentService = new enrollment_service_1.EnrollmentService();
        const { userId } = req.params;
        const { activeOnly = 'true' } = req.query;
        const data = await enrollmentService.findUserEnrollments(userId, activeOnly === 'true');
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUserEnrollments = getUserEnrollments;
const getCourseEnrollments = async (req, res) => {
    try {
        const enrollmentService = new enrollment_service_1.EnrollmentService();
        const { courseId } = req.params;
        const { activeOnly = 'true' } = req.query;
        const data = await enrollmentService.findCourseEnrollments(courseId, activeOnly === 'true');
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getCourseEnrollments = getCourseEnrollments;
const getEnrollmentStats = async (req, res) => {
    try {
        const enrollmentService = new enrollment_service_1.EnrollmentService();
        const data = await enrollmentService.getEnrollmentStats();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getEnrollmentStats = getEnrollmentStats;
const checkUserEnrollment = async (req, res) => {
    try {
        const enrollmentService = new enrollment_service_1.EnrollmentService();
        const { userId, courseId } = req.params;
        const isEnrolled = await enrollmentService.isUserEnrolled(userId, courseId);
        res.json({ isEnrolled });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.checkUserEnrollment = checkUserEnrollment;
//# sourceMappingURL=enrollment.controller.js.map