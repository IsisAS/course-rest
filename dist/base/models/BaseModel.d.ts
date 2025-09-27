import { Document, Schema, Model } from 'mongoose';
export interface IBaseModel {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare abstract class BaseModel<T extends IBaseModel> {
    protected model: Model<T & Document>;
    protected schema: Schema;
    constructor(modelName: string, schema: Schema);
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(filter: any): Promise<T | null>;
    find(filter?: any, options?: any): Promise<T[]>;
    updateById(id: string, data: any): Promise<T | null>;
    updateOne(filter: any, data: any): Promise<T | null>;
    deleteById(id: string): Promise<T | null>;
    deleteOne(filter: any): Promise<T | null>;
    deleteMany(filter: any): Promise<{
        deletedCount: number;
    }>;
    count(filter?: any): Promise<number>;
    exists(filter: any): Promise<boolean>;
    paginate(filter?: any, page?: number, limit?: number, sort?: any): Promise<{
        data: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getModel(): Model<T & Document>;
}
//# sourceMappingURL=BaseModel.d.ts.map