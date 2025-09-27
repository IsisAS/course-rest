declare const options: {
    definition: {
        openapi: string;
        info: {
            title: string;
            version: string;
            description: string;
            contact: {
                name: string;
                email: string;
            };
        };
        servers: {
            url: string;
            description: string;
        }[];
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: string;
                    scheme: string;
                    bearerFormat: string;
                };
            };
            schemas: {
                User: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        name: {
                            type: string;
                            description: string;
                        };
                        email: {
                            type: string;
                            format: string;
                            description: string;
                        };
                        createdAt: {
                            type: string;
                            format: string;
                            description: string;
                        };
                    };
                };
                Course: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        title: {
                            type: string;
                            description: string;
                        };
                        description: {
                            type: string;
                            description: string;
                        };
                        instructor: {
                            type: string;
                            description: string;
                        };
                        duration: {
                            type: string;
                            description: string;
                        };
                        createdAt: {
                            type: string;
                            format: string;
                            description: string;
                        };
                    };
                };
                Enrollment: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        userId: {
                            type: string;
                            description: string;
                        };
                        courseId: {
                            type: string;
                            description: string;
                        };
                        enrolledAt: {
                            type: string;
                            format: string;
                            description: string;
                        };
                        status: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                    };
                };
                Error: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                            description: string;
                        };
                        status: {
                            type: string;
                            description: string;
                        };
                    };
                };
            };
        };
    };
    apis: string[];
};
export declare const specs: object;
export default options;
//# sourceMappingURL=swagger.d.ts.map