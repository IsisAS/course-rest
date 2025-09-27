import { BaseRepository } from "../../base/repositories/base.repository";
import { IUser, userModel } from "./user.model";

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(userModel);
    }

    public async validatePassword(email: string, password: string): Promise<IUser | null> {
        return await userModel.validatePassword(email, password);
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return await userModel.findByEmail(email);
    }

    public async create(userData: Partial<IUser>): Promise<IUser> {
        return await userModel.create(userData);
    }

    public async updateProfile(id: string, userData: Partial<Omit<IUser, 'password'>>): Promise<IUser | null> {
        return await userModel.updateProfile(id, userData);
    }

    public async changePassword(id: string, newPassword: string): Promise<IUser | null> {
        return await userModel.changePassword(id, newPassword);
    }

    public async findWithEnrollments(id: string): Promise<any> {
        return await userModel.findWithEnrollments(id);
    }

    public async findUsersWithPagination(
        filters: {
            name?: string;
            email?: string;
        } = {},
        page: number = 1,
        limit: number = 10
    ): Promise<{
        data: IUser[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const query: any = {};


        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }


        if (filters.email) {
            query.email = { $regex: filters.email, $options: 'i' };
        }

        return await this.paginate(query, page, limit, { name: 1 });
    }
}

export default UserRepository;