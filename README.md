# Sistema de Senhas – Posto de Saúde

Este projeto é um **sistema simples de gerenciamento de senhas** para uso em guichês de atendimento.  
Ele é composto por um **servidor Node.js** (empacotado em `.exe` para facilitar a instalação) e páginas em **HTML/JS** que permitem:  

- **Chamar senhas** no guichê  
- **Exibir painel** com as últimas senhas chamadas  
- **Definir ou zerar senha manualmente**  

---

## 🚀 Tecnologias utilizadas
- [Node.js](https://nodejs.org) (empacotado com `pkg`)
- [Express](https://expressjs.com/)
- [CORS](https://www.npmjs.com/package/cors)
- HTML, CSS e JavaScript puro (sem frameworks)

---

## 📂 Estrutura de pastas

Sistema de Senhas
│── data/ # Arquivos de dados  
│ └── estado_senha.json  
│── images/ # Imagens usadas no sistema  
│ ├── logo_FMP.png  
│ └── logo_Prefeitura_Palhoca.png  
│── public/ # Arquivos JS e CSS  
│ ├── guiche.js  
│ ├── painel.js  
│ └── style.css  
│── views/ # Páginas HTML dos guichês e painel  
│ ├── guiche_1.html  
│ ├── guiche_2.html  
│ ├── guiche_3.html  
│ ├── guiche_4.html  
│ ├── guiche_5.html  
│ └── index.html  
│── sistema-senhas.exe # Servidor compilado em conjunto com o NodeJS  
│── unins000.exe # Desinstalador gerado pelo instalador  
└── sistema-senhas.exe # Servidor empacotado para Windows  

---

## 🚀 Como usar

1. Após a instalação, abra o **Sistema de Senhas**:
   - Clique duas vezes em `sistema-senhas.exe`
   - A janela do servidor será aberta

2. Acesse no navegador:
   - **No mesmo computador:**  
     [http://localhost:3000](http://localhost:3000)

   - **Em outro dispositivo da mesma rede:**  
     ```
     http://IP_DO_SERVIDOR:3000
     ```
     (Exemplo: `http://192.168.1.10:3000`)

---

## 🔥 Firewall

Durante a instalação, o instalador cria automaticamente uma regra de firewall para permitir conexões na porta **3000**.  
Se outro dispositivo não conseguir acessar, verifique:

- O servidor está rodando (`sistema-senhas.exe` aberto)?
- O firewall do Windows está permitindo conexões **Privadas e Públicas** para o executável?
- Está usando o **IP correto do servidor** (use `ipconfig` no prompt para verificar)?

---

## 🔄 Atualizações

Quando houver uma nova versão:

1. Desinstale a versão atual (opcional, mas recomendado).
2. Instale o novo **setup.exe**.
3. O instalador substituirá os arquivos automaticamente.

---

## 📌 Observações

- Não é necessário instalar **Node.js** nem rodar comandos (`npm install` etc.), pois o servidor já está compilado dentro do `sistema-senhas.exe`.  
- O arquivo `estado_senha.json` guarda o número atual da senha, garantindo que o contador continue mesmo após reiniciar o servidor.

---

✍️ Desenvolvido para facilitar a organização de atendimentos multi-guichê.
