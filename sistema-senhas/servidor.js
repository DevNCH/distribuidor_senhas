const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

let senhaAtual = 0;
let historico = [];

function formatarSenha(n) {
  return "A" + n.toString().padStart(3, '0');
}

app.post('/chamar', (req, res) => {
  const guiche = req.body.guiche || "Desconhecido";
  senhaAtual++;
  const senhaFormatada = formatarSenha(senhaAtual);
  const registro = { senha: senhaFormatada, guiche, hora: new Date().toLocaleTimeString() };

  historico.unshift(registro); // adiciona ao início
  if (historico.length > 5) historico.pop(); // limita o histórico

  res.json(registro);
});

app.get('/historico', (req, res) => {
  res.json(historico);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando na rede na porta 3000");
});