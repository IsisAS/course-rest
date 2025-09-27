import { BaseService } from "../../base/base.service";
import { IEnrollment } from "./enrollment.model";
import { EnrollmentRepository } from "./enrollment.repository";

export class EnrollmentService extends BaseService<IEnrollment> {
    private enrollmentRepository: EnrollmentRepository;

    constructor() {
        super(EnrollmentRepository);
        this.enrollmentRepository = new EnrollmentRepository();
    }

    // Método para criar uma nova inscrição
    public async createEnrollment(userId: string, courseId: string): Promise<IEnrollment> {
        return this.enrollmentRepository.createEnrollment(userId, courseId);
    }

    // Método para cancelar uma inscrição
    public async cancelEnrollment(userId: string, courseId: string): Promise<IEnrollment | null> {
        return this.enrollmentRepository.cancelEnrollment(userId, courseId);
    }

    // Método para reativar uma inscrição
    public async reactivateEnrollment(userId: string, courseId: string): Promise<IEnrollment | null> {
        return this.enrollmentRepository.reactivateEnrollment(userId, courseId);
    }

    // Método para buscar inscrições de um usuário
    public async findUserEnrollments(userId: string, activeOnly: boolean = true): Promise<any[]> {
        return this.enrollmentRepository.findUserEnrollments(userId, activeOnly);
    }

    // Método para buscar inscrições de um curso
    public async findCourseEnrollments(courseId: string, activeOnly: boolean = true): Promise<any[]> {
        return this.enrollmentRepository.findCourseEnrollments(courseId, activeOnly);
    }

    // Método para contar inscrições ativas de um curso
    public async countActiveEnrollments(courseId: string): Promise<number> {
        return this.repository.count({ 
            courseId, 
            isEnrolled: true, 
            isEnrollmentCanceled: false 
        });
    }

    // Método para verificar se usuário está inscrito em um curso
    public async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
        return this.enrollmentRepository.isUserEnrolled(userId, courseId);
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
        return this.enrollmentRepository.findEnrollmentsWithPagination(filters, page, limit);
    }

    // Método para obter estatísticas de inscrições
    public async getEnrollmentStats(): Promise<{
        totalEnrollments: number;
        activeEnrollments: number;
        canceledEnrollments: number;
    }> {
        return this.enrollmentRepository.getEnrollmentStats();
    }

    // Método para buscar inscrições ativas
    public async findActiveEnrollments(): Promise<IEnrollment[]> {
        return this.repository.find({ 
            isEnrolled: true, 
            isEnrollmentCanceled: false 
        });
    }

    // Método para buscar inscrições canceladas
    public async findCanceledEnrollments(): Promise<IEnrollment[]> {
        return this.repository.find({ 
            isEnrollmentCanceled: true 
        });
    }
}

export default EnrollmentService;