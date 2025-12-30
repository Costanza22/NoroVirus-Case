export default function EventsTimeline({ events }) {
  return (
    <div className="card">
      <h3>Surtos confirmados</h3>

      {events.map(e => (
        <div key={e.id} className="timeline-item">
          <strong>{e.municipio} ({e.estado})</strong><br />
          <small>
            {e.data_inicio} → {e.data_fim}
          </small>
          <p>{e.descricao}</p>
        </div>
      ))}
    </div>
  );
}
