export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export interface LogEntry {
    id: number;
    inserted_at: Date;
    json: any;
  }
  
  export interface CreateLogRequest {
    json: any;
  }