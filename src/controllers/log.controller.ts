import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from '../config/database';
import { ApiResponse, LogEntry, CreateLogRequest } from '../types/api.types';

export const createLog = async (
  req: Request<{}, {}, CreateLogRequest>,
  res: Response<ApiResponse<LogEntry>>
): Promise<void> => {
  try {
    const { json } = req.body;
    
    if (!json) {
      res.status(400).json({
        success: false,
        error: 'JSON data is required'
      });
      return;
    }

    const query = 'INSERT INTO log (json) VALUES ($1) RETURNING id, inserted_at, json';
    const result: QueryResult<LogEntry> = await pool.query(query, [json]);

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error while creating log entry'
    });
  }
};

export const getLogs = async (
  _req: Request,
  res: Response<ApiResponse<LogEntry[]>>
): Promise<void> => {
  try {
    const query = 'SELECT id, inserted_at, json FROM log ORDER BY inserted_at DESC';
    const result: QueryResult<LogEntry> = await pool.query(query);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error while fetching logs'
    });
  }
};