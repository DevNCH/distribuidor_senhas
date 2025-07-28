const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const CAMINHO_SENHA = path.join(__dirname, 'estado_senha.json');

let senhaAtual = 0;
let historico = [];

// Tenta carregar o último estado salvo da senha
function carregarEstado() {
  if (fs.existsSync(CAMINHO_SENHA)) {
    const dados = JSON.parse(fs.readFileSync(CAMINHO_SENHA, 'utf-8'));
    senhaAtual = dados.senhaAtual || 0;
  }
}

// Salva o estado atual da senha
function salvarEstado() {
  fs.writeFileSync(CAMINHO_SENHA, JSON.stringify({ senhaAtual }));
}

function formatarSenha(n) {
  return "A" + n.toString().padStart(3, '0');
}

app.post('/chamar', (req, res) => {
  const guiche = req.body.guiche || "Desconhecido";
  senhaAtual++;
  salvarEstado();

  const senhaFormatada = formatarSenha(senhaAtual);
  const registro = {
    senha: senhaFormatada,
    guiche,
    hora: new Date().toLocaleTimeString()
  };

  historico.unshift(registro);
  if (historico.length > 5) historico.pop();

  res.json(registro);
});

// Endpoint para definir manualmente a senha atual
app.post('/definirSenha', (req, res) => {
  const { senha } = req.body;

  if (!senha || typeof senha !== 'string' || !/^A\d{3}$/.test(senha)) {
    return res.status(400).json({ erro: 'Formato de senha inválido. Use "A000" até "A999".' });
  }

  senhaAtual = parseInt(senha.slice(1));
  salvarEstado();
  res.json({ mensagem: `Senha atual definida como ${senha}` });
});

// Novo endpoint para zerar a senha
app.post('/zerarSenha', (req, res) => {
  console.log("Zerando senha manualmente...");
  senhaAtual = 0;
  historico = [];
  salvarEstado();
  res.json({ mensagem: 'Senha zerada com sucesso.' });
});

app.get('/historico', (req, res) => {
  res.json(historico);
});

carregarEstado();

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando na rede na porta ${port}`);
});
