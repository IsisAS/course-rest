import { Schema } from 'mongoose';
import { BaseModel, IBaseModel } from '../../base/models/BaseModel';

export interface ICourse extends IBaseModel {
    name: string;
    description?: string;
    cover?: string;
    enrollmentsCount: number;
    startDate?: Date;
    isEnrolled: boolean;
    enrollmentCancelled: boolean;
    isActive: boolean;
}

export class CourseModel extends BaseModel<ICourse> {
    constructor() {
        const courseSchema = new Schema<ICourse>({
            name: {
                type: String,
                required: true,
                trim: true,
                maxlength: 255
            },
            description: {
                type: String,
                trim: true
            },
            cover: {
                type: String,
                maxlength: 500
            },
            enrollmentsCount: {
                type: Number,
                default: 0,
                min: 0
            },
            startDate: {
                type: Date
            },
            isEnrolled: {
                type: Boolean,
                default: false
            },
            enrollmentCancelled: {
                type: Boolean,
                default: false
            },
            isActive: {
                type: Boolean,
                default: true
            }
        });

        // Índices para melhor performance
        courseSchema.index({ name: 1 });
        courseSchema.index({ startDate: 1 });
        courseSchema.index({ isEnrolled: 1 });

        super('Course', courseSchema);
    }

    // Método para buscar cursos disponíveis
    public async findAvailableCourses(): Promise<ICourse[]> {
        return await this.find({
            enrollmentCancelled: false
        });
    }

    // Método para buscar cursos por nome (busca parcial)
    public async searchByName(name: string): Promise<ICourse[]> {
        return await this.model.find({
            name: { $regex: name, $options: 'i' },
            enrollmentCancelled: false
        }).lean();
    }

    // Método para incrementar contador de inscrições
    public async incrementEnrollmentCount(courseId: string): Promise<ICourse | null> {
        return await this.model.findByIdAndUpdate(
            courseId,
            { $inc: { enrollmentsCount: 1 } },
            { new: true }
        ).lean();
    }

    // Método para decrementar contador de inscrições
    public async decrementEnrollmentCount(courseId: string): Promise<ICourse | null> {
        return await this.model.findByIdAndUpdate(
            courseId,
            { $inc: { enrollmentsCount: -1 } },
            { new: true }
        ).lean();
    }

    // Método para buscar cursos com paginação e filtros
    public async findCoursesWithFilters(
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
        const query: any = { enrollmentCancelled: false };

        // Filtro por nome
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }

        // Filtro por data de início
        if (filters.startDate) {
            query.startDate = {};
            if (filters.startDate.from) {
                query.startDate.$gte = filters.startDate.from;
            }
            if (filters.startDate.to) {
                query.startDate.$lte = filters.startDate.to;
            }
        }

        // Filtro por status de inscrição
        if (filters.isEnrolled !== undefined) {
            query.isEnrolled = filters.isEnrolled;
        }

        return await this.paginate(query, page, limit, { startDate: 1, name: 1 });
    }

    // Método para buscar cursos populares (com mais inscrições)
    public async findPopularCourses(limit: number = 10): Promise<ICourse[]> {
        return await this.model.find({
            enrollmentCancelled: false
        })
        .sort({ enrollmentsCount: -1 })
        .limit(limit)
        .lean();
    }

    // Método para marcar curso como cancelado
    public async cancelCourse(courseId: string): Promise<ICourse | null> {
        return await this.updateById(courseId, {
            enrollmentCancelled: true,
            isEnrolled: false
        });
    }
}

// Singleton instance
export const courseModel = new CourseModel();