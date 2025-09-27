import { BaseModel, IBaseModel } from '../../base/models/BaseModel';
export interface IUser extends IBaseModel {
    name: string;
    email: string;
    password: string;
    birthDate: Date;
}
export declare class UserModel extends BaseModel<IUser> {
    constructor();
    validatePassword(email: string, password: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    create(userData: Partial<IUser>): Promise<IUser>;
    updateProfile(id: string, userData: Partial<Omit<IUser, 'password'>>): Promise<IUser | null>;
    changePassword(id: string, newPassword: string): Promise<IUser | null>;
    findWithEnrollments(id: string): Promise<any>;
}
export declare const userModel: UserModel;
//# sourceMappingURL=user.model.d.ts.map