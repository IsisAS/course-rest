import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { UserInterface } from "../user/user.interface";
import UserRepository from "../user/user.repository";
import * as bcrypt from 'bcryptjs';

export default class AuthService {
    userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(email: string, password: string) {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }

        const user = <UserInterface>await this.userRepository
            .findOne({
                email: email || ""
            });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                throw new Error("Senha incorreta");
            }

            const token = jwt.sign(
                { id: user.id }, 
                process.env.JWT_SECRET as Secret, 
                { expiresIn: "1h" } 
            );
            
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                token: token,
            }
        }
    }
}