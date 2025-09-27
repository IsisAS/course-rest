import { Router } from "express";
import * as UserController from "./user.controller";
import { authenticateToken } from "../api/middleware/auth";

const UserRoutes = Router();

UserRoutes.post("/", UserController.create);
UserRoutes.get("/", authenticateToken, UserController.findAll);
UserRoutes.get("/:id", authenticateToken, UserController.findById);
UserRoutes.put("/:id/profile", authenticateToken, UserController.updateProfile);
UserRoutes.put("/:id/password", authenticateToken, UserController.changePassword);

export default UserRoutes;