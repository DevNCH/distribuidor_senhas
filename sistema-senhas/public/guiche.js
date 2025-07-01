async function chamarSenha(guiche) {
  const response = await fetch("http://26.163.174.90:3000/chamar", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guiche })
  });
  const data = await response.json();
  document.getElementById("senha").innerText = data.senha;
}
