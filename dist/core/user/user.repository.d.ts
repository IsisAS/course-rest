import { BaseRepository } from "../../base/repositories/base.repository";
import { IUser } from "./user.model";
export declare class UserRepository extends BaseRepository<IUser> {
    constructor();
    validatePassword(email: string, password: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    create(userData: Partial<IUser>): Promise<IUser>;
    updateProfile(id: string, userData: Partial<Omit<IUser, 'password'>>): Promise<IUser | null>;
    changePassword(id: string, newPassword: string): Promise<IUser | null>;
    findWithEnrollments(id: string): Promise<any>;
    findUsersWithPagination(filters?: {
        name?: string;
        email?: string;
    }, page?: number, limit?: number): Promise<{
        data: IUser[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
export default UserRepository;
//# sourceMappingURL=user.repository.d.ts.map