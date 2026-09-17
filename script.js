let jogadores = [];

const inputNome = document.getElementById('nomeJogador');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaJogadores = document.getElementById('listaJogadores');

// 1. CARREGAR OS DADOS AO ABRIR A PÁGINA
function carregarDados() {
    const dadosSalvos = localStorage.getItem('placar_jogadores');
    if (dadosSalvos) {
        jogadores = JSON.parse(dadosSalvos);
        renderizarPlacar();
    }
}

// 2. SALVAR OS DADOS NO NAVEGADOR
function salvarDados() {
    localStorage.setItem('placar_jogadores', JSON.stringify(jogadores));
}

// Função para adicionar um novo jogador
btnAdicionar.addEventListener('click', () => {
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Por favor, digite o nome do jogador.");
        return;
    }

    const novoJogador = {
        nome: nome,
        pontos: 0
    };

    jogadores.push(novoJogador);
    inputNome.value = "";

    salvarDados(); 
    renderizarPlacar();
});

// Função para incrementar os pontos 
function adicionarPonto(index) {
    jogadores[index].pontos += 1;
    salvarDados(); 
    renderizarPlacar();
}

// Função para decrementar os pontos 
function removerPonto(index) {
    if (jogadores[index].pontos > 0) {
        jogadores[index].pontos -= 1;
        salvarDados(); 
        renderizarPlacar();
    }
}

// Função para excluir o jogador
function removerJogador(index) {
    if (confirm(`Tem certeza que deseja remover ${jogadores[index].nome}?`)) {
        jogadores.splice(index, 1);
        salvarDados(); 
        renderizarPlacar();
    }
}

// Função para atualizar a exibição da lista na tela
function renderizarPlacar() {
    listaJogadores.innerHTML = "";

    jogadores.sort((a, b) => b.pontos - a.pontos);

    jogadores.forEach((jogador, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <span class="info-jogador">${jogador.nome} - ${jogador.pontos} pts</span>
            <div class="acoes-jogador">
                <button class="btn-menos" onclick="removerPonto(${index})">-1</button>
                <button class="btn-mais" onclick="adicionarPonto(${index})">+1</button>
                <button class="btn-remover" onclick="removerJogador(${index})">Excluir</button>
            </div>
        `;

        listaJogadores.appendChild(li);
    });
}


carregarDados();
