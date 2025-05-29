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
