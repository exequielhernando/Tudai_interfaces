class Board{

    constructor(context){
        this.context = context;
        this.slot = [];
        this.slotX = [];
        this.slotY = [];
        this.topY = 93;
        this.initialSlotWinner = {'x':-1, 'y':-1};
        this.finalSlotWinner = {'x':-1, 'y':-1};
        this.winnerPosition = '';
        this.initSlot();
    }

    initSlot() {
        let diferenciaX = 95;
        let diferenciaY = 65;
        let fxInit = 320;
        let fy = 130;
        for (let y = 0; y < 7; y++) {
            let fx = fxInit;
            this.slot[fy+'-row'] = [];
            for (let x = 0; x < 6; x++) {
                let token = new Token (fx, fy, 'slot', 0);
                token.setContext(this.context);  
                this.slot[fy+'-row'][fx+'-col'] = token;
                this.slotX.push(fx);
                fx += diferenciaX;
            } 
            this.slotY.push(fy);
            fy += diferenciaY;           
        }
    }
    
    drawBoard() {
        this.context.fillStyle = '#FFD1AA';
        this.context.fillRect(0,0,1100,550);            
        this.context.fillStyle="#407F7F";
        this.context.fillRect(260,95,600,460);
        for (let row = 0; row < this.slotX.length; row++) {
            for (let col = 0; col < this.slotY.length; col++) {
               let token = this.slot[this.slotY[col]+'-row'][this.slotX[row]+'-col'];
                token.draw();
            }   
        }
    }

    couldInsertToken(x, y, currentToken) {
        if (y < this.topY && x > 250 && x < 850)
            return this.searchSlot(x, currentToken);
        return false;
    } 

    searchSlot(x, currentToken) {
        for(let i = 0; i < 7; i++) {
            if (this.slotX[i] > x - 25 && this.slotX[i] < x + 25){
                return this.insertToken(this.slotX[i], currentToken);
            }                    
        };
        return false;
    }

    insertToken(x, currentToken) {
        let posTmpY = -1;
        let couldInsert = false;        

        for (let y = 0; y < this.slotY.length; y++) {
            let tmpy = this.slotY[y];
            if (this.slot[tmpy+'-row'][x+'-col'].getPlayer() === 0){
                posTmpY = tmpy;
                couldInsert = true;
            }
        }
        if (posTmpY !== -1) {
            currentToken.setX(x);
            currentToken.setY(posTmpY);
            currentToken.setStatus('inactive');
            this.slot[posTmpY+'-row'][x+'-col'] = currentToken;
        }        
        return couldInsert;  
    }

    checkVertical() {
        let count = 0;
        let player = -1;
        let isWinner = false;
        
        for (let col = 0; col < 6; col++) {
            count = 0;
            for (let row = 0; row < 7; row++) {
                let token = this.slot[this.slotY[row]+'-row'][this.slotX[col]+'-col'];
                let valor = token.getPlayer();
                if (valor === 0) {
                    count = 0;
                    player = -1;
                }
                else if (valor !== player){
                    player = valor;
                    count = 1;
                    this.initialSlotWinner.x = col;
                    this.initialSlotWinner.y = row;
                }
                else
                    count++;
                
                if (count === 4){                    
                    isWinner = true; 
                    this.winnerPosition = 'vertical';
                    this.finalSlotWinner.x = col;
                    this.finalSlotWinner.y = row;                  
                    return isWinner;
                }                
            }
        }
        this.finalSlotWinner.x = -1;
        this.finalSlotWinner.y = -1;
        return isWinner;
    }

    checkHorizontal() {
        let count = 0;
        let player = -1;
        let isWinner = false;
        
        for (let row = 0; row < 7; row++) {
            count = 0;
            for (let col = 0; col < 6; col++) {
                let token = this.slot[this.slotY[row]+'-row'][this.slotX[col]+'-col'];
                let valor = token.getPlayer();
                if (valor === 0) {
                    count = 0;
                    player = -1;
                }
                else if (valor !== player){
                    player = valor;
                    count = 1;
                    this.initialSlotWinner.x = col;
                    this.initialSlotWinner.y = row;
                }
                else
                    count++;
                
                if (count === 4){
                    isWinner = true;
                    this.winnerPosition = 'horizontal';
                    this.finalSlotWinner.x = col;
                    this.finalSlotWinner.y = row;
                    return isWinner;
                }
            }
        }
        this.finalSlotWinner.x = -1;
        this.finalSlotWinner.y = -1;
        return isWinner;
    }

    checkDiagonal(){
        let isWinner = false;
        if (this.checkRightDiagonal() || this.checkLeftDiagonal())
            isWinner = true;
        return isWinner;
    }

    checkRightDiagonal() {
        let isWinner = false;
        for (let row = 3; row < 7; row++) {
            for (let col = 0; col < 3; col++) {
                let valorTmpY = row;
                let valorTmpX = col;
                let valor = this.slot[this.slotY[valorTmpY]+'-row'][this.slotX[valorTmpX]+'-col'].getPlayer();
                let fourInLine = false;
                if (valor !== 0) {
                    for (let i = 0; i < 3; i++) {
                        valorTmpY--;
                        valorTmpX++;
                        let valorTmp = this.slot[this.slotY[valorTmpY]+'-row'][this.slotX[valorTmpX]+'-col'].getPlayer();
                        if (valor !== valorTmp)
                            break;
                        if (i === 2)
                            fourInLine = true;
                    }
                }

                if (fourInLine){
                    isWinner = true;
                    this.winnerPosition = 'rightDiagonal';
                    this.initialSlotWinner.x = col;
                    this.initialSlotWinner.y = row;
                    this.finalSlotWinner.x = valorTmpX;
                    this.finalSlotWinner.y = valorTmpY;
                    return isWinner;
                }
            }
        }
        this.finalSlotWinner.x = -1;
        this.finalSlotWinner.y = -1;
        return isWinner;
    }

    checkLeftDiagonal() {
        let isWinner = false;
        for (let row = 6; row > 2; row--) {
            for (let col = 5; col > 2; col--) {
                let valorTmpY = row;
                let valorTmpX = col;
                let valor = this.slot[this.slotY[valorTmpY]+'-row'][this.slotX[valorTmpX]+'-col'].getPlayer();
                let fourInLine = false;
                if (valor !== 0) {
                    for (let i = 0; i < 3; i++) {
                        valorTmpY--;
                        valorTmpX--;
                        let valorTmp = this.slot[this.slotY[valorTmpY]+'-row'][this.slotX[valorTmpX]+'-col'].getPlayer();
                        if (valor !== valorTmp)
                            break;
                        if (i === 2)
                            fourInLine = true;
                    }
                }

                if (fourInLine){
                    isWinner = true;
                    this.winnerPosition = 'leftDiagonal';
                    this.initialSlotWinner.x = col;
                    this.initialSlotWinner.y = row;
                    this.finalSlotWinner.x = valorTmpX;
                    this.finalSlotWinner.y = valorTmpY;                    
                    return isWinner;
                }
            }
        }
        this.finalSlotWinner.x = -1;
        this.finalSlotWinner.y = -1;
        return isWinner;
    }
}