function Player(name, number, Machine, qtdPieces) {
    // Função construtora para criar um jogador//
    this.name = name;
    this.number = number;
    this.Machine = Machine;
    this.color = number === 0 ? "black" : "white";
    this.qtdPieces = qtdPieces ? qtdPieces : 2;

    // Se o jogador for uma IA, cria uma instância da IA//
    if(this.Machine){
        this.IA = new IA(this.number);
    }
}

Player.prototype.getMove = function(board) {
    // Retorna o movimento escolhido pela IA//
    return this.IA.move(board);
}


let variable = 5;

function IA(defPlayer) {
    // Função construtora para criar uma IA//

    this.defPlayer = defPlayer;
    this.maxDepth = variable;
}


// Atualiza o tamanho da arvore de pesquisa quando o botao é precionado//

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');

button1.addEventListener('click', function() {
  variable = 3;
  console.log('Botão 1 pressionado. Variável atualizada:', variable);
});

button2.addEventListener('click', function() {
  variable = 5;
  console.log('Botão 2 pressionado. Variável atualizada:', variable);
});

button3.addEventListener('click', function() {
  variable = 8;
  console.log('Botão 3 pressionado. Variável atualizada:', variable);
});

button4.addEventListener('click', function() {
  variable = 10;
  console.log('Botão 4 pressionado. Variável atualizada:', variable);
});
  
IA.prototype.move = function(board) {
    // Realiza o movimento da IA no tabuleiro e retorna o movimento escolhido//
    this.visits = 0;
    var res = this.minimax(board, 0, this.defPlayer, this.maxDepth, -100000, 100000);
    console.log("Total nodes: " + this.visits);
    return res;
}

IA.prototype.minimax = function(board, depth, defPlayer, maxDepth, alpha, beta) {
    // Implementação do algoritmo minimax para tomar a melhor decisão de movimento//
    this.visits++;
    var newBoard, score, move;
    var bestMove;
    var moves = board.getAllValidMoves(defPlayer);

    //console.log("Call depth " + depth + " for player " + defPlayer, moves);
    if(depth >= maxDepth || moves.length === 0){
        // Condição de parada: profundidade máxima atingida ou nenhum movimento válido
        var he = this.mobility(board, defPlayer);
        return he;
    }
    if(defPlayer === this.defPlayer){
        // Maximiza
        for (var i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            newBoard = board.copy();
            this.doMove(newBoard, move, defPlayer);
            score = this.minimax(newBoard, (depth + 1), (defPlayer ? 0 : 1), maxDepth, alpha, beta);
            move.score = score;
            if(score > alpha){
                alpha = score;
                bestMove = move;
                
            }
            if(beta <= alpha){
                break;
            }
        }
        if(depth === 0){
            return bestMove;
        } else {
            return alpha;
        }
    } else {
        // Minimiza
        var min = 100000;
        for (var i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            newBoard = board.copy();
            this.doMove(newBoard, move, defPlayer);
            score = this.minimax(newBoard, (depth + 1), (defPlayer ? 0 : 1), maxDepth, alpha, beta);
            if(score < beta){
                beta = score;
            }
            if(beta <= alpha){
                break;
            }
        }
        return beta;
    }
}

IA.prototype.doMove = function(board, move, defPlayer) {
    board.flip(move.x, move.y, defPlayer);
}

IA.prototype.mobility = function(board, defPlayer) {
    var aiMoves = board.getAllValidMoves(defPlayer).length;
    var oppMoves = board.getAllValidMoves(defPlayer ? 0 : 1).length;
    return Math.ceil((oppMoves + aiMoves) === 0 ? 0 : 100 * ((aiMoves - oppMoves)/(aiMoves + oppMoves)));
}
  