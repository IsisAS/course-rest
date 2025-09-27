import { BaseRepositoryInterface } from "./repositories/base.repository";
import { IBaseModel } from "./models/BaseModel";
export declare abstract class BaseService<T extends IBaseModel> {
    protected repository: BaseRepositoryInterface<T>;
    constructor(repositoryClass: new () => BaseRepositoryInterface<T>);
    getAll(filters?: Partial<T>): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    updateById(id: string, data: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<T | null>;
    findOne(filters: Partial<T>): Promise<T | null>;
    count(filters?: Partial<T>): Promise<number>;
    exists(filters: Partial<T>): Promise<boolean>;
    paginate(filters?: Partial<T>, page?: number, limit?: number, sort?: any): Promise<{
        data: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    first(filters: Partial<T>): Promise<T | null>;
    findMany(filters?: Partial<T>): Promise<T[]>;
}
export default BaseService;
//# sourceMappingURL=base.service.d.ts.map