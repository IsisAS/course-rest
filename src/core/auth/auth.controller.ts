import { Request, Response } from "express";
import AuthService from "./auth.service";

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const authService = new AuthService();
        const { email, password } = req.body;

        console.log("ENTROU AQUI", password)
        if (!email || !password) {
            res.status(400).json({ 
                error: "Email e senha são obrigatórios" 
            });
            return;
        }

        const data = await authService.login(email, password);
        
        if (!data) {
            res.status(401).json({ 
                error: "Credenciais inválidas" 
            });
            return;
        }

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
