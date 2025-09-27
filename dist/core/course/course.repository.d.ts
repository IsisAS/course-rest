import { BaseRepository } from "../../base/repositories/base.repository";
import { ICourse } from "./course.model";
export declare class CourseRepository extends BaseRepository<ICourse> {
    constructor();
    findAvailable(): Promise<ICourse[]>;
    searchByName(name: string): Promise<ICourse[]>;
    incrementEnrollmentCount(id: string): Promise<ICourse | null>;
    decrementEnrollmentCount(id: string): Promise<ICourse | null>;
    findWithFilters(filters?: {
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
    findPopular(limit?: number): Promise<ICourse[]>;
    cancelCourse(id: string): Promise<ICourse | null>;
}
export default CourseRepository;
//# sourceMappingURL=course.repository.d.ts.map