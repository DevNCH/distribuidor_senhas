async function chamarSenha(guiche) {
  const response = await fetch("http://26.163.174.90:3000/chamar", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guiche })
  });
  const data = await response.json();
  document.getElementById("senha").innerText = "Senha atual: " + data.senha;
}

async function zerarSenhas() {
  const status = document.getElementById('statusSenha');
  try {
    const res = await fetch('/zerarSenha', { method: 'POST' });
    const data = await res.json();

    if (data.mensagem) {
      await fetch('/definirSenha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha: 'A000' })
      });
      status.textContent = 'Senha zerada com sucesso.';
      status.style.color = 'blue';
    } else {
      status.textContent = data.erro || 'Erro ao zerar senha';
      status.style.color = 'red';
    }
  } catch (err) {
    status.textContent = 'Erro ao comunicar com o servidor';
    status.style.color = 'red';
  }
}

async function iniciarAtendimento() {
  const input = document.getElementById('senhaManual');
  const status = document.getElementById('statusSenha');
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
      input.value = ""  ;
    } else {
      status.textContent = data.erro || 'Erro ao definir senha';
      status.style.color = 'red';
    }
  } catch (err) {
    status.textContent = 'Erro ao comunicar com o servidor';
    status.style.color = 'red';
  }
}