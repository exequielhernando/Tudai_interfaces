class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.board = new Board(this.context);
        this.player1 = new Player (this.context, 'Jugador 1', 1);
        this.player2 = new Player (this.context, 'Jugador 2', 2);
        this.tokens = [];
        this.turn = 1;
        this.currentToken = null;
        this.initialPositionX;
        this.initialPositionY;
        this.clickedToken = false;
        this.finishedGame = false;
        this.totalTokens = 42;
        this.drawInitialTokens();
        this.startGame();
    }

    drawInitialTokens(){
        let xInitialPositionP1 = 50;
        let xInitialPositionP2 = 920;
        this.drawPlayerToken(xInitialPositionP1, 'p1', this.player1);
        this.drawPlayerToken(xInitialPositionP2, 'p2', this.player2);
    }

    drawPlayerToken(xInitial, param, jugador) {
        let tmpY = 130;
        for (let row = 0; row < 7; row++) {
            let tmpX = xInitial;
            for(let col = 0; col < 3; col++) {
                let token = new Token (tmpX, tmpY, param, jugador);
                token.setContext(this.context);
                this.tokens.push(token);
                tmpX += 65;
            }
            tmpY += 65;
        } 
    }

    startGame() {
        this.board.drawBoard();       
    }

    prepareGame(){        
        this.board.drawBoard();       
        this.setTokens();
        this.checkCurrentTurn();
    }

    setTokens() {
        for (let i = 0; i < this.tokens.length; i++){
            this.tokens[i].draw();
        }
    }

    checkCurrentTurn() {
        if (this.turn === 1){
            document.querySelector('#J1').classList.add('current-shift');
            document.querySelector('#J2').classList.remove('current-shift');
        }
        else if(this.turn === 2) {
            document.querySelector('#J2').classList.add('current-shift');
            document.querySelector('#J1').classList.remove('current-shift');
        }
        else{
            document.querySelector('#J1').classList.remove('current-shift');
            document.querySelector('#J2').classList.remove('current-shift');
        }
    }

    isClickedToken(x, y) {       
        for (let i=0; i<this.tokens.length; i++) {
                let fichaTmp = this.tokens[i];
            if (fichaTmp.isClicked(x, y) && fichaTmp.getPlayer() === this.turn && fichaTmp.getStatus() !== 'inactiva' && !this.finishedGame) {
                this.currentToken = fichaTmp;
                this.clickedToken = true;
                this.tokens.splice(i,1);     
                this.initialPositionX = this.currentToken.x;
                this.initialPositionY = this.currentToken.y;    
                return true;
            }                
        }
    }

    haveClickedToken() {
        return this.clickedToken;
    }

    moveToken(x, y) {
        this.currentToken.x = x;
        this.currentToken.y = y;
        this.tokens.push(this.currentToken);
        this.prepareGame();
    }

    resetclickedToken() {
        this.currentToken = null;
        this.clickedToken = false;
    }

    insertToken(x, y){

        if(this.board.couldInsertToken(x, y, this.currentToken)){
            this.totalTokens--;
            if (this.isWinner()) {
                let winnerMessage = document.getElementById('winner-info');
                if(this.turn === 1)
                    winnerMessage.innerHTML = 'Winner PLAYER 1';
                else
                    winnerMessage.innerHTML = 'Winner PLAYER 2';
                winnerMessage.classList.remove('hide');
                this.finishedGame = true;
            }
            else if(this.totalTokens === 0){
                this.finishedGame = true;
                let alert = document.getElementById('draw-info');
                alert.classList.remove('hide');
            }
            else
                this.turn = (this.turn === 1) ? 2:1;
        }
        else{
            this.currentToken.x = this.initialPositionX;
            this.currentToken.y = this.initialPositionY;
            this.tokens.push(this.currentToken);
        }
        this.resetclickedToken();
        this.prepareGame();
    }

    isWinner(){
        let isWinner = false;
        if(this.board.checkVertical() || this.board.checkHorizontal() ||
        this.board.checkHorizontal() || this.board.checkDiagonal()) 
            isWinner = true;
        return isWinner;
    }
}