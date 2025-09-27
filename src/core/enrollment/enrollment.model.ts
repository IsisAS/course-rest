import { Schema, Types } from 'mongoose';
import { BaseModel, IBaseModel } from '../../base/models/BaseModel';

export interface IEnrollment extends IBaseModel {
    userId: string;
    courseId: string;
    isEnrollmentCanceled: boolean;
    isEnrolled: boolean;
}

export class EnrollmentModel extends BaseModel<IEnrollment> {
    constructor() {
        const enrollmentSchema = new Schema<IEnrollment>({
            userId: {
                type: String,
                required: true,
                ref: 'User'
            },
            courseId: {
                type: String,
                required: true,
                ref: 'Course'
            },
            isEnrollmentCanceled: {
                type: Boolean,
                default: false
            },
            isEnrolled: {
                type: Boolean,
                default: true
            }
        });

        // Índice único composto para evitar inscrições duplicadas
        enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
        
        // Índices para melhor performance
        enrollmentSchema.index({ userId: 1 });
        enrollmentSchema.index({ courseId: 1 });
        enrollmentSchema.index({ isEnrolled: 1 });

        super('Enrollment', enrollmentSchema);
    }

    // Método para criar inscrição com validação
    public async createEnrollment(userId: string, courseId: string): Promise<IEnrollment> {
        // Verifica se já existe uma inscrição ativa
        const existingEnrollment = await this.findOne({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });

        if (existingEnrollment) {
            throw new Error('Usuário já está inscrito neste curso');
        }

        return await this.create({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
    }

    // Método para cancelar inscrição
    public async cancelEnrollment(userId: string, courseId: string): Promise<IEnrollment | null> {
        return await this.updateOne(
            { userId, courseId },
            {
                isEnrollmentCanceled: true,
                isEnrolled: false
            }
        );
    }

    // Método para reativar inscrição
    public async reactivateEnrollment(userId: string, courseId: string): Promise<IEnrollment | null> {
        return await this.updateOne(
            { userId, courseId },
            {
                isEnrollmentCanceled: false,
                isEnrolled: true
            }
        );
    }

    // Método para buscar inscrições de um usuário
    public async findUserEnrollments(userId: string, activeOnly: boolean = true): Promise<any[]> {
        const filter: any = { userId };
        
        if (activeOnly) {
            filter.isEnrolled = true;
            filter.isEnrollmentCanceled = false;
        }

        return await this.model.find(filter)
            .populate('courseId', 'name description cover startDate')
            .lean();
    }

    // Método para buscar inscrições de um curso
    public async findCourseEnrollments(courseId: string, activeOnly: boolean = true): Promise<any[]> {
        const filter: any = { courseId };
        
        if (activeOnly) {
            filter.isEnrolled = true;
            filter.isEnrollmentCanceled = false;
        }

        return await this.model.find(filter)
            .populate('userId', 'name email')
            .lean();
    }

    // Método para contar inscrições ativas de um curso
    public async countActiveEnrollments(courseId: string): Promise<number> {
        return await this.count({
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
    }

    // Método para verificar se usuário está inscrito em um curso
    public async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
        return await this.exists({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
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
        const skip = (page - 1) * limit;
        
        const [data, total] = await Promise.all([
            this.model.find(filters)
                .populate('userId', 'name email')
                .populate('courseId', 'name description cover')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.count(filters)
        ]);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    // Método para buscar estatísticas de inscrições
    public async getEnrollmentStats(): Promise<{
        totalEnrollments: number;
        activeEnrollments: number;
        canceledEnrollments: number;
    }> {
        const [total, active, canceled] = await Promise.all([
            this.count({}),
            this.count({ isEnrolled: true, isEnrollmentCanceled: false }),
            this.count({ isEnrollmentCanceled: true })
        ]);

        return {
            totalEnrollments: total,
            activeEnrollments: active,
            canceledEnrollments: canceled
        };
    }
}

// Singleton instance
export const enrollmentModel = new EnrollmentModel();