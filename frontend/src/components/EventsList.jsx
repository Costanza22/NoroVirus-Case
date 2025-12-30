export default function EventsList({ events }) {
  return (
    <div className="card">
      <h2>Surtos documentados</h2>

      {events.map(e => (
        <div key={e.id} className="event">
          <strong>{e.municipio} ({e.estado})</strong>
          <p>{e.descricao}</p>
          <small>{e.fonte}</small>
        </div>
      ))}
    </div>
  );
}
