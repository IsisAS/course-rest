import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class DatabaseConnection {
    private static instance: DatabaseConnection;
    private isConnected: boolean = false;

    private constructor() {}

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public async connect(): Promise<void> {
        if (this.isConnected) {
            console.log('MongoDB já está conectado');
            return;
        }

        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/curso_platform';
            
            await mongoose.connect(mongoUri);
            
            this.isConnected = true;
            console.log('MongoDB conectado com sucesso');
            
            mongoose.connection.on('error', (error) => {
                console.error('Erro na conexão MongoDB:', error);
                this.isConnected = false;
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB desconectado');
                this.isConnected = false;
            });

        } catch (error) {
            console.error('Erro ao conectar com MongoDB:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        if (!this.isConnected) {
            return;
        }

        try {
            await mongoose.disconnect();
            this.isConnected = false;
            console.log('MongoDB desconectado com sucesso');
        } catch (error) {
            console.error('Erro ao desconectar MongoDB:', error);
            throw error;
        }
    }

    public getConnection() {
        return mongoose.connection;
    }

    public isConnectionActive(): boolean {
        return this.isConnected && mongoose.connection.readyState === 1;
    }
}

export default DatabaseConnection.getInstance();

