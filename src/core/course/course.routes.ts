import { Router } from "express";
import * as CourseController from "./course.controller";
import { authenticateToken } from "../api/middleware/auth";

const CourseRoutes = Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Listar todos os cursos
 *     description: Retorna uma lista de todos os cursos disponíveis
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
CourseRoutes.get("/", CourseController.getAllCourses);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Criar novo curso
 *     description: Cria um novo curso no sistema
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - instructor
 *               - duration
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do curso
 *                 example: Introdução ao JavaScript
 *               description:
 *                 type: string
 *                 description: Descrição detalhada do curso
 *                 example: Curso completo de JavaScript para iniciantes
 *               instructor:
 *                 type: string
 *                 description: Nome do instrutor
 *                 example: Maria Silva
 *               duration:
 *                 type: number
 *                 description: Duração do curso em horas
 *                 example: 40
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticação inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
CourseRoutes.post("/", authenticateToken, CourseController.create);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Buscar curso por ID
 *     description: Retorna os dados de um curso específico
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
CourseRoutes.get("/:id", CourseController.findById);

/**
 * @swagger
 * /courses/register:
 *   post:
 *     summary: Registrar-se em um curso
 *     description: Permite que um usuário se registre em um curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID do curso para registro
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Registro realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: Dados inválidos ou usuário já registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticação inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Curso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
CourseRoutes.post("/register", authenticateToken, CourseController.register);

CourseRoutes.post("/cancel", authenticateToken, CourseController.cancelRegistration);

/**
 * @swagger
 * /courses/available/list:
 *   get:
 *     summary: Listar cursos disponíveis
 *     description: Retorna uma lista de cursos disponíveis para matrícula
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
CourseRoutes.get("/available/list", CourseController.getAvailableCourses);

/**
 * @swagger
 * /courses/popular/list:
 *   get:
 *     summary: Listar cursos populares
 *     description: Retorna uma lista dos cursos mais populares
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos populares
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
CourseRoutes.get("/popular/list", CourseController.getPopularCourses);

/**
 * @swagger
 * /courses/search/name:
 *   get:
 *     summary: Buscar cursos por nome
 *     description: Busca cursos que contenham o termo especificado no nome
 *     tags: [Cursos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Termo de busca para o nome do curso
 *         example: javascript
 *     responses:
 *       200:
 *         description: Resultados da busca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
CourseRoutes.get("/search/name", CourseController.searchCourses);

export default CourseRoutes;