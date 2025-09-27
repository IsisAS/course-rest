import express, { Router } from "express";
import AuthRoutes from "../auth/auth.routes";
import CourseRoutes from "../course/course.routes";
import UserRoutes from "../user/user.routes";
import EnrollmentRoutes from "../enrollment/enrollment.routes";

const ApiRoutes = Router();
ApiRoutes.use(express.urlencoded({ extended: true }));
ApiRoutes.use(express.json({ limit: "10mb" }));

ApiRoutes.use('/auth', AuthRoutes);
ApiRoutes.use('/user', UserRoutes);
ApiRoutes.use('/courses', CourseRoutes);
ApiRoutes.use('/enrollments', EnrollmentRoutes);


export default ApiRoutes;