(function () {
    "use strict"
    console.log(window.location.href);
    var players, defPlayer, board;
    var boardContainer = $(".boardContainer");
    var table;
    var url = window.location.href;

    // Verifica a URL para determinar qual modo de jogo iniciar
    //Mudar a URL com base no seu endereço, exemplo o meu http://127.0.0.1:5500/Trabalho-IA/html/JogoIa.html//
    //http://127.0.0.1:5500/Trabalho-IA/html/JogoIa.html//
    //http://127.0.0.1:5500/Trabalho-IA/html/jogo.html//
    
    if(url.includes("https://igorzanatta.github.io/Reversi/html/JogoIa.html")){
        startGameIA();
    }else{
        startGame();
    }
    
    function startGame() {
        // Inicia o jogo no modo jogador vs jogador
        players = [
            new Player("Player 1", 0, false),
            new Player("Player 2", 1, false)
        ];
        defPlayer = 0;
        board = new Board(players);
        BoardRender(board.board);
    }

    function startGameIA() {
        // Inicia o jogo no modo jogador vs I.A
        players = [
            new Player("Player", 0, false),
            new Player("I.A", 1, true)
        ];
        defPlayer = 0;
        board = new Board(players);
        BoardRender(board.board);
    }

    function BoardRender(board) {
        // Renderiza o tabuleiro no elemento HTML
        if(table) {
            // Atualiza o estado do tabuleiro
            for (var y = 0; y < board.length; ++y) {
                for (var x = 0; x < board.length; ++x) {
                    var piece = board[x][y] ? board[x][y] : "";
                    var td = $("#"+x+y).attr('class', "square "+piece);
                }
            }
        } else {
            // Cria o tabuleiro no elemento HTML
            boardContainer.empty();

            table = "<table class='board'>";
            for (var y = 0; y < board.length; ++y) {
                table += '<tr>';
                for (var x = 0; x < board.length; ++x) {
                    var piece = board[x][y] ? board[x][y] : "";
    
                    table += '<td class="square '+piece+'" id=' + x + y + '><div></div></td>';
                }
            }
            table += " </table>";
            boardContainer.append(table);
            CheckClick();
        }
        
        $(".turn").html("Vez do jogador " + players[defPlayer].name);
        $("#score1").text(players[0].qtdPieces);
        $("#score2").text(players[1].qtdPieces);
        $(".winner").hide();
    }

    function CheckClick() {
        $('.board .square').click(function () {
            // Adiciona os ouvintes de cliques nas células do tabuleiro
            if(defPlayer !== 0 && url.includes("http://127.0.0.1:5500/html/JogoIa.html")) {
                return;
            }

            var $this = $(this);
            var x = parseInt($this.attr('id').charAt(0));
            var y = parseInt($this.attr('id').charAt(1));

            proccessMove(x, y);
        });
    }

    function proccessMove(x, y) {
        // Processa o movimento feito pelo jogador
        var valid = board.validMove(x, y, defPlayer)

        if(valid) {
            var otherPlayer = defPlayer === 0 ? 1 : 0;
            board.flip(x, y, defPlayer);
            BoardRender(board.board);

            defPlayer = otherPlayer;

            var availableMoves = board.getAllValidMoves(defPlayer);
            if(!availableMoves.length) {
                var availableMovesNextPlayer = board.getAllValidMoves(defPlayer ? 0 : 1);

                if(!availableMovesNextPlayer.length) {
                    finishGame();
                    return;
                } else {
                    var noTurnPlayerName = players[defPlayer].name;
                    setTimeout(function(){
                        alert("Jogador " + noTurnPlayerName + " não tem jogadas disponíveis, passando a vez...");
                    }, 1000);
                    defPlayer = defPlayer ? 0 : 1;
                }
            }

            $(".turn").html("Vez do jogador " + players[defPlayer].name);

            if(players[defPlayer].Machine) {
                // Se for a vez da IA, faz o movimento da IA
                setTimeout(function(){
                    var t0 = performance.now()
                    var move = players[defPlayer].getMove(board);
                    var t1 = performance.now()
                    proccessMove(move.x, move.y);
                    console.log("IA process time " + (t1 - t0) + " milliseconds.");
                }, 3000);
            }
        }
    }

    function finishGame() {
        // Finaliza o jogo e exibe o vencedor ou empate
        var messageWin;

        if(players[0].qtdPieces > players[1].qtdPieces) {
            messageWin = "O vencedor foi " + players[0].name + "!";
        } else if(players[1].qtdPieces > players[0].qtdPieces) {
            messageWin = "O vencedor foi  " + players[1].name + "!";
        } else {
            messageWin = "O jogo terminou empatado."
        }

        $(".winner").show();
        $(".winner").html(messageWin);
    }
    
    $("#restartButton").click(function () {
        // Reinicia o jogo ao clicar no botão de reiniciar
        if(url.includes("http://127.0.0.1:5500/html/JogoIa.html")){
        startGameIA();
        }else{
        startGame();
    }
    });
})();
