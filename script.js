const projetos =
JSON.parse(
localStorage.getItem('projetos')
)
|| [];

let valorCalculado = 0;

function salvarProjetos(){

  localStorage.setItem(
    'projetos',
    JSON.stringify(projetos)
  );

}

function calcularOrcamento(){

  const horas =
  Number(
    document.getElementById(
      'horasProjeto'
    ).value
  );

  const valorHora =
  Number(
    document.getElementById(
      'valorHoraProjeto'
    ).value
  );

  const possuiDesconto =
  document.getElementById(
    'possuiDesconto'
  ).value;

  const desconto =
  Number(
    document.getElementById(
      'descontoProjeto'
    ).value
  );

  const urgencia =
  Number(
    document.getElementById(
      'urgenciaProjeto'
    ).value
  );

  valorCalculado =
  horas * valorHora;

  if(possuiDesconto === 'sim'){

    valorCalculado =
    valorCalculado -
    (
      valorCalculado *
      desconto / 100
    );

  }

  valorCalculado =
  valorCalculado +
  (
    valorCalculado *
    urgencia / 100
  );

  document.getElementById(
    'resultadoFinal'
  ).textContent =
  'R$ ' +
  valorCalculado.toFixed(2);

}

function criarProjeto(){

  const nome =
  document.getElementById(
    'nomeProjeto'
  ).value;

  const horas =
  Number(
    document.getElementById(
      'horasProjeto'
    ).value
  );

  const valorHora =
  Number(
    document.getElementById(
      'valorHoraProjeto'
    ).value
  );

  if(
    !nome ||
    horas <= 0 ||
    valorHora <= 0
  ){

    alert(
      'Preencha todos os campos.'
    );

    return;

  }

  if(valorCalculado <= 0){

    alert(
      'Calcule o orçamento primeiro.'
    );

    return;

  }

  projetos.push({

    nome,
    horas,
    valorHora,
    total:valorCalculado

  });

  salvarProjetos();

  renderizarProjetos();

  renderizarHistorico();

  atualizarResumo();

  limparCampos();

}

function limparCampos(){

  document.getElementById(
    'nomeProjeto'
  ).value = '';

  document.getElementById(
    'horasProjeto'
  ).value = '';

  document.getElementById(
    'valorHoraProjeto'
  ).value = '';

  document.getElementById(
    'descontoProjeto'
  ).value = '';

  document.getElementById(
    'urgenciaProjeto'
  ).value = '0';

  document.getElementById(
    'possuiDesconto'
  ).value = 'nao';

  document.getElementById(
    'resultadoFinal'
  ).textContent =
  'R$ 0,00';

  valorCalculado = 0;

}

function renderizarProjetos(){

  const lista =
  document.getElementById(
    'listaProjetos'
  );

  if(!lista){
    return;
  }

  lista.innerHTML = '';

  projetos.forEach((projeto)=>{

    const card =
    document.createElement(
      'section'
    );

    card.classList.add(
      'projeto-card'
    );

    card.innerHTML = `

      <div class="projeto-info">

        <div class="icone">
          💻
        </div>

        <div>

          <h3>
            ${projeto.nome}
          </h3>

          <p>
            ${projeto.horas}h
            •
            R$ ${projeto.valorHora}/h
          </p>

        </div>

      </div>

      <h2>
        R$ ${projeto.total.toFixed(2)}
      </h2>

    `;

    lista.appendChild(card);

  });

}

function renderizarHistorico(){

  const historico =
  document.getElementById(
    'historicoProjetos'
  );

  if(!historico){
    return;
  }

  historico.innerHTML = '';

  projetos.forEach(
  (projeto,index)=>{

    const card =
    document.createElement(
      'section'
    );

    card.classList.add(
      'projeto-card'
    );

    card.innerHTML = `

      <div class="projeto-info">

        <div class="icone">
          📁
        </div>

        <div>

          <h3>
            ${projeto.nome}
          </h3>

          <p>
            ${projeto.horas}h
          </p>

        </div>

      </div>

      <div class="acoes">

        <h2>
          R$ ${projeto.total.toFixed(2)}
        </h2>

        <button
        onclick="excluirProjeto(${index})">

          Excluir

        </button>

      </div>

    `;

    historico.appendChild(card);

  });

}

function excluirProjeto(index){

  projetos.splice(index,1);

  salvarProjetos();

  renderizarProjetos();

  renderizarHistorico();

  atualizarResumo();

}

function atualizarResumo(){

  const quantidade =
  document.getElementById(
    'quantidadeProjetos'
  );

  const horas =
  document.getElementById(
    'horasTotais'
  );

  const valor =
  document.getElementById(
    'valorTotal'
  );

  if(
    !quantidade ||
    !horas ||
    !valor
  ){
    return;
  }

  quantidade.textContent =
  'Projetos: ' +
  projetos.length;

  let somaHoras = 0;

  let somaValor = 0;

  projetos.forEach((projeto)=>{

    somaHoras += projeto.horas;

    somaValor += projeto.total;

  });

  horas.textContent =
  'Horas totais: ' +
  somaHoras;

  valor.textContent =
  'Valor total: R$ ' +
  somaValor.toFixed(2);

}

renderizarProjetos();

renderizarHistorico();

atualizarResumo();
atualizarResumo();