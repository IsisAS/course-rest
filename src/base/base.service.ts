import { BaseRepositoryInterface } from "./repositories/base.repository";
import { IBaseModel } from "./models/BaseModel";

export abstract class BaseService<T extends IBaseModel> {
    protected repository: BaseRepositoryInterface<T>;

    constructor(repositoryClass: new () => BaseRepositoryInterface<T>) {
        this.repository = new repositoryClass();
    }

    // Método para buscar todos os registros
    public async getAll(filters: Partial<T> = {}): Promise<T[]> {
        return await this.repository.find(filters);
    }

    // Método para buscar por ID
    public async findById(id: string): Promise<T | null> {
        return await this.repository.findById(id);
    }

    // Método para criar um novo registro
    public async create(data: Partial<T>): Promise<T> {
        return await this.repository.create(data);
    }

    // Método para atualizar por ID
    public async updateById(id: string, data: Partial<T>): Promise<T | null> {
        return await this.repository.updateById(id, data);
    }

    // Método para deletar por ID
    public async deleteById(id: string): Promise<T | null> {
        return await this.repository.deleteById(id);
    }

    // Método para buscar um registro
    public async findOne(filters: Partial<T>): Promise<T | null> {
        return await this.repository.findOne(filters);
    }

    // Método para contar registros
    public async count(filters: Partial<T> = {}): Promise<number> {
        return await this.repository.count(filters);
    }

    // Método para verificar se existe
    public async exists(filters: Partial<T>): Promise<boolean> {
        return await this.repository.exists(filters);
    }

    // Método para paginação
    public async paginate(
        filters: Partial<T> = {},
        page: number = 1,
        limit: number = 10,
        sort: any = {}
    ): Promise<{
        data: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        return await this.repository.paginate(filters, page, limit, sort);
    }

    // Método para buscar primeiro registro (compatibilidade)
    public async first(filters: Partial<T>): Promise<T | null> {
        return await this.repository.findOne(filters);
    }

    // Método para buscar múltiplos registros (compatibilidade)
    public async findMany(filters: Partial<T> = {}): Promise<T[]> {
        return await this.repository.find(filters);
    }
}

export default BaseService;