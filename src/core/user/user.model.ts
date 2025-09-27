import { Schema } from 'mongoose';
import { BaseModel, IBaseModel } from '../../base/models/BaseModel';
import * as bcrypt from 'bcryptjs';

export interface IUser extends IBaseModel {
    name: string;
    email: string;
    password: string;
    birthDate: Date;
}

export class UserModel extends BaseModel<IUser> {
    constructor() {
        const userSchema = new Schema<IUser>({
            name: {
                type: String,
                required: true,
                trim: true,
                maxlength: 255
            },
            email: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                lowercase: true,
                maxlength: 255
            },
            password: {
                type: String,
                required: true,
                minlength: 6
            },
            birthDate: {
                type: Date,
                required: true
            }
        });


        userSchema.pre('save', async function(next) {
            if (!this.isModified('password')) return next();
            
            try {
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password, salt);
                next();
            } catch (error) {
                next(error as any);
            }
        });

        super('User', userSchema);
    }

    public async validatePassword(email: string, password: string): Promise<IUser | null> {
        const user = await this.model.findOne({ email }).lean();
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({ email }).lean();
    }

    public async create(userData: Partial<IUser>): Promise<IUser> {

        if (userData.email) {
            const existingUser = await this.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email já está em uso');
            }
        }

        return await super.create(userData);
    }

    public async updateProfile(id: string, userData: Partial<Omit<IUser, 'password'>>): Promise<IUser | null> {
        return await this.updateById(id, userData);
    }

    public async changePassword(id: string, newPassword: string): Promise<IUser | null> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        return await this.updateById(id, { password: hashedPassword });
    }

    public async findWithEnrollments(id: string): Promise<any> {
        return await this.model.findById(id)
            .populate({
                path: 'enrollments',
                populate: {
                    path: 'course',
                    model: 'Course'
                }
            })
            .lean();
    }
}
export const userModel = new UserModel();