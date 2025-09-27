import { BaseModel, IBaseModel } from '../models/BaseModel';
export interface BaseRepositoryInterface<T extends IBaseModel> {
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(filter: Partial<T>): Promise<T | null>;
    find(filter?: Partial<T>, options?: any): Promise<T[]>;
    updateById(id: string, data: Partial<T>): Promise<T | null>;
    updateOne(filter: Partial<T>, data: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<T | null>;
    deleteOne(filter: Partial<T>): Promise<T | null>;
    deleteMany(filter: Partial<T>): Promise<{
        deletedCount: number;
    }>;
    count(filter?: Partial<T>): Promise<number>;
    exists(filter: Partial<T>): Promise<boolean>;
    paginate(filter?: Partial<T>, page?: number, limit?: number, sort?: any): Promise<{
        data: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
export declare abstract class BaseRepository<T extends IBaseModel> implements BaseRepositoryInterface<T> {
    protected model: BaseModel<T>;
    constructor(model: BaseModel<T>);
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(filter: Partial<T>): Promise<T | null>;
    find(filter?: Partial<T>, options?: any): Promise<T[]>;
    findMany(filter?: Partial<T>, options?: any): Promise<T[]>;
    updateById(id: string, data: Partial<T>): Promise<T | null>;
    updateOne(filter: Partial<T>, data: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<T | null>;
    deleteOne(filter: Partial<T>): Promise<T | null>;
    deleteMany(filter: Partial<T>): Promise<{
        deletedCount: number;
    }>;
    count(filter?: Partial<T>): Promise<number>;
    exists(filter: Partial<T>): Promise<boolean>;
    paginate(filter?: Partial<T>, page?: number, limit?: number, sort?: any): Promise<{
        data: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    protected getModel(): BaseModel<T>;
}
export type id = string;
export declare const parseId: (value: any) => string;
//# sourceMappingURL=base.repository.d.ts.map