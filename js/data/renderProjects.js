import { projetos } from "../data/projects.js";

const PROJECT_SECTIONS = ["frontend", "infra", "dados"];

function createPreviewElement(preview, title) {
  if (!preview) {
    return null;
  }

  if (preview.tipo === "video") {
    const video = document.createElement("video");
    video.className = "preview-media";
    video.setAttribute("controls", "");
    video.setAttribute("controlslist", "nodownload nofullscreen");
    video.setAttribute("preload", "metadata");
    video.setAttribute("playsinline", "");
    video.setAttribute(
      "aria-label",
      preview.alt || `Pré-visualização do projeto ${title}`,
    );

    const source = document.createElement("source");
    source.src = preview.src;
    source.type = "video/mp4";

    video.append(source);

    const fallback = document.createElement("p");
    fallback.className = "media-fallback";
    fallback.textContent = "Seu navegador não suporta vídeo.";
    video.append(fallback);

    return video;
  }

  if (preview.tipo === "image") {
    const img = document.createElement("img");
    img.className = "preview-media";
    img.src = preview.src;
    img.alt = preview.alt || `Pré-visualização do projeto ${title}`;
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }

  return null;
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.classList.add("card", project.categoria);
  card.dataset.category = project.categoria;
  card.setAttribute("role", "listitem");

  const title = document.createElement("h3");
  title.textContent = project.titulo;
  card.append(title);

  const previewElement = createPreviewElement(project.preview, project.titulo);
  if (previewElement) {
    card.append(previewElement);
  }

  if (project.repoUrl) {
    const link = document.createElement("a");
    link.href = project.repoUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Ver no GitHub";
    link.className = "btn-card";
    card.append(link);
  } else {
    const caption = document.createElement("p");
    caption.className = "card-caption";
    caption.textContent = "Repositório privado ou em desenvolvimento.";
    card.append(caption);
  }

  return card;
}

export function renderProjetos() {
  PROJECT_SECTIONS.forEach((secao) => {
    const container = document.getElementById(secao);
    if (!container) {
      return;
    }

    const cardsContainer = container.querySelector(".cards-container");
    if (!cardsContainer) {
      return;
    }

    cardsContainer.innerHTML = "";
    cardsContainer.setAttribute("role", "list");

    const listaProjetos = projetos[secao] ?? [];

    if (listaProjetos.length === 0) {
      const aviso = document.createElement("p");
      aviso.className = "empty-state";
      aviso.textContent = "Novos projetos em breve.";
      cardsContainer.append(aviso);
      return;
    }

    listaProjetos.forEach((project) => {
      const card = createProjectCard(project);
      cardsContainer.append(card);
    });
  });
}