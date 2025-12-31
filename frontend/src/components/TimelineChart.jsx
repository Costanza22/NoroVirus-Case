import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useChartColors } from '../hooks/useChartColors';

export default function TimelineChart({ data }) {
  const colors = useChartColors();
  
  // Formatar dados para o gráfico
  const chartData = data.map(item => ({
    periodo: `${item.mes}/${item.ano}`,
    casos: item.total_casos,
    municipios: item.municipios_afetados
  }));

  return (
    <div className="card" style={{ height: 320 }}>
      <h3>Evolução Temporal dos Casos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="periodo" 
            stroke={colors.text}
            tick={{ fill: colors.text }}
          />
          <YAxis 
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
          <Line 
            type="monotone" 
            dataKey="casos" 
            stroke={colors.primary} 
            name="Total de Casos"
            strokeWidth={2}
            dot={{ fill: colors.primary }}
          />
          <Line 
            type="monotone" 
            dataKey="municipios" 
            stroke={colors.secondary} 
            name="Municípios Afetados"
            strokeWidth={2}
            dot={{ fill: colors.secondary }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

