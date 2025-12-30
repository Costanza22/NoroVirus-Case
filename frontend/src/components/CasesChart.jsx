import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function CasesChart({ data }) {
  const aggregated = Object.values(
    data.reduce((acc, cur) => {
      if (!acc[cur.estado]) {
        acc[cur.estado] = {
          estado: cur.estado,
          casos: 0
        };
      }
      acc[cur.estado].casos += cur.numero_casos;
      return acc;
    }, {})
  );

  return (
    <div className="card" style={{ height: 320 }}>
      <h3>Casos registrados · 2025</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={aggregated}>
          <XAxis dataKey="estado" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="casos" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
