import { BaseRepository } from "../../base/repositories/base.repository";
import { ICourse, courseModel } from "./course.model";

export class CourseRepository extends BaseRepository<ICourse> {
    constructor() {
        super(courseModel);
    }

    // Método para buscar cursos disponíveis
    public async findAvailable(): Promise<ICourse[]> {
        return await courseModel.findAvailableCourses();
    }

    // Método para buscar cursos por nome
    public async searchByName(name: string): Promise<ICourse[]> {
        return await courseModel.searchByName(name);
    }

    // Método para incrementar contador de inscrições
    public async incrementEnrollmentCount(id: string): Promise<ICourse | null> {
        return await courseModel.incrementEnrollmentCount(id);
    }

    // Método para decrementar contador de inscrições
    public async decrementEnrollmentCount(id: string): Promise<ICourse | null> {
        return await courseModel.decrementEnrollmentCount(id);
    }

    // Método para buscar cursos com filtros e paginação
    public async findWithFilters(
        filters: {
            name?: string;
            startDate?: { from?: Date; to?: Date };
            isEnrolled?: boolean;
        } = {},
        page: number = 1,
        limit: number = 10
    ): Promise<{
        data: ICourse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        return await courseModel.findCoursesWithFilters(filters, page, limit);
    }

    // Método para buscar cursos populares
    public async findPopular(limit: number = 10): Promise<ICourse[]> {
        return await courseModel.findPopularCourses(limit);
    }

    // Método para cancelar curso
    public async cancelCourse(id: string): Promise<ICourse | null> {
        return await courseModel.cancelCourse(id);
    }
}

export default CourseRepository;