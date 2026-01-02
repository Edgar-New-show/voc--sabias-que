let curiosidades = [];

fetch("dadosCuriosidade.json")
  .then(res => res.json())
  .then(dados => {
    curiosidades = dados;
    mostrarCuriosidades(curiosidades);
  })
  .catch(err => {
    console.error("Erro ao carregar curiosidades", err);
  });

const formPesquisa = document.getElementById('formPesquisa');
const inputPesquisa = document.getElementById('inputPesquisa');
const conteudo = document.getElementById("conteudo");

formPesquisa.addEventListener('submit', (e) => {
  e.preventDefault();

  const termo = inputPesquisa.value.trim().toLowerCase();

  if (!termo) {
    mostrarCuriosidades(curiosidades);
    return;
  }

  const filtrados = curiosidades.filter(item => {
    return (
      item.titulo.toLowerCase().includes(termo) ||
      item.texto.toLowerCase().includes(termo) ||
      item.categoria.toLowerCase().includes(termo)
    );
  });

  mostrarCuriosidades(filtrados);
});

function mostrarCuriosidades(lista) {
  let html = "";

  lista.forEach(item => {
    html += `
      <a href="detalhe.html?id=${item.id}" class="card-link">
        <div class="curiosidade">
          <img src="${item.imagem}" alt="${item.titulo}">
          <h3>${item.titulo}</h3>
          <p>${item.texto.slice(0, 120)}...</p>
        </div>
      </a>
    `;
  });

  conteudo.innerHTML = html;
}
