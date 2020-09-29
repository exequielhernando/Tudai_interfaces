class Player {
    constructor(context, name, playerNumber){
        this.context = context;
        this.name = name;
        this.playerNumber = playerNumber;
    }

    getName(){
        return this.name;
    }

    getPlayerNumber() {
        return this.playerNumber;
    }

    setName(name){
        this.name = name;
    }
    
}

  