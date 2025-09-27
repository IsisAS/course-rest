import { BaseRepository } from "../../base/repositories/base.repository";
import { IEnrollment, enrollmentModel } from "./enrollment.model";

export class EnrollmentRepository extends BaseRepository<IEnrollment> {
    constructor() {
        super(enrollmentModel);
    }

    // Método para criar inscrição
    public async createEnrollment(userId: string, courseId: string): Promise<IEnrollment> {
        return await enrollmentModel.createEnrollment(userId, courseId);
    }

    // Método para cancelar inscrição
    public async cancelEnrollment(userId: string, courseId: string): Promise<IEnrollment | null> {
        return await enrollmentModel.cancelEnrollment(userId, courseId);
    }

    // Método para reativar inscrição
    public async reactivateEnrollment(userId: string, courseId: string): Promise<IEnrollment | null> {
        return await enrollmentModel.reactivateEnrollment(userId, courseId);
    }

    // Método para buscar inscrições de um usuário
    public async findUserEnrollments(userId: string, activeOnly: boolean = true): Promise<any[]> {
        return await enrollmentModel.findUserEnrollments(userId, activeOnly);
    }

    // Método para buscar inscrições de um curso
    public async findCourseEnrollments(courseId: string, activeOnly: boolean = true): Promise<any[]> {
        return await enrollmentModel.findCourseEnrollments(courseId, activeOnly);
    }

    // Método para verificar se usuário está inscrito em um curso
    public async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
        const enrollment = await this.findOne({ 
            userId, 
            courseId, 
            isEnrolled: true, 
            isEnrollmentCanceled: false 
        });
        return !!enrollment;
    }

    // Método para buscar inscrições com paginação
    public async findEnrollmentsWithPagination(
        filters: {
            userId?: string;
            courseId?: string;
            isEnrolled?: boolean;
            isEnrollmentCanceled?: boolean;
        } = {},
        page: number = 1,
        limit: number = 10
    ): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        return await enrollmentModel.findEnrollmentsWithPagination(filters, page, limit);
    }

    // Método para obter estatísticas de inscrições
    public async getEnrollmentStats(): Promise<{
        totalEnrollments: number;
        activeEnrollments: number;
        canceledEnrollments: number;
    }> {
        return await enrollmentModel.getEnrollmentStats();
    }
}

export default EnrollmentRepository;