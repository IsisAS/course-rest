import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBaseModel {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export abstract class BaseModel<T extends IBaseModel> {
    protected model: Model<T & Document>;
    protected schema: Schema;

    constructor(modelName: string, schema: Schema) {
        this.schema = schema;
        
        if (!schema.paths.createdAt) {
            schema.add({ createdAt: { type: Date, default: Date.now } });
        }
        if (!schema.paths.updatedAt) {
            schema.add({ updatedAt: { type: Date, default: Date.now } });
        }

        schema.pre('save', function(next) {
            if (this.isModified() && !this.isNew) {
                this.updatedAt = new Date();
            }
            next();
        });

        schema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
            this.set({ updatedAt: new Date() });
            next();
        });

        this.model = mongoose.model<T & Document>(modelName, schema);
    }
    public async create(data: Partial<T>): Promise<T> {
        const result = await this.model.create(data);
        return result as T;
    }

    public async findById(id: string): Promise<T | null> {
        const result = await this.model.findById(id).lean();
        return result as T | null;
    }

    public async findOne(filter: any): Promise<T | null> {
        const result = await this.model.findOne(filter).lean();
        return result as T | null;
    }

    public async find(filter: any = {}, options: any = {}): Promise<T[]> {
        const result = await this.model.find(filter, null, options).lean();
        return result as T[];
    }

    public async updateById(id: string, data: any): Promise<T | null> {
        const result = await this.model.findByIdAndUpdate(id, data, { new: true }).lean();
        return result as T | null;
    }

    public async updateOne(filter: any, data: any): Promise<T | null> {
        const result = await this.model.findOneAndUpdate(filter, data, { new: true }).lean();
        return result as T | null;
    }

    public async deleteById(id: string): Promise<T | null> {
        const result = await this.model.findByIdAndDelete(id).lean();
        return result as T | null;
    }

    public async deleteOne(filter: any): Promise<T | null> {
        const result = await this.model.findOneAndDelete(filter).lean();
        return result as T | null;
    }

    public async deleteMany(filter: any): Promise<{ deletedCount: number }> {
        return await this.model.deleteMany(filter);
    }

    public async count(filter: any = {}): Promise<number> {
        return await this.model.countDocuments(filter);
    }

    public async exists(filter: any): Promise<boolean> {
        const result = await this.model.exists(filter);
        return result !== null;
    }
    public async paginate(
        filter: any = {},
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
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter)
        ]);

        return {
            data: data as T[],
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    public getModel(): Model<T & Document> {
        return this.model;
    }
}