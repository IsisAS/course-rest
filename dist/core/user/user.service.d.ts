import { IUser } from "./user.model";
import BaseService from "../../base/base.service";
export declare class UserService extends BaseService<IUser> {
    private userRepository;
    constructor();
    create(userData: Partial<IUser>): Promise<IUser>;
    findById(id: string): Promise<any>;
    validatePassword(email: string, password: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    updateProfile(id: string, userData: Partial<Omit<IUser, 'password'>>): Promise<IUser | null>;
    changePassword(id: string, newPassword: string): Promise<IUser | null>;
    findUsersWithFilters(filters?: {
        name?: string;
        email?: string;
    }, page?: number, limit?: number): Promise<{
        data: IUser[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    emailExists(email: string): Promise<boolean>;
    findActiveUsers(): Promise<IUser[]>;
}
export default UserService;
//# sourceMappingURL=user.service.d.ts.map