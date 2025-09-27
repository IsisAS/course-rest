import BaseService from "../../base/base.service";
import { ICourse } from "./course.model";
import { IEnrollment } from "../enrollment/enrollment.model";
import CourseRepository from "./course.repository";
import EnrollmentService from "../enrollment/enrollment.service";

export class CourseService extends BaseService<ICourse> {
    private courseRepository: CourseRepository;
    private enrollmentService: EnrollmentService;

    constructor() {
        super(CourseRepository);
        this.courseRepository = new CourseRepository();
        this.enrollmentService = new EnrollmentService();
    }

    // Método para registrar usuário em um curso
    public async register(props: { courseId: string; userId: string }): Promise<IEnrollment> {
        // Verificar se o curso existe e está ativo
        const course = await this.courseRepository.findById(props.courseId);
        if (!course || !course.isActive) {
            throw new Error("Curso não encontrado ou inativo");
        }

        // Verificar se o usuário já está inscrito
        const existingEnrollment = await this.enrollmentService.findOne({
            courseId: props.courseId,
            userId: props.userId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });

        if (existingEnrollment) {
            throw new Error("Usuário já está inscrito neste curso");
        }

        // Criar a inscrição
        const enrollment = await this.enrollmentService.create({
            courseId: props.courseId,
            userId: props.userId,
            isEnrollmentCanceled: false,
            isEnrolled: true,
        });

        // Incrementar contador de inscrições do curso
        await this.courseRepository.incrementEnrollmentCount(props.courseId);

        return enrollment;
    }

    // Método para cancelar inscrição
    public async cancelRegistration(props: { courseId: string; userId: string }): Promise<IEnrollment> {
        const enrollment = await this.enrollmentService.findOne({
            courseId: props.courseId,
            userId: props.userId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });

        if (!enrollment || !enrollment._id) {
            throw new Error("Inscrição não encontrada");
        }

        // Cancelar a inscrição
        const updatedEnrollment = await this.enrollmentService.updateById(enrollment._id, {
            isEnrollmentCanceled: true,
            isEnrolled: false
        });

        // Decrementar contador de inscrições do curso
        await this.courseRepository.decrementEnrollmentCount(props.courseId);

        return updatedEnrollment!;
    }

    // Método para buscar cursos disponíveis
    public async findAvailableCourses(): Promise<ICourse[]> {
        return this.repository.find({ isEnrolled: false, enrollmentCancelled: false });
    }

    // Método para buscar cursos por nome
    public async searchCoursesByName(name: string): Promise<ICourse[]> {
        return this.repository.find({ name: { $regex: name, $options: 'i' } } as any);
    }

    // Método para buscar cursos com filtros
    public async findCoursesWithFilters(
        filters: {
            name?: string;
            startDate?: { from?: Date; to?: Date };
            isEnrolled?: boolean;
        } = {},
        page: number = 1,
        limit: number = 10
    ): Promise<{
        data: ICourse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const mongoFilters: any = {};

        if (filters.name) {
            mongoFilters.name = { $regex: filters.name, $options: 'i' };
        }

        if (filters.startDate) {
            mongoFilters.startDate = {};
            if (filters.startDate.from) {
                mongoFilters.startDate.$gte = filters.startDate.from;
            }
            if (filters.startDate.to) {
                mongoFilters.startDate.$lte = filters.startDate.to;
            }
        }

        if (filters.isEnrolled !== undefined) {
            mongoFilters.isEnrolled = filters.isEnrolled;
        }

        return this.repository.paginate(mongoFilters, page, limit);
    }

    // Método para buscar cursos populares
    public async findPopularCourses(limit: number = 10): Promise<ICourse[]> {
        const courses = await this.repository.find({}, { sort: { enrollmentsCount: -1 }, limit });
        return courses;
    }

    // Método para cancelar curso
    public async cancelCourse(courseId: string): Promise<ICourse | null> {
        return this.repository.updateById(courseId, { enrollmentCancelled: true });
    }

    // Método para verificar se usuário está inscrito em um curso
    public async isUserEnrolledInCourse(userId: string, courseId: string): Promise<boolean> {
        const enrollment = await this.enrollmentService.findOne({
            userId,
            courseId,
            isEnrolled: true,
            isEnrollmentCanceled: false
        });
        return !!enrollment;
    }
}

export default CourseService;