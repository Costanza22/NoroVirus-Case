import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useChartColors } from '../hooks/useChartColors';

export default function TopMunicipiosChart({ data }) {
  const colors = useChartColors();
  
  // Limitar a top 10 e ordenar
  const topData = data
    .sort((a, b) => b.total_casos - a.total_casos)
    .slice(0, 10)
    .map(item => ({
      municipio: `${item.municipio} (${item.estado})`,
      casos: item.total_casos
    }));

  return (
    <div className="card" style={{ height: 400 }}>
      <h3>Top 10 Municípios com Mais Casos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            type="number" 
            stroke={colors.text}
            tick={{ fill: colors.text }}
          />
          <YAxis 
            dataKey="municipio" 
            type="category" 
            width={150}
            stroke={colors.text}
            tick={{ fill: colors.text }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: colors.background, 
              border: `1px solid ${colors.grid}`,
              color: colors.text
            }}
          />
          <Legend wrapperStyle={{ color: colors.text }} />
          <Bar dataKey="casos" fill={colors.accent} name="Total de Casos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

