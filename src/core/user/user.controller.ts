import { Request, Response } from "express";
import { UserService } from "./user.service";

export const create = async (req: Request, res: Response) => {
	try {
		const userService = new UserService();
		const props = req.body;
		
		if (!props.email || !props.password || !props.name || !props.birthDate) {
			res.status(400).json({ 
				error: "Campos obrigatórios: email, password, name, birthDate" 
			});
			return;
		}

		const data = await userService.create(props);
		res.status(201).json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const findById = async (req: Request, res: Response) => {
	try {
		const userService = new UserService();
		const { id } = req.params;
		
		const data = await userService.findById(id);
		
		if (!data) {
			res.status(404).json({ error: "Usuário não encontrado" });
			return;
		}
		
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const updateById = async (req: Request, res: Response) => {
	try {
		const userService = new UserService();
		const { id } = req.params;
		const props = req.body;
		
		const data = await userService.updateProfile(id, props);
		
		if (!data) {
			res.status(404).json({ error: "Usuário não encontrado" });
			return;
		}
		
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const updateProfile = async (req: Request, res: Response) => {
	try {
		const userService = new UserService();
		const { id } = req.params;
		const props = req.body;
		
		const data = await userService.updateProfile(id, props);
		
		if (!data) {
			res.status(404).json({ error: "Usuário não encontrado" });
			return;
		}
		
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const deleteById = async (req: Request, res: Response) => {
	try {
		const userService = new UserService();
		const { id } = req.params;
		
		const data = await userService.deleteById(id);
		
		if (!data) {
			res.status(404).json({ error: "Usuário não encontrado" });
			return;
		}
		
		res.json({ message: "Usuário deletado com sucesso" });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const findAll = async (req: Request, res: Response) => {
	try {
		const userService = new UserService();
		const { page = 1, limit = 10, name, email, birthDate } = req.query;
		
		const filters: any = {};
		if (name) filters.name = name;
		if (email) filters.email = email;
		if (birthDate) filters.birthDate = new Date(birthDate as string);
		
		const data = await userService.findUsersWithFilters(
			filters,
			Number(page),
			Number(limit)
		);
		
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const changePassword = async (req: Request, res: Response) => {
	try {
		const userService = new UserService();
		const { id } = req.params;
		const { newPassword } = req.body;
		
		if (!newPassword) {
			res.status(400).json({ error: "Nova senha é obrigatória" });
			return;
		}
		
		const data = await userService.changePassword(id, newPassword);
		
		if (!data) {
			res.status(404).json({ error: "Usuário não encontrado" });
			return;
		}
		
		res.json({ message: "Senha alterada com sucesso" });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};