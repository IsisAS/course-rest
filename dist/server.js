"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const api_routes_1 = __importDefault(require("./core/api/api.routes"));
const database_1 = __importDefault(require("./base/config/database"));
const swagger_1 = require("./config/swagger");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT) || 4000;
        this.host = process.env.HOST || "0.0.0.0";
        this.server = http_1.default.createServer(this.app);
        this.app.use((0, cors_1.default)({
            origin: '*',
            credentials: true
        }));
    }
    startServer() {
        this.server.listen(this.port, this.host, () => {
            const address = this.server.address();
            console.log('🚀 Server is running!');
            console.log('Endpoints:');
            console.log(`   API: http://${address.address}:${address.port}/api`);
            console.log(`   📚 API Documentation (Swagger UI): http://${address.address}:${address.port}/api/docs`);
            console.log(`   🎨 API Documentation (Scalar): http://${address.address}:${address.port}/api/scalar`);
            console.log(`   📄 OpenAPI Spec: http://${address.address}:${address.port}/api/docs.json`);
        });
    }
    async init() {
        try {
            console.log('🔄 Attempting to connect to database...');
            await database_1.default.connect();
            console.log('✅ Database connected successfully');
            this.app.set("trust proxy", 1);
            // Configurar Swagger UI
            this.app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs, {
                customCss: '.swagger-ui .topbar { display: none }',
                customSiteTitle: 'Course API Documentation',
                customfavIcon: '/favicon.ico',
                swaggerOptions: {
                    persistAuthorization: true,
                }
            }));
            // Configurar Scalar com template personalizado
            this.app.get('/api/scalar', (req, res) => {
                try {
                    const templatePath = path_1.default.join(__dirname, 'templates', 'scalar.html');
                    let htmlContent = fs_1.default.readFileSync(templatePath, 'utf8');
                    // Substituir a URL da especificação
                    const specUrl = `${req.protocol}://${req.get('host')}/api/docs.json`;
                    htmlContent = htmlContent.replace('{{SPEC_URL}}', specUrl);
                    res.setHeader('Content-Type', 'text/html');
                    res.send(htmlContent);
                }
                catch (error) {
                    console.error('Erro ao carregar template Scalar:', error);
                    res.status(500).send(`
                        <html>
                            <head><title>Scalar Documentation</title></head>
                            <body>
                                <h1>Erro ao carregar documentação Scalar</h1>
                                <p>Use <a href="/api/docs">Swagger UI</a> como alternativa.</p>
                            </body>
                        </html>
                    `);
                }
            });
            // Rota para servir o JSON da especificação OpenAPI
            this.app.get('/api/docs.json', (req, res) => {
                res.setHeader('Content-Type', 'application/json');
                res.send(swagger_1.specs);
            });
            this.app.use("/api", api_routes_1.default);
            this.startServer();
        }
        catch (error) {
            console.error('❌ Failed to connect to database:', error);
            process.exit(1);
        }
    }
}
const server = new Server();
server.init();
//# sourceMappingURL=server.js.map