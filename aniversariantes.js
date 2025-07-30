async function preencherAniversariantes() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6Fw14kParnycKI32kwuUqUn8BQCLiCcOOjQA9QSNzrQOGcXE_Pv0wol-Lh0F-6J6i_yv7eSb06kKF/pub?gid=0&single=true&output=csv';
  const ul = document.getElementById('aniversariantes-list');
  const mesAtual = String(new Date().getMonth() + 1).padStart(2, '0'); // Ex: "07" para julho

  try {
    const res = await fetch(url);
    const csv = await res.text();
    const linhas = csv.trim().split('\n').slice(1); // Remove cabeçalho
    ul.innerHTML = '';
    let encontrou = false;
    linhas.forEach(linha => {
      const [dia, nome, destaque] = linha.split(',');
      if (!dia || !nome) return;
      // Se a data for só o dia, adiciona o mês atual
      const diaFormatado = String(dia).padStart(2, '0') + '/' + mesAtual;
      encontrou = true;
      let nomeFormatado = nome;
      if ((destaque && destaque.trim().toLowerCase() === 'dr') || nome.trim().toLowerCase().startsWith('dr.')) {
        nomeFormatado = `<strong>${nome}</strong>`;
      }
      ul.innerHTML += `<li><strong>${diaFormatado}</strong> - ${nomeFormatado}</li>`;
    });
    if (!encontrou) {
      ul.innerHTML = '<li>Não há aniversariantes neste mês.</li>';
    }
  } catch (e) {
    ul.innerHTML = '<li>Não foi possível carregar aniversariantes.</li>';
  }
}

document.addEventListener("DOMContentLoaded", preencherAniversariantes);