import { Router, Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from '../config/database';

const router = Router();

// Type definition for our log data
interface LogData {
    id: number;
    inserted_at: Date;
    json: any;
}

// GET route with correct types
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const result: QueryResult<LogData> = await pool.query(
            'SELECT id, inserted_at, json FROM log ORDER BY inserted_at DESC'
        );
        
        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching logs'
        });
    }
});

// POST route with correct types
router.post('/', async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        
        if (!data) {
            return res.status(400).json({
                success: false,
                error: 'No data provided'
            });
        }

        const result: QueryResult<LogData> = await pool.query(
            'INSERT INTO log (json) VALUES ($1) RETURNING id, inserted_at, json',
            [data]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating log entry:', error);
        res.status(500).json({
            success: false,
            error: 'Error creating log entry'
        });
    }
});

export default router;