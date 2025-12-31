export function exportToCSV(data, filename = 'casos_norovirus') {
  if (data.length === 0) {
    alert('Nenhum dado para exportar');
    return;
  }

  // Cabeçalhos
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');

  // Dados
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      // Escapar vírgulas e aspas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  });

  // Combinar tudo
  const csv = [csvHeaders, ...csvRows].join('\n');

  // Criar blob e download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(data, filename = 'casos_norovirus') {
  if (data.length === 0) {
    alert('Nenhum dado para exportar');
    return;
  }

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

