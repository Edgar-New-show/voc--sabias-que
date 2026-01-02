// ===== BANCO DE PERGUNTAS =====
const perguntas = [
  {
    pergunta: "Qual linguagem cria a estrutura de um site?",
    opcoes: ["HTML", "CSS", "JavaScript"],
    correta: 0,
    explicacao: "HTML é a linguagem responsável pela estrutura e conteúdo da página."
  },
  {
    pergunta: "Qual linguagem controla o estilo de um site?",
    opcoes: ["HTML", "Python", "CSS"],
    correta: 2,
    explicacao: "CSS define cores, tamanhos, posições e o visual do site."
  },
  {
    pergunta: "Qual linguagem dá lógica ao site?",
    opcoes: ["CSS", "JavaScript", "HTML"],
    correta: 1,
    explicacao: "JavaScript adiciona interatividade e lógica ao site."
  },
  {
    pergunta: "Qual linguagem roda no navegador?",
    opcoes: ["PHP", "JavaScript", "Python"],
    correta: 1,
    explicacao: "JavaScript é executado diretamente no navegador do usuário."
  }
];

// ===== VARIÁVEIS =====
let nivel = 1;
let tempo = 10;
let intervalo = null;
let perguntaAtual = null;
let bloqueado = false;

// ===== ELEMENTOS =====
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const nivelEl = document.getElementById("nivel");
const tempoEl = document.getElementById("tempo");
const progressoEl = document.getElementById("progresso");

// ===== GERAR PERGUNTA =====
function gerarPergunta() {
  bloqueado = false;
  perguntaAtual = perguntas[Math.floor(Math.random() * perguntas.length)];

  perguntaEl.innerText = perguntaAtual.pergunta;
  opcoesEl.innerHTML = "";

  perguntaAtual.opcoes.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.className = "opcao";
    btn.innerText = opcao;
    btn.onclick = () => responder(i, btn);
    opcoesEl.appendChild(btn);
  });

  nivelEl.innerText = `Nível ${nivel}`;
  iniciarTimer();
}

// ===== RESPONDER =====
function responder(resposta, botao) {
  if (bloqueado) return;
  bloqueado = true;
  clearInterval(intervalo);

  const correta = perguntaAtual.correta;

  if (resposta === correta) {
    botao.style.background = "#4caf50";
    mostrarFeedback(true);
  } else {
    botao.style.background = "#f44336";
    mostrarFeedback(false, resposta);
  }
}

// ===== FEEDBACK POR PERGUNTA =====
function mostrarFeedback(acertou, respostaUsuario = null) {
  const corretaTexto = perguntaAtual.opcoes[perguntaAtual.correta];

  const feedback = document.createElement("div");
  feedback.style.marginTop = "10px";

  feedback.innerHTML = acertou
    ? `<p style="color:green;"><strong>✔ Resposta certa!</strong></p>`
    : `<p style="color:red;"><strong>✖ Resposta errada</strong></p>
       <p><strong>Resposta correta:</strong> ${corretaTexto}</p>`;

  feedback.innerHTML += `
    <p style="font-size:14px;">
      ${perguntaAtual.explicacao}
    </p>
    <button id="continuar">Continuar</button>
  `;

  opcoesEl.appendChild(feedback);

  document.getElementById("continuar").onclick = () => {
    nivel++;
    gerarPergunta();
  };
}

// ===== TIMER =====
function iniciarTimer() {
  tempo = 10;
  tempoEl.innerText = `Tempo: ${tempo}`;
  progressoEl.style.width = "100%";

  intervalo = setInterval(() => {
    tempo--;
    tempoEl.innerText = `Tempo: ${tempo}`;
    progressoEl.style.width = `${tempo * 10}%`;

    if (tempo <= 0) {
      clearInterval(intervalo);
      bloqueado = true;
      mostrarFeedback(false);
    }
  }, 1000);
}

// ===== INICIAR =====
gerarPergunta();