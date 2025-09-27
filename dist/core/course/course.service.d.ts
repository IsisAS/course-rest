import BaseService from "../../base/base.service";
import { ICourse } from "./course.model";
import { IEnrollment } from "../enrollment/enrollment.model";
export declare class CourseService extends BaseService<ICourse> {
    private courseRepository;
    private enrollmentService;
    constructor();
    register(props: {
        courseId: string;
        userId: string;
    }): Promise<IEnrollment>;
    cancelRegistration(props: {
        courseId: string;
        userId: string;
    }): Promise<IEnrollment>;
    findAvailableCourses(): Promise<ICourse[]>;
    searchCoursesByName(name: string): Promise<ICourse[]>;
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
    isUserEnrolledInCourse(userId: string, courseId: string): Promise<boolean>;
}
export default CourseService;
//# sourceMappingURL=course.service.d.ts.map