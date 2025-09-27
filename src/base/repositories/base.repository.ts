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
    deleteMany(filter: Partial<T>): Promise<{ deletedCount: number }>;
    count(filter?: Partial<T>): Promise<number>;
    exists(filter: Partial<T>): Promise<boolean>;
    paginate(
        filter?: Partial<T>,
        page?: number,
        limit?: number,
        sort?: any
    ): Promise<{
        data: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}

export abstract class BaseRepository<T extends IBaseModel> implements BaseRepositoryInterface<T> {
    protected model: BaseModel<T>;

    constructor(model: BaseModel<T>) {
        this.model = model;
    }

    public async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    public async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    public async findOne(filter: Partial<T>): Promise<T | null> {
        return await this.model.findOne(filter);
    }

    public async find(filter: Partial<T> = {}, options: any = {}): Promise<T[]> {
        return await this.model.find(filter, options);
    }

    public async findMany(filter: Partial<T> = {}, options: any = {}): Promise<T[]> {
        return await this.model.find(filter, options);
    }

    public async updateById(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.updateById(id, data);
    }

    public async updateOne(filter: Partial<T>, data: Partial<T>): Promise<T | null> {
        return await this.model.updateOne(filter, data);
    }

    public async deleteById(id: string): Promise<T | null> {
        return await this.model.deleteById(id);
    }

    public async deleteOne(filter: Partial<T>): Promise<T | null> {
        return await this.model.deleteOne(filter);
    }

    public async deleteMany(filter: Partial<T>): Promise<{ deletedCount: number }> {
        return await this.model.deleteMany(filter);
    }

    public async count(filter: Partial<T> = {}): Promise<number> {
        return await this.model.count(filter);
    }

    public async exists(filter: Partial<T>): Promise<boolean> {
        return await this.model.exists(filter);
    }

    public async paginate(
        filter: Partial<T> = {},
        page: number = 1,
        limit: number = 10,
        sort: any = { createdAt: -1 }
    ): Promise<{
        data: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        return await this.model.paginate(filter, page, limit, sort);
    }

    // Método para acessar o modelo diretamente quando necessário
    protected getModel(): BaseModel<T> {
        return this.model;
    }
}

export type id = string;

export const parseId = function (value: any): string {
    return typeof value === 'string' ? value : String(value);
};