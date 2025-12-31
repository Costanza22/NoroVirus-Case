import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './components/Header';
import StatCard from './components/StatCard';
import CasesChart from './components/CasesChart';
import EventsTimeline from './components/EventsTimeline';
import Filters from './components/Filters';
import TimelineChart from './components/TimelineChart';
import TopMunicipiosChart from './components/TopMunicipiosChart';
import CasesTable from './components/CasesTable';
import LoadingSpinner from './components/LoadingSpinner';
import References from './components/References';
import { exportToCSV, exportToJSON } from './utils/exportData';

import './styles/dashboard.css';

function App() {
  const [cases, setCases] = useState([]);
  const [events, setEvents] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [topMunicipios, setTopMunicipios] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    estado: 'SP,SC',
    ano: null,
    mes: null
  });

  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (filters.estado) params.append('estado', filters.estado);
    if (filters.ano) params.append('ano', filters.ano);
    if (filters.mes) params.append('mes', filters.mes);
    return params.toString();
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const queryString = buildQueryString();
      
      const [casesRes, eventsRes, timelineRes, topRes, statsRes] = await Promise.all([
        axios.get(`http://localhost:4000/casos?${queryString}`),
        axios.get('http://localhost:4000/eventos'),
        axios.get(`http://localhost:4000/casos/timeline?${queryString}`),
        axios.get(`http://localhost:4000/casos/top-municipios?${queryString}`),
        axios.get(`http://localhost:4000/casos/stats?${queryString}`)
      ]);

      setCases(casesRes.data);
      setEvents(eventsRes.data);
      setTimelineData(timelineRes.data);
      setTopMunicipios(topRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]); 

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = (format) => {
    if (format === 'csv') {
      exportToCSV(cases, 'casos_norovirus');
    } else {
      exportToJSON(cases, 'casos_norovirus');
    }
  };

  if (loading && cases.length === 0) {
    return (
      <div className="container">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Header />
        <div className="card error-card">
          <h3>Erro</h3>
          <p>{error}</p>
          <button onClick={fetchData} className="retry-btn">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const totalCases = cases.reduce((sum, c) => sum + c.numero_casos, 0);
  const uniqueMunicipios = new Set(cases.map(c => c.municipio)).size;
  const mediaCasos = stats ? Math.round(stats.media_casos) : 0;
  const picoCasos = stats ? stats.pico_casos : 0;

  // Calcular taxa de crescimento (comparar com período anterior)
  const currentTotal = totalCases;
  const previousPeriod = cases.filter(c => {
    if (filters.ano) {
      return c.ano === Number.parseInt(filters.ano, 10) - 1;
    }
    return false;
  }).reduce((sum, c) => sum + c.numero_casos, 0);
  
  const taxaCrescimento = previousPeriod > 0 
    ? (((currentTotal - previousPeriod) / previousPeriod) * 100).toFixed(1)
    : null;

  return (
    <div className="container">
      <Header />

      <div className="filters-container">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <div className="export-buttons">
          <button onClick={() => handleExport('csv')} className="export-btn">
            Exportar CSV
          </button>
          <button onClick={() => handleExport('json')} className="export-btn">
            Exportar JSON
          </button>
        </div>
      </div>

      <div className="grid">
        <StatCard 
          title="Total de Casos" 
          value={totalCases.toLocaleString('pt-BR')} 
        />
        <StatCard 
          title="Municípios Afetados" 
          value={uniqueMunicipios} 
        />
        <StatCard 
          title="Média de Casos" 
          value={mediaCasos.toLocaleString('pt-BR')} 
        />
        <StatCard 
          title="Pico de Casos" 
          value={picoCasos.toLocaleString('pt-BR')} 
        />
        {taxaCrescimento !== null && (
          <StatCard 
            title="Taxa de Crescimento" 
            value={`${taxaCrescimento > 0 ? '+' : ''}${taxaCrescimento}%`} 
          />
        )}
      </div>

      <div className="grid">
        <CasesChart data={cases} />
        <EventsTimeline events={events} />
      </div>

      <div className="grid">
        <TimelineChart data={timelineData} />
        <TopMunicipiosChart data={topMunicipios} />
      </div>

      <CasesTable data={cases} />

      <References />
    </div>
  );
}

export default App;
