const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let senhaAtual = 0;
let historico = [];

function formatarSenha(n) {
  return "A" + n.toString().padStart(3, '0');
}

let numero = 1;
let letraAtual = 'A';
let guiche = 1;
const anteriores = [];

function chamarProximaSenha() {
  const senhaAtual = letraAtual + numero.toString().padStart(3, '0');
  document.getElementById('senhaAtual').innerText = senhaAtual;
  document.getElementById('guicheAtual').innerText = 'Guichê ' + guiche;
  anteriores.unshift({ senha: senhaAtual, guiche: guiche });
  if (anteriores.length > 3) anteriores.pop();
  atualizarSenhasAnteriores();

  numero++;
  if (numero > 99) {
    numero = 1;
    letraAtual = String.fromCharCode(letraAtual.charCodeAt(0) + 1);
  }
  guiche = (guiche % 5) + 1;
}

function atualizarSenhasAnteriores() {
  const container = document.getElementById('anteriores');
  container.innerHTML = '';
  anteriores.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('senha-anterior');
    div.innerHTML = `<h3>SENHA ${item.senha}</h3><p>Guichê ${item.guiche}</p>`;
    container.appendChild(div);
  });
}

app.post('/chamar', (req, res) => {
  const guiche = req.body.guiche || "Desconhecido";
  senhaAtual++;
  const senhaFormatada = formatarSenha(senhaAtual);
  const registro = { senha: senhaFormatada, guiche, hora: new Date().toLocaleTimeString() };

  historico.unshift(registro); // adiciona ao início
  if (historico.length > 10) historico.pop(); // limita o histórico

  res.json(registro);
});

app.get('/ultima', (req, res) => {
  res.json({ senha: formatarSenha(senhaAtual) });
});

app.get('/historico', (req, res) => {
  res.json(historico);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
