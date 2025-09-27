import { Router } from "express";
import * as CourseController from "./course.controller";
import { authenticateToken } from "../api/middleware/auth";

const CourseRoutes = Router();
CourseRoutes.get("/", CourseController.getAllCourses);
CourseRoutes.post("/", CourseController.create);
CourseRoutes.get("/:id", CourseController.findById);
CourseRoutes.post("/register", authenticateToken, CourseController.register);
CourseRoutes.post("/cancel", authenticateToken, CourseController.cancelRegistration);
CourseRoutes.get("/available/list", CourseController.getAvailableCourses);
CourseRoutes.get("/popular/list", CourseController.getPopularCourses);
CourseRoutes.get("/search/name", CourseController.searchCourses);

export default CourseRoutes;