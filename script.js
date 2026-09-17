// Array para armazenar os jogadores
let jogadores = [];

// Selecionando os elementos do HTML
const inputNome = document.getElementById('nomeJogador');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaJogadores = document.getElementById('listaJogadores');

// 1. CARREGAR OS DADOS AO ABRIR A PÁGINA
function carregarDados() {
    const dadosSalvos = localStorage.getItem('placar_jogadores');
    if (dadosSalvos) {
        // Converte o texto salvo de volta para um array/objeto do JavaScript
        jogadores = JSON.parse(dadosSalvos);
        renderizarPlacar();
    }
}

// 2. SALVAR OS DADOS NO NAVEGADOR
function salvarDados() {
    // O localStorage só guarda textos, por isso usamos JSON.stringify para transformar o array em texto
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

    salvarDados(); // Salva após adicionar
    renderizarPlacar();
});

// Função para incrementar os pontos (+1)
function adicionarPonto(index) {
    jogadores[index].pontos += 1;
    salvarDados(); // Salva após alterar pontos
    renderizarPlacar();
}

// Função para decrementar os pontos (-1)
function removerPonto(index) {
    if (jogadores[index].pontos > 0) {
        jogadores[index].pontos -= 1;
        salvarDados(); // Salva após alterar pontos
        renderizarPlacar();
    }
}

// Função para excluir o jogador
function removerJogador(index) {
    if (confirm(`Tem certeza que deseja remover ${jogadores[index].nome}?`)) {
        jogadores.splice(index, 1);
        salvarDados(); // Salva após excluir
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

// Executa a função de carregar assim que o script é lido
carregarDados();