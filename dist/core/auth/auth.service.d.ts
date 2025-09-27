import UserRepository from "../user/user.repository";
export default class AuthService {
    userRepository: UserRepository;
    constructor();
    login(email: string, password: string): Promise<{
        id: number | undefined;
        email: string;
        name: string;
        token: string;
    } | undefined>;
}
//# sourceMappingURL=auth.service.d.ts.map