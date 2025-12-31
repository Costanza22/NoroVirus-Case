export default function Filters({ filters, onFilterChange }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          value={filters.estado}
          onChange={(e) => onFilterChange('estado', e.target.value)}
        >
          <option value="SP,SC">Todos (SP + SC)</option>
          <option value="SP">São Paulo</option>
          <option value="SC">Santa Catarina</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="ano">Ano:</label>
        <select
          id="ano"
          value={filters.ano || ''}
          onChange={(e) => onFilterChange('ano', e.target.value || null)}
        >
          <option value="">Todos os anos</option>
          <option value="2023">2023</option>
          <option value="2025">2025</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="mes">Mês:</label>
        <select
          id="mes"
          value={filters.mes || ''}
          onChange={(e) => onFilterChange('mes', e.target.value || null)}
        >
          <option value="">Todos os meses</option>
          <option value="1">Janeiro</option>
          <option value="2">Fevereiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
      </div>
    </div>
  );
}

