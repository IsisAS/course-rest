import { Router } from "express";
import * as EnrollmentController from "./enrollment.controller";
import { authenticateToken } from "../api/middleware/auth";

const EnrollmentRoutes = Router();

EnrollmentRoutes.get("/", EnrollmentController.getAllEnrollments);
EnrollmentRoutes.post("/", authenticateToken, EnrollmentController.create);
EnrollmentRoutes.post("/cancel", authenticateToken, EnrollmentController.cancelEnrollment);
EnrollmentRoutes.post("/reactivate", authenticateToken, EnrollmentController.reactivateEnrollment);
EnrollmentRoutes.get("/user/:userId", EnrollmentController.getUserEnrollments);
EnrollmentRoutes.get("/course/:courseId", EnrollmentController.getCourseEnrollments);
EnrollmentRoutes.get("/stats", EnrollmentController.getEnrollmentStats);
EnrollmentRoutes.get("/check/:userId/:courseId", EnrollmentController.checkUserEnrollment);

export default EnrollmentRoutes;