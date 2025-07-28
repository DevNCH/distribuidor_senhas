async function atualizarPainel() {
  try {
    const historico = await fetch("http://26.163.174.90:3000/historico").then(r => r.json());
    const container = document.getElementById("anteriores");

    if (historico.length > 0 && historico[0]?.senha && historico[0]?.guiche) {
      document.getElementById("senhaAtual").innerText = historico[0].senha;
      document.getElementById("guicheAtual").innerText = "Guichê " + historico[0].guiche;
      container.innerHTML = "";

      historico.slice(1, 5).forEach(item => {
        container.innerHTML += `
          <div class="senha-anterior">
            <h3>SENHA ${item.senha}</h3>
            <p>Guichê ${item.guiche}</p>
          </div>
        `; 
      });
    } else {
      document.getElementById("senhaAtual").innerText = "";
      document.getElementById("guicheAtual").innerText = "";
      container.innerHTML = "";
    }
  } catch (erro) {
    console.error("Erro ao atualizar painel:", erro);
  }
}

async function iniciarAtendimento() {
  const input = document.getElementById('senhaManual');
  const status = document.getElementById('statusSenha');
  const bloco = document.getElementById('blocoSenhaManual');
  const senha = input.value.trim().toUpperCase();

  if (!/^A\d{3}$/.test(senha)) {
    status.textContent = 'Formato inválido. Use A000 até A999';
    status.style.color = 'red';
    return;
  }

  try {
    const res = await fetch('/definirSenha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha })
    });
    const data = await res.json();

    if (data.mensagem) {
      status.textContent = data.mensagem;
      status.style.color = 'green';
      setTimeout(() => bloco.remove(), 1000);
    } else {
      status.textContent = data.erro || 'Erro ao definir senha';
      status.style.color = 'red';
    }
  } catch (err) {
    status.textContent = 'Erro ao comunicar com o servidor';
    status.style.color = 'red';
  }
}

// Atualiza a cada 0.1 segundo
setInterval(atualizarPainel, 100);
atualizarPainel();