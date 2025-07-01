async function atualizarPainel() {
  try {
    const historico = await fetch("http://26.163.174.90:3000/historico").then(r => r.json());

    document.getElementById("senhaAtual").innerText = historico[0].senha;
    document.getElementById("guicheAtual").innerText = "Guichê " + historico[0].guiche;
    const container = document.getElementById("anteriores");
    container.innerHTML = "";

    historico.slice(1, 5).forEach(item => {
      container.innerHTML += `
        <div class="senha-anterior">
          <h3>SENHA ${item.senha}</h3>
          <p>Guichê ${item.guiche}</p>
        </div>
      `;
    });
  } catch (erro) {
    console.error("Erro ao atualizar painel:", erro);
  }
}

// Atualiza a cada 0.1 segundo
setInterval(atualizarPainel, 100);
atualizarPainel();