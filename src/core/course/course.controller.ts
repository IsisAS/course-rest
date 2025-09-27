import { Request, Response } from "express";
import { CourseService } from "./course.service";

export const getAllCourses = async (req: Request, res: Response) => {
	try {
		const courseService = new CourseService();
		const { page = 1, limit = 10, name, startDate, isEnrolled } = req.query;
		
		const filters: any = {};
		if (name) filters.name = name;
		if (startDate) filters.startDate = { from: new Date(startDate as string) };
		if (isEnrolled !== undefined) filters.isEnrolled = isEnrolled === 'true';
		
		const data = await courseService.findCoursesWithFilters(
			filters,
			Number(page),
			Number(limit)
		);
		
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const create = async (req: Request, res: Response) => {
	try {
		const courseService = new CourseService();
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
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const findById = async (req: Request, res: Response) => {
	try {
		const courseService = new CourseService();
		const { id } = req.params;
		
		const data = await courseService.findById(id);
		
		if (!data) {
			res.status(404).json({ error: "Curso não encontrado" });
			return;
		}
		
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const courseService = new CourseService();
		const { userId, courseId } = req.body;
		
		if (!userId || !courseId) {
			res.status(400).json({
				error: "userId e courseId são obrigatórios"
			});
			return;
		}
		
		const data = await courseService.register({ userId, courseId });
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const cancelRegistration = async (req: Request, res: Response) => {
	try {
		const courseService = new CourseService();
		const { userId, courseId } = req.body;
		
		if (!userId || !courseId) {
			res.status(400).json({
				error: "userId e courseId são obrigatórios"
			});
			return;
		}
		
		const data = await courseService.cancelRegistration({ userId, courseId });
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getAvailableCourses = async (req: Request, res: Response) => {
	try {
		const courseService = new CourseService();
		const data = await courseService.findAvailableCourses();
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getPopularCourses = async (req: Request, res: Response) => {
	try {
		const courseService = new CourseService();
		const { limit = 10 } = req.query;
		const data = await courseService.findPopularCourses(Number(limit));
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const searchCourses = async (req: Request, res: Response) => {
	try {
		const courseService = new CourseService();
		const { name } = req.query;
		
		if (!name) {
			res.status(400).json({ error: "Nome para busca é obrigatório" });
			return;
		}
		
		const data = await courseService.searchCoursesByName(name as string);
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};