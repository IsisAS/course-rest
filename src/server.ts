import cors from 'cors';
import express, { Express } from "express";
import http, { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { AddressInfo } from "net";
import swaggerUi from 'swagger-ui-express';
import ApiRoutes from "./core/api/api.routes";
import DatabaseConnection from "./base/config/database";
import { specs } from "./config/swagger";
import fs from 'fs';
import path from 'path';

class Server {
    private app: Express;
    private server: HttpsServer | HttpServer;
    private port: number;
    private host: string;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 4000;
        this.host = process.env.HOST || "0.0.0.0";
        this.server = http.createServer(this.app);

        this.app.use(cors({
            origin: '*',
            credentials: true
        }));
    }

    startServer() {
        this.server.listen(this.port, this.host, () => {
            const address = this.server.address() as AddressInfo;
            const displayHost = address.address === '0.0.0.0' ? 'localhost' : address.address;
            console.log('🚀 Server is running!');
            console.log('Endpoints:');
            console.log(`   API: http://${displayHost}:${address.port}/api`);
            console.log(`   🎨 API Documentation (Scalar): http://${displayHost}:${address.port}/api/scalar`);
            console.log(`   📄 OpenAPI Spec: http://${displayHost}:${address.port}/api/docs.json`);
        });
    }

    async init() {
        try {
            console.log('🔄 Attempting to connect to database...');
            await DatabaseConnection.connect();
            console.log('✅ Database connected successfully');
            
            this.app.set("trust proxy", 1);
            
            // Configurar Swagger UI
            this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, {
                customCss: '.swagger-ui .topbar { display: none }',
                customSiteTitle: 'Course API Documentation',
                customfavIcon: '/favicon.ico',
                swaggerOptions: {
                    persistAuthorization: true,
                }
            }));


            this.app.get('/api/scalar', (req, res) => {
                try {
                    const templatePath = path.join(__dirname, 'templates', 'scalar.html');
                    let htmlContent = fs.readFileSync(templatePath, 'utf8');
                    
                    // Substituir a URL da especificação (todas as ocorrências)
                    const specUrl = `${req.protocol}://${req.get('host')}/api/docs.json`;
                    htmlContent = htmlContent.replace(/\{\{SPEC_URL\}\}/g, specUrl);
                    
                    res.setHeader('Content-Type', 'text/html');
                    res.send(htmlContent);
                } catch (error) {
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
                res.send(specs);
            });
            
            this.app.use("/api", ApiRoutes);
            this.startServer();
        } catch (error) {
            console.error('❌ Failed to connect to database:', error);
            process.exit(1);
        }
    }
}

const server = new Server();
server.init();