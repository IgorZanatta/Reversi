function Board(players, existentBoard) {
    // Função construtora para criar um tabuleiro
    // Altere aqui para mudar o tamanho do tabuleiro, 6 para 6x6 e 8 para 8x8
    this.BoardSize = 8;
    this.players = players;
  
    this.generateBoard();
    this.startBoard(existentBoard);
}

Board.prototype.generateBoard = function() {
    // Gera o tabuleiro vazio
    var board = [];
    for (var x = 0; x < this.BoardSize; x++) {
        board[x] = [];
        for (var y = 0; y < this.BoardSize; y++) {
            board[x][y] = null;
        }
    }
    this.board = board;
}

Board.prototype.startBoard = function(existentBoard) {
    // Inicializa o tabuleiro com as peças iniciais
    if(existentBoard) {
        this.board = existentBoard;
    } else {
        var floor = Math.round((this.BoardSize/2)-1);
        var round =  Math.round((this.BoardSize/2));

        this.board[floor][floor] = this.players[0].color;
        this.board[round][round] = this.players[0].color;
        this.board[round][floor] = this.players[1].color;
        this.board[floor][round] = this.players[1].color;
    }
}

Board.prototype.searchUp = function(x, y, player) {
    // Procura peças na direção para cima
    var pieces = [];

    y--;
    while(y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        y--;
    }

    return [];
}

Board.prototype.searchDown = function(x, y, player) {
    // Procura peças na direção para baixo
    var pieces = [];

    y++;
    while(y < this.BoardSize){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                //console.log("currentSquare", x, y, initialX, initialY, this.board[x][y]);
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        y++;
    }
    
    return [];
}

Board.prototype.searchLeft = function(x, y, player) {
    // Procura peças na direção para esquerda
    var pieces = [];

    x--;
    while(x >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
    }

    return [];
}

Board.prototype.searchRight = function(x, y, player) {
    // Procura peças na direção para direita
    var pieces = [];

    x++;
    while(x < this.BoardSize){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
    }

    return [];
}

Board.prototype.searchUpLeft = function(x, y, player) {
    // Procura peças na direção para cima na esquerda
    var pieces = [];

    x--;
    y--;
    while(x >= 0 && y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
        y--;
    }

    return [];
}

Board.prototype.searchUpRight = function(x, y, player) {
    // Procura peças na direção para cima na direita
    var pieces = [];

    x++;
    y--;
    while(x < this.BoardSize && y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
        y--;
    }

    return [];
}

Board.prototype.searchDownLeft = function(x, y, player) {
    // Procura peças na direção para baixo na esquerda
    var pieces = [];

    x--;
    y++;
    while(x >= 0 && y < this.BoardSize){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
        y++;
    }

    return [];
}

Board.prototype.searchDownRight = function(x, y, player) {
    // Procura peças na direção para baixo na direita
    var pieces = [];

    x++;
    y++;
    while(x < this.BoardSize && y < this.BoardSize){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
        y++;
    }

    return [];
}

Board.prototype.getOpponentPieces = function(x, y, player) {

    // Obtém as peças do oponente que seriam viradas se o jogador atual fizesse um movimento em (x, y)
    var pieces = [];

    if(this.board[x][y]) {
        return [];
    }

    var up = this.searchUp(x, y, player);
    pieces = pieces.concat(up ? up : []);
    var down = this.searchDown(x, y, player);
    pieces = pieces.concat(down ? down : []);
    var left = this.searchLeft(x, y, player);
    pieces = pieces.concat(left ? left : []);
    var right = this.searchRight(x, y, player);
    pieces = pieces.concat(right ? right : []);
    var upLeft = this.searchUpLeft(x, y, player);
    pieces = pieces.concat(upLeft ? upLeft : []);
    var downLeft = this.searchDownLeft(x, y, player);
    pieces = pieces.concat(downLeft ? downLeft : []);
    var upRight = this.searchUpRight(x, y, player);
    pieces = pieces.concat(upRight ? upRight : []);
    var downRight = this.searchDownRight(x, y, player);
    pieces = pieces.concat(downRight ? downRight : []);
    
    return pieces;
}

Board.prototype.copy = function() {
    // Cria uma cópia do tabuleiro atual
    var tempPlayers = [];
    for (var i = this.players.length - 1; i >= 0; i--) {
      tempPlayers[i] = new Player(this.players[i].name, this.players[i].number, this.players[i].Machine, this.players[i].qtdPieces);
    };

    var tempBoard = [];
    for (var i = 0; i < this.board.length; i++) {
        tempBoard[i] = this.board[i].slice();
    }
    
    return new Board(tempPlayers, tempBoard);
  }

Board.prototype.validMove = function(x, y, defPlayer) {
    // Analisa se o movimento é valido
    var player = this.getPlayer(defPlayer);

    return this.getOpponentPieces(x, y, player).length !== 0;
}

Board.prototype.getAllValidMoves = function(defPlayer) {
    // analisa todos os movimentos validos
    var validMoves = [];

    for (var x = 0; x < this.BoardSize; x++) {
        for (var y = 0; y < this.BoardSize; y++) {
            if(this.validMove(x, y, defPlayer)) {
                validMoves.push({x: x, y: y});
            }
        }
    }

    return validMoves;
}

Board.prototype.flip = function(x, y, defPlayer) {
    // executa o movimento de virar as pecas necessarias
    var player = this.getPlayer(defPlayer);
    var otherPlayer = this.getPlayer(defPlayer, true);

    var pieces = this.getOpponentPieces(x, y, player)

    for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];

        this.board[piece.x][piece.y] = player.color;
    }
    this.board[x][y] = player.color;

    player.qtdPieces += pieces.length + 1;
    otherPlayer.qtdPieces -= pieces.length;
}

Board.prototype.getPlayer = function(defPlayer, opp) {
    var player;

    if(!opp) {
        player = this.players[defPlayer]
    } else {
        player = this.players[defPlayer ? 0 : 1]
    }

    return player;
}