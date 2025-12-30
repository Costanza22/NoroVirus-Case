import express from 'express';
import { pool } from '../db/connection.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { estado, ano } = req.query;

  let query = `
    SELECT estado, municipio, ano, mes, numero_casos
    FROM casos_gastro
    WHERE 1=1
  `;
  const params = [];

  if (estado) {
    const estados = estado.split(',');
    query += ` AND estado = ANY($${params.length + 1})`;
    params.push(estados);
  }

  if (ano) {
    params.push(ano);
    query += ` AND ano = $${params.length}`;
  }

  const { rows } = await pool.query(query, params);
  res.json(rows);
});


export default router;
