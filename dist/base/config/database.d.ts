import mongoose from 'mongoose';
declare class DatabaseConnection {
    private static instance;
    private isConnected;
    private constructor();
    static getInstance(): DatabaseConnection;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConnection(): mongoose.Connection;
    isConnectionActive(): boolean;
}
declare const _default: DatabaseConnection;
export default _default;
//# sourceMappingURL=database.d.ts.map