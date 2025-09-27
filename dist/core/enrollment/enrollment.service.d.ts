import { BaseService } from "../../base/base.service";
import { IEnrollment } from "./enrollment.model";
export declare class EnrollmentService extends BaseService<IEnrollment> {
    private enrollmentRepository;
    constructor();
    createEnrollment(userId: string, courseId: string): Promise<IEnrollment>;
    cancelEnrollment(userId: string, courseId: string): Promise<IEnrollment | null>;
    reactivateEnrollment(userId: string, courseId: string): Promise<IEnrollment | null>;
    findUserEnrollments(userId: string, activeOnly?: boolean): Promise<any[]>;
    findCourseEnrollments(courseId: string, activeOnly?: boolean): Promise<any[]>;
    countActiveEnrollments(courseId: string): Promise<number>;
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
    findActiveEnrollments(): Promise<IEnrollment[]>;
    findCanceledEnrollments(): Promise<IEnrollment[]>;
}
export default EnrollmentService;
//# sourceMappingURL=enrollment.service.d.ts.map