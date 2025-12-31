import express from 'express';
import { pool } from '../db/connection.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { estado, ano, mes } = req.query;

  let query = `
    SELECT estado, municipio, ano, mes, numero_casos
    FROM casos_gastro
    WHERE 1=1
  `;
  const params = [];

  if (estado) {
    const estados = estado.split(',').map(e => e.trim());
    const placeholders = estados.map((_, i) => `$${params.length + i + 1}`).join(',');
    query += ` AND estado IN (${placeholders})`;
    params.push(...estados);
  }

  if (ano) {
    params.push(ano);
    query += ` AND ano = $${params.length}`;
  }

  if (mes) {
    params.push(mes);
    query += ` AND mes = $${params.length}`;
  }

  const { rows } = await pool.query(query, params);
  res.json(rows);
});

// Rota para obter estatísticas agregadas
router.get('/stats', async (req, res) => {
  const { estado, ano, mes } = req.query;

  let query = `
    SELECT 
      COUNT(DISTINCT municipio) as total_municipios,
      SUM(numero_casos) as total_casos,
      AVG(numero_casos) as media_casos,
      MAX(numero_casos) as pico_casos,
      COUNT(*) as total_registros
    FROM casos_gastro
    WHERE 1=1
  `;
  const params = [];

  if (estado) {
    const estados = estado.split(',').map(e => e.trim());
    const placeholders = estados.map((_, i) => `$${params.length + i + 1}`).join(',');
    query += ` AND estado IN (${placeholders})`;
    params.push(...estados);
  }

  if (ano) {
    params.push(ano);
    query += ` AND ano = $${params.length}`;
  }

  if (mes) {
    params.push(mes);
    query += ` AND mes = $${params.length}`;
  }

  const { rows } = await pool.query(query, params);
  res.json(rows[0]);
});

// Rota para obter dados agregados por mês (para gráfico temporal)
router.get('/timeline', async (req, res) => {
  const { estado, ano, mes } = req.query;

  let query = `
    SELECT 
      ano,
      mes,
      SUM(numero_casos) as total_casos,
      COUNT(DISTINCT municipio) as municipios_afetados
    FROM casos_gastro
    WHERE 1=1
  `;
  const params = [];

  if (estado) {
    const estados = estado.split(',').map(e => e.trim());
    const placeholders = estados.map((_, i) => `$${params.length + i + 1}`).join(',');
    query += ` AND estado IN (${placeholders})`;
    params.push(...estados);
  }

  if (ano) {
    params.push(ano);
    query += ` AND ano = $${params.length}`;
  }

  if (mes) {
    params.push(mes);
    query += ` AND mes = $${params.length}`;
  }

  query += ` GROUP BY ano, mes ORDER BY ano, mes`;

  const { rows } = await pool.query(query, params);
  res.json(rows);
});

// Rota para top municípios
router.get('/top-municipios', async (req, res) => {
  const { estado, ano, mes, limit = 10 } = req.query;

  let query = `
    SELECT 
      municipio,
      estado,
      SUM(numero_casos) as total_casos,
      COUNT(*) as registros
    FROM casos_gastro
    WHERE 1=1
  `;
  const params = [];

  if (estado) {
    const estados = estado.split(',').map(e => e.trim());
    const placeholders = estados.map((_, i) => `$${params.length + i + 1}`).join(',');
    query += ` AND estado IN (${placeholders})`;
    params.push(...estados);
  }

  if (ano) {
    params.push(ano);
    query += ` AND ano = $${params.length}`;
  }

  if (mes) {
    params.push(mes);
    query += ` AND mes = $${params.length}`;
  }

  query += ` GROUP BY municipio, estado ORDER BY total_casos DESC LIMIT $${params.length + 1}`;
  params.push(parseInt(limit));

  const { rows } = await pool.query(query, params);
  res.json(rows);
});


export default router;
