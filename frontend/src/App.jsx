import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './components/Header';
import StatCard from './components/StatCard';
import CasesChart from './components/CasesChart';
import EventsTimeline from './components/EventsTimeline';

import './styles/dashboard.css';

function App() {
  const [cases, setCases] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/casos?ano=2025')
  .then(res => setCases(res.data));


    axios.get('http://localhost:4000/eventos')
      .then(res => setEvents(res.data));
  }, []);

  const totalCases = cases.reduce(
    (sum, c) => sum + c.numero_casos, 0
  );

  return (
    <div className="container">
      <Header />

      <div className="grid">
        <StatCard title="Casos registrados (SP + SC · 2025)" value={totalCases} />
        <StatCard title="Municípios afetados" value={cases.length} />
      </div>

      <div className="grid">
        <CasesChart data={cases} />
        <EventsTimeline events={events} />
      </div>
    </div>
  );
}

export default App;
