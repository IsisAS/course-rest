import { Request, Response, NextFunction } from 'express';
interface AuthenticatedRequest extends Request {
    userId?: number;
}
export declare const authenticateToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => any;
export {};
//# sourceMappingURL=auth.d.ts.map