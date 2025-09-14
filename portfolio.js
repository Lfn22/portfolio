// ======================
// Projetos
// ======================

const projetos = {
  frontend: [
    { titulo: "Landing Page", categoria:"frontend", linkGit: "https://github.com/Lfn22/landing-responsiva-", linkPrints: "prints/landingpage.png" },
    { titulo: "Dashboard Web", categoria:"frontend", linkGit: "https://github.com/Lfn22/dashboardsimples", linkPrints: "prints/dashboardsimples.png" },
    { titulo: "E-commerce", categoria:"frontend", linkGit: "https://github.com/Lfn22/ecommerce", linkPrints: "prints/ecommerce.mp4" }
  ],
  infra: [
    { titulo: "Topologia Empresarial", categoria:"infra", linkGit: "https://github.com/Lfn22/topologiaderedes", linkPrints: "prints/topologiaredes.png" },
    { titulo: "Servidor Linux Local", categoria:"infra", linkGit: "#", linkPrints: "#" },
    { titulo: "Monitoramento com Zabbix", categoria:"infra", linkGit: "#", linkPrints: "#" }
  ],
  dados: [
    { titulo: "Dashboard de Chamados", categoria:"dados", linkGit: "https://github.com/Lfn22/dashboardchamados", linkPrints: "prints/dadosdechamados.mp4" },
    { titulo: "Power BI - Clientes/Planos", categoria:"dados", linkGit: "#", linkPrints: "#" },
    { titulo: "Case Simulado - Consumo de Internet", categoria:"dados", linkGit: "https://github.com/Lfn22/casesimulado", linkPrints: "prints/casesimuladoconsumo.mp4" }
  ]
};

function renderCards(secao){
  const container = document.getElementById(secao);
  const cardsContainer = container.querySelector(".cards-container");
  cardsContainer.innerHTML = "";

  projetos[secao].forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card", p.categoria);
    card.setAttribute("data-category", p.categoria);

    // Detecta se é vídeo ou imagem
    let mediaLink = "";
    if(p.linkPrints.endsWith(".mp4")){
      mediaLink = `<video controls width="100%">
                     <source src="${p.linkPrints}" type="video/mp4">
                     Seu navegador não suporta vídeo.
                   </video>`;
    } else if(p.linkPrints !== "#"){
      mediaLink = `<img src="${p.linkPrints}" alt="${p.titulo}" class="preview-img">`;
    }

    card.innerHTML = `
      <h3>${p.titulo}</h3>
      ${mediaLink}
      <a href="${p.linkGit}" target="_blank">GitHub</a>
    `;
    cardsContainer.appendChild(card);
  });
}

["frontend","infra","dados"].forEach(renderCards);

// ======================
// Certificados
// ======================

const certificados = [
  {titulo:"Certificado Redes", categoria:"infra", arquivo:"certificados/certificado1.pdf"},
  {titulo:"Cabeçalho, footer e variáveis", categoria:"frontend", arquivo:"certificados/certificado2.pdf"},
  {titulo:"Curso linkedin", categoria:"softskills", arquivo:"certificados/certificado8.pdf"},
  {titulo:"Endpoint Security", categoria:"seguranca", arquivo:"certificados/certificado11.pdf"},
  {titulo:"GIT e GITHUB", categoria:"devops", arquivo:"certificados/certificado16.pdf"},
  {titulo:"Classes e posicionamento", categoria:"frontend", arquivo:"certificados/certificado3.pdf"},
  {titulo:"Trabalhando com Responsividade", categoria:"frontend", arquivo:"certificados/certificado4.pdf"},
  {titulo:"Javascript para web", categoria:"frontend", arquivo:"certificados/certificado5.pdf"},
  {titulo:"Consumindo e tratando de uma API (JS)", categoria:"frontend", arquivo:"certificados/certificado6.pdf"},
  {titulo:"Criando requisições (JS)", categoria:"frontend", arquivo:"certificados/certificado7.pdf"},
  {titulo:"Lógica de Programação 1", categoria:"frontend", arquivo:"certificados/certificado9.pdf"},
  {titulo:"Lógica de Programação 2", categoria:"frontend", arquivo:"certificados/certificado10.pdf"},
  {titulo:"Flexbox e Layouts responsivos", categoria:"frontend", arquivo:"certificados/certificado12.pdf"},
  {titulo:"Foco e resultados para o dia a dia", categoria:"softskills", arquivo:"certificados/certificado13.pdf"},
  {titulo:"Formação iniciante em programação", categoria:"frontend", arquivo:"certificados/certificado14.pdf"},
  {titulo:"Gerência de projetos de TI", categoria:"devops", arquivo:"certificados/certificado15.pdf"},
  {titulo:"IA e produtividade", categoria:"ia", arquivo:"certificados/certificado17.pdf"},
  {titulo:"Hábitos de produtividade", categoria:"softskills", arquivo:"certificados/certificado18.pdf"},
  {titulo:"Ambientes de desenvolvimento", categoria:"frontend", arquivo:"certificados/certificado19.pdf"},
  {titulo:"Imersão Cloud Devops", categoria:"devops", arquivo:"certificados/certificado20.pdf"},
  {titulo:"Melhoria Contínua", categoria:"devops", arquivo:"certificados/certificado21.pdf"},
  {titulo:"Programação de Sistemas da Informação", categoria:"frontend", arquivo:"certificados/certificado22.pdf"},
  {titulo:"Técnicas de Autodesenvolvimento", categoria:"softskills", arquivo:"certificados/certificado23.pdf"}
];

let filtroAtual = "all";
let inicio = 0;
const qtdPorPagina = 5;

function renderCertificados(){
  const container = document.getElementById("certificacoes");
  const cardsContainer = container.querySelector(".cards-scroll");
  cardsContainer.innerHTML="";

  const filtrados = filtroAtual==="all" ? certificados : certificados.filter(c=>c.categoria===filtroAtual);
  const visiveis = filtrados.slice(inicio,inicio+qtdPorPagina);

  visiveis.forEach(c=>{
    const card = document.createElement("div");
    card.classList.add("card", c.categoria);
    card.setAttribute("data-category", c.categoria);
    card.innerHTML=`
      <h3>${c.titulo}</h3>
      <p>Categoria: ${c.categoria}</p>
      <a href="${c.arquivo}" target="_blank">Ver Certificado</a>
    `;
    cardsContainer.appendChild(card);
  });

  const paginacao = container.querySelector(".pagination");
  paginacao.innerHTML=`
    <button onclick="prevPage()" ${inicio===0?"disabled":""}>Anterior</button>
    <button onclick="nextPage()" ${(inicio+qtdPorPagina)>=filtrados.length?"disabled":""}>Próximo</button>
  `;
}

function nextPage(){ inicio+=qtdPorPagina; renderCertificados(); }
function prevPage(){ inicio-=qtdPorPagina; if(inicio<0) inicio=0; renderCertificados(); }

document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    filtroAtual = btn.getAttribute("data-category");
    inicio = 0;
    renderCertificados();
  });
});

renderCertificados();
