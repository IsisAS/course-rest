import { IUser } from "./user.model";
import BaseService from "../../base/base.service";
import UserRepository from "./user.repository";

export class UserService extends BaseService<IUser> {
    private userRepository: UserRepository;

    constructor() {
        super(UserRepository);
        this.userRepository = new UserRepository();
    }

    public async create(userData: Partial<IUser>): Promise<IUser> {

        if (userData.birthDate && typeof userData.birthDate === 'string') {
            userData.birthDate = new Date(userData.birthDate);
        }

        return await this.userRepository.create(userData);
    }

    public async findById(id: string): Promise<any> {
        const user = await this.userRepository.findWithEnrollments(id);
        
        if (!user) {
            return null;
        }


        return {
            ...user,
            course: user.enrollments?.map((enrollment: any) => enrollment.course) || []
        };
    }

    public async validatePassword(email: string, password: string): Promise<IUser | null> {
        return await this.userRepository.validatePassword(email, password);
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return await this.userRepository.findByEmail(email);
    }

    public async updateProfile(id: string, userData: Partial<Omit<IUser, 'password'>>): Promise<IUser | null> {
        return await this.userRepository.updateProfile(id, userData);
    }

    public async changePassword(id: string, newPassword: string): Promise<IUser | null> {
        return await this.userRepository.changePassword(id, newPassword);
    }

    public async findUsersWithFilters(
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
        return await this.userRepository.findUsersWithPagination(filters, page, limit);
    }

    public async emailExists(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        return !!user;
    }

    public async findActiveUsers(): Promise<IUser[]> {
        return await this.getAll();
    }
}

export default UserService;