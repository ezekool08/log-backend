import { Pool } from 'pg';
import config from './env.config';

const pool = new Pool(config.database);

export default pool;