import { Request, Response } from "express";
import { EnrollmentService } from "./enrollment.service";

export const getAllEnrollments = async (req: Request, res: Response): Promise<void> => {
    try {
        const enrollmentService = new EnrollmentService();
        const { page = 1, limit = 10, userId, courseId, isEnrolled, isEnrollmentCanceled } = req.query;
        
        const filters = {
            ...(userId && { userId: userId as string }),
            ...(courseId && { courseId: courseId as string }),
            ...(isEnrolled !== undefined && { isEnrolled: isEnrolled === 'true' }),
            ...(isEnrollmentCanceled !== undefined && { isEnrollmentCanceled: isEnrollmentCanceled === 'true' })
        };
        
        const data = await enrollmentService.findEnrollmentsWithPagination(
            filters, 
            Number(page), 
            Number(limit)
        );

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const enrollmentService = new EnrollmentService();
        const { userId, courseId } = req.body;
        
        if (!userId || !courseId) {
            res.status(400).json({ 
                error: "userId e courseId são obrigatórios" 
            });
            return;
        }
        
        const data = await enrollmentService.createEnrollment(userId, courseId);
        res.status(201).json({ message: "Inscrição criada com sucesso!", data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const cancelEnrollment = async (req: Request, res: Response): Promise<void> => {
    try {
        const enrollmentService = new EnrollmentService();
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
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const reactivateEnrollment = async (req: Request, res: Response): Promise<void> => {
    try {
        const enrollmentService = new EnrollmentService();
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
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserEnrollments = async (req: Request, res: Response): Promise<void> => {
    try {
        const enrollmentService = new EnrollmentService();
        const { userId } = req.params;
        const { activeOnly = 'true' } = req.query;
        
        const data = await enrollmentService.findUserEnrollments(userId, activeOnly === 'true');
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getCourseEnrollments = async (req: Request, res: Response): Promise<void> => {
    try {
        const enrollmentService = new EnrollmentService();
        const { courseId } = req.params;
        const { activeOnly = 'true' } = req.query;
        
        const data = await enrollmentService.findCourseEnrollments(courseId, activeOnly === 'true');
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getEnrollmentStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const enrollmentService = new EnrollmentService();
        const data = await enrollmentService.getEnrollmentStats();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const checkUserEnrollment = async (req: Request, res: Response): Promise<void> => {
    try {
        const enrollmentService = new EnrollmentService();
        const { userId, courseId } = req.params;
        
        const isEnrolled = await enrollmentService.isUserEnrolled(userId, courseId);
        res.json({ isEnrolled });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}