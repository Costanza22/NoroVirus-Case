import express from 'express';
import { pool } from '../db/connection.js';

const router = express.Router();

router.get('/', async (_, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM eventos_surtos ORDER BY data_inicio DESC'
  );
  res.json(rows);
});

export default router;
