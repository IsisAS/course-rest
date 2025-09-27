import { BaseModel, IBaseModel } from '../../base/models/BaseModel';
export interface IEnrollment extends IBaseModel {
    userId: string;
    courseId: string;
    isEnrollmentCanceled: boolean;
    isEnrolled: boolean;
}
export declare class EnrollmentModel extends BaseModel<IEnrollment> {
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
}
export declare const enrollmentModel: EnrollmentModel;
//# sourceMappingURL=enrollment.model.d.ts.map