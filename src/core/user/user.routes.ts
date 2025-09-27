import { Router } from "express";
import * as UserController from "./user.controller";
import { authenticateToken } from "../api/middleware/auth";

const UserRoutes = Router();

UserRoutes.post("/", UserController.create);
UserRoutes.get("/", UserController.findAll);
UserRoutes.get("/:id", UserController.findById);
UserRoutes.put("/:id/profile", authenticateToken, UserController.updateProfile);
UserRoutes.put("/:id/password", authenticateToken, UserController.changePassword);

export default UserRoutes;