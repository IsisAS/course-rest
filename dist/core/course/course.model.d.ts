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
export declare class CourseModel extends BaseModel<ICourse> {
    constructor();
    findAvailableCourses(): Promise<ICourse[]>;
    searchByName(name: string): Promise<ICourse[]>;
    incrementEnrollmentCount(courseId: string): Promise<ICourse | null>;
    decrementEnrollmentCount(courseId: string): Promise<ICourse | null>;
    findCoursesWithFilters(filters?: {
        name?: string;
        startDate?: {
            from?: Date;
            to?: Date;
        };
        isEnrolled?: boolean;
    }, page?: number, limit?: number): Promise<{
        data: ICourse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findPopularCourses(limit?: number): Promise<ICourse[]>;
    cancelCourse(courseId: string): Promise<ICourse | null>;
}
export declare const courseModel: CourseModel;
//# sourceMappingURL=course.model.d.ts.map