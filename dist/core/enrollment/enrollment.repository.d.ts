import { BaseRepository } from "../../base/repositories/base.repository";
import { IEnrollment } from "./enrollment.model";
export declare class EnrollmentRepository extends BaseRepository<IEnrollment> {
    constructor();
    createEnrollment(userId: string, courseId: string): Promise<IEnrollment>;
    cancelEnrollment(userId: string, courseId: string): Promise<IEnrollment | null>;
    reactivateEnrollment(userId: string, courseId: string): Promise<IEnrollment | null>;
    findUserEnrollments(userId: string, activeOnly?: boolean): Promise<any[]>;
    findCourseEnrollments(courseId: string, activeOnly?: boolean): Promise<any[]>;
    isUserEnrolled(userId: string, courseId: string): Promise<boolean>;
    findEnrollmentsWithPagination(filters?: {
        userId?: string;
        courseId?: string;
        isEnrolled?: boolean;
        isEnrollmentCanceled?: boolean;
    }, page?: number, limit?: number): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getEnrollmentStats(): Promise<{
        totalEnrollments: number;
        activeEnrollments: number;
        canceledEnrollments: number;
    }>;
}
export default EnrollmentRepository;
//# sourceMappingURL=enrollment.repository.d.ts.map