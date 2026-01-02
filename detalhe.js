const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

fetch("dadosCuriosidade.json")
  .then(res => res.json())
  .then(curiosidades => {
    const detalhe = document.getElementById("detalhe");
    const item = curiosidades.find(c => c.id === id);

    if (!item) {
      detalhe.innerHTML = "<p>Conteúdo não encontrado</p>";
      return;
    }

    // 🔹 Conteúdo principal
    let html = `
      <article class="curiosidade-detalhe">
        <img src="${item.imagem}" class="img-detalhe">
        <h1>${item.titulo}</h1>
        <p>${item.texto.replace(/\n/g, "<br>")}</p>
        <br>
        <a href="javascript:history.back()" class="voltar">← Voltar</a>
        <br><b><br>
      </article>
    `;

    // 🔹 Recomendados (mesma categoria, exceto o atual)
    const recomendados = curiosidades
      .filter(c => c.categoria === item.categoria && c.id !== item.id)
      .slice(0, 4);

    if (recomendados.length > 0) {
      html += `
        <section class="recomendados">
        <br><br>
          <h2>Recomendados</h2>
          <br><br>
          <div class="recomendados-grid">
      `;

      recomendados.forEach(rec => {
        html += `
          <a href="detalhe.html?id=${rec.id}" class="recomendado-card">
            <img src="${rec.imagem}">
            <h3>${rec.titulo}</h3>
          </a>
        `;
      });

      html += `
          </div>
        </section>
      `;
    }

    detalhe.innerHTML = html;
  })
  .catch(err => {
    console.error("Erro ao carregar detalhes", err);
  });
