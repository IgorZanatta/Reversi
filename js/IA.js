let variable = 3;

function IA(currentPlayer) {
    this.currentPlayer = currentPlayer;
    this.maxDepth = variable;
}

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
    this.visits = 0;
    var res = this.minimax(board, 0, this.currentPlayer, this.maxDepth, -100000, 100000);
    console.log("Total nodes: " + this.visits);
    return res;
}

IA.prototype.minimax = function(board, depth, currentPlayer, maxDepth, alpha, beta) {
    this.visits++;
    var newBoard, score, move;
    var bestMove;
    var moves = board.getAllValidMoves(currentPlayer);

    //console.log("Call depth " + depth + " for player " + currentPlayer, moves);
    if(depth >= maxDepth || moves.length === 0){
        var he = this.mobility(board, currentPlayer);
        return he;
    }
    if(currentPlayer === this.currentPlayer){
        // Maximize
        for (var i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            newBoard = board.copy();
            this.doMove(newBoard, move, currentPlayer);
            score = this.minimax(newBoard, (depth + 1), (currentPlayer ? 0 : 1), maxDepth, alpha, beta);
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
        // Minimize
        var min = 100000;
        for (var i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            newBoard = board.copy();
            this.doMove(newBoard, move, currentPlayer);
            score = this.minimax(newBoard, (depth + 1), (currentPlayer ? 0 : 1), maxDepth, alpha, beta);
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

IA.prototype.doMove = function(board, move, currentPlayer) {
    board.flip(move.x, move.y, currentPlayer);
}

IA.prototype.mobility = function(board, currentPlayer) {
    var aiMoves = board.getAllValidMoves(currentPlayer).length;
    var oppMoves = board.getAllValidMoves(currentPlayer ? 0 : 1).length;
    return Math.ceil((oppMoves + aiMoves) === 0 ? 0 : 100 * ((aiMoves - oppMoves)/(aiMoves + oppMoves)));
}
  