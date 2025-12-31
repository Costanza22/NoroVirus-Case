import { useState, useMemo } from 'react';

export default function CasesTable({ data }) {
  const [sortField, setSortField] = useState('numero_casos');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return sorted;
  }, [data, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (data.length === 0) {
    return (
      <div className="card">
        <h3>Casos Detalhados</h3>
        <p>Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Casos Detalhados ({data.length} registros)</h3>
      <div className="table-container">
        <table className="cases-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('municipio')} className="sortable">
                Município {getSortIcon('municipio')}
              </th>
              <th onClick={() => handleSort('estado')} className="sortable">
                Estado {getSortIcon('estado')}
              </th>
              <th onClick={() => handleSort('ano')} className="sortable">
                Ano {getSortIcon('ano')}
              </th>
              <th onClick={() => handleSort('mes')} className="sortable">
                Mês {getSortIcon('mes')}
              </th>
              <th onClick={() => handleSort('numero_casos')} className="sortable text-right">
                Casos {getSortIcon('numero_casos')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td>{item.municipio}</td>
                <td>{item.estado}</td>
                <td>{item.ano}</td>
                <td>
                  {new Date(2000, item.mes - 1).toLocaleString('pt-BR', { month: 'long' })}
                </td>
                <td className="text-right font-bold">
                  {item.numero_casos.toLocaleString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Anterior
          </button>
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

