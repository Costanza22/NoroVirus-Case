export default function References() {
  const references = [
    {
      category: 'Fontes Oficiais do Governo',
      items: [
        {
          title: 'Ministério da Saúde - Vigilância de Gastroenterites Virais',
          description: 'Informações sobre fortalecimento da vigilância e diagnóstico de gastroenterites virais, incluindo norovírus',
          url: 'https://www.gov.br/saude/pt-br/assuntos/noticias/2025/setembro/ministerio-da-saude-fortalece-vigilancia-e-diagnostico-de-gastroenterites-virais',
          source: 'Ministério da Saúde'
        },
        {
          title: 'Agência Nacional de Vigilância Sanitária (ANVISA)',
          description: 'Materiais educativos em vigilância sanitária sobre doenças transmitidas por alimentos',
          url: 'https://www.gov.br/anvisa/pt-br',
          source: 'ANVISA'
        },
        {
          title: 'Sistema Único de Saúde (SUS)',
          description: 'Informações sobre saúde pública e vigilância epidemiológica',
          url: 'https://www.gov.br/saude/pt-br',
          source: 'Ministério da Saúde'
        }
      ]
    },
    {
      category: 'Institutos de Pesquisa',
      items: [
        {
          title: 'Instituto Oswaldo Cruz (Fiocruz)',
          description: 'Norovírus: desafio para a saúde pública - informações sobre transmissibilidade e prevenção',
          url: 'https://www.ioc.fiocruz.br/noticias/norovirus-desafio-para-saude-publica',
          source: 'Fiocruz'
        },
        {
          title: 'Universidade Federal da Bahia (UFBA)',
          description: 'Pesquisas sobre identificação e caracterização molecular do norovírus em surtos',
          url: 'https://www.ufba.br/ufba_em_pauta/norov%C3%ADrus-%C3%A9-identificado-por-pesquisador-da-ufba-com-apoio-da-fapesb',
          source: 'UFBA'
        },
        {
          title: 'Repositório USP - Estudo sobre Norovírus em São Paulo',
          description: 'Norovírus: principal causa de gastroenterite epidêmica no município de São Paulo',
          url: 'https://repositorio.usp.br/item/002880635',
          source: 'USP'
        }
      ]
    },
    {
      category: 'Informações e Prevenção',
      items: [
        {
          title: 'Manual de Doenças Transmitidas por Alimentos',
          description: 'Informações detalhadas sobre norovírus: sintomas, transmissão, diagnóstico e prevenção',
          url: 'https://pesquisa.bvsalud.org/portal/resource/pt/lis-22127',
          source: 'BVS Saúde'
        },
        {
          title: 'Cartilha Educativa sobre Norovírus',
          description: 'Material educativo sobre sintomas, transmissão, prevenção e cuidados',
          url: 'https://fenixscience.emnuvens.com.br/revista/article/view/94',
          source: 'Revista Científica'
        }
      ]
    },
    {
      category: 'Sobre o Projeto',
      items: [
        {
          title: 'Dados e Metodologia',
          description: 'Este dashboard utiliza dados públicos de surtos de gastroenterite associados a norovírus, com base em boletins oficiais das Secretarias de Saúde de São Paulo e Santa Catarina',
          url: null,
          source: 'Dados Públicos'
        },
        {
          title: 'Atualização dos Dados',
          description: 'Os dados são atualizados conforme disponibilização de informações oficiais pelas autoridades de saúde',
          url: null,
          source: 'Fontes Oficiais'
        }
      ]
    }
  ];

  return (
    <div className="card references-card">
      <h3>📚 Fontes e Referências</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.875rem' }}>
        Informações confiáveis sobre norovírus de fontes oficiais do governo brasileiro, 
        institutos de pesquisa e organizações de saúde pública.
      </p>

      {references.map((category, catIndex) => (
        <div key={catIndex} className="reference-category">
          <h4>{category.category}</h4>
          <ul className="references-list">
            {category.items.map((item, itemIndex) => (
              <li key={itemIndex} className="reference-item">
                <div className="reference-content">
                  <strong>{item.title}</strong>
                  <p className="reference-description">{item.description}</p>
                  <div className="reference-meta">
                    <span className="reference-source">Fonte: {item.source}</span>
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="reference-link"
                      >
                        Acessar fonte →
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="prevention-section">
        <h4>🛡️ Prevenção do Norovírus</h4>
        <div className="prevention-grid">
          <div className="prevention-item">
            <strong>Lave as mãos frequentemente</strong>
            <p>Especialmente após usar o banheiro, antes de comer e ao preparar alimentos</p>
          </div>
          <div className="prevention-item">
            <strong>Higienize alimentos</strong>
            <p>Lave bem frutas e verduras antes de consumir</p>
          </div>
          <div className="prevention-item">
            <strong>Cozinhe bem os alimentos</strong>
            <p>Especialmente frutos do mar e carnes</p>
          </div>
          <div className="prevention-item">
            <strong>Evite contato próximo</strong>
            <p>Se estiver doente, evite contato com outras pessoas</p>
          </div>
          <div className="prevention-item">
            <strong>Desinfete superfícies</strong>
            <p>Limpe e desinfete superfícies que possam estar contaminadas</p>
          </div>
          <div className="prevention-item">
            <strong>Beba água tratada</strong>
            <p>Use apenas água filtrada ou fervida para consumo</p>
          </div>
        </div>
      </div>

      <div className="references-footer">
        <p>
          <strong>⚠️ Importante:</strong> Este dashboard é uma ferramenta de visualização de dados públicos. 
          Para informações médicas e orientações sobre saúde, consulte sempre um profissional de saúde qualificado.
        </p>
        <p style={{ marginTop: '12px', fontSize: '0.8rem' }}>
          <strong>📊 Sobre os dados:</strong> As informações apresentadas são baseadas em dados públicos 
          das Secretarias de Saúde de São Paulo e Santa Catarina, e são atualizadas conforme a disponibilização 
          de informações oficiais pelas autoridades de saúde.
        </p>
      </div>
    </div>
  );
}

