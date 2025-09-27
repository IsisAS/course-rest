import cors from 'cors';
import express, { Express } from "express";
import http, { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { AddressInfo } from "net";
import ApiRoutes from "./core/api/api.routes";
import DatabaseConnection from "./base/config/database";

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
            console.log('🚀 Server is running!');
            console.log('Endpoints:');
            console.log(`   API: http://${address.address}:${address.port}/api`);
        });
    }

    async init() {
        try {
            console.log('🔄 Attempting to connect to database...');
            await DatabaseConnection.connect();
            console.log('✅ Database connected successfully');
            
            this.app.set("trust proxy", 1);
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