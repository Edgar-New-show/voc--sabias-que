const params = new URLSearchParams(window.location.search);
const categoria = params.get("cat");

fetch("data/dadosCuriosidade.json")
  .then(res => res.json())
  .then(curiosidades => {
    const conteudo = document.getElementById("conteudo");
    let html = `<h2 class="titulo-categoria">${categoria.toUpperCase()}</h2>`;

    curiosidades
      .filter(item => item.categoria === categoria)
      .forEach(item => {
        html += `
          <a href="detalhe.html?id=${item.id}" class="card-link">
            <div class="curiosidade">
              <img src="${item.imagem}">
              <h3>${item.titulo}</h3>
              <p>${item.texto.slice(0, 100)}...</p>
            </div>
          </a>
        `;
      });

    conteudo.innerHTML = html;
  });