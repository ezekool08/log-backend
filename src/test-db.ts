import pool from './config/database';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    try {
        console.log('Attempting to connect with these settings:', {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
            // Not logging password for security
        });

        const client = await pool.connect();
        console.log('Successfully connected to PostgreSQL');
        
        const result = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'log'
            );
        `);
        
        console.log('Log table exists:', result.rows[0].exists);
        
        client.release();
    } catch (err) {
        console.error('Detailed error:', err);
    } finally {
        await pool.end();
    }
}

testConnection();