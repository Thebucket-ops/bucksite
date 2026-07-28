import {Player} from "./player.js";
export class Rails{

    constructor(game){
        // this.image =document.getElementById('player'); //Note to change placeholder

       
        this.fps=60;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        //change below for each individual rail
        this.gracespace=25;
    }
    update(deltaTime, speed, check){
        

        if(!this.game.player.gameRestart){
            this.x-=speed;
        }


        

    }
    draw(context){
        context.fillStyle="black";
        context.shadowColor = "black";
        context.shadowBlur = 0;
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, 0, 0, this.width, this.height, 
            this.x, this.y, this.width, this.height); 
    }


}

export class rail1 extends Rails{
    constructor(game){
        super();
        this.game=game;
        this.width=310;
        this.height=100;
        this.image=document.getElementById("rail1");
        this.x= this.game.width;
        this.y= this.game.height-this.height;
        this.railspecial=false;
    }
    update(deltaTime, speed, check){
        super.update(deltaTime, speed);
    }
}

export class rail2 extends Rails{
    constructor(game){
        super();
        this.game=game;
        this.width=600;
        this.height=70;
        this.image=document.getElementById("rail2");
        this.x= this.game.width;
        this.y= this.game.height-this.height;
        this.railspecial=false;
    }
    update(deltaTime, speed, check){
        super.update(deltaTime, speed);
    }
}

export class rail3 extends Rails{
    constructor(game){
        super();
        this.game=game;
        this.width=30;
        this.height=100;
        this.image=document.getElementById("rail3");
        this.x= this.game.width;
        this.y= this.game.height-this.height;
        this.railspecial=true;
    }
    update(deltaTime, speed, check){
        super.update(deltaTime, speed);
    }
}

export class rail4 extends Rails{
    constructor(game){
        super();
        this.game=game;
        this.width=500;
        this.height=30;
        this.image=document.getElementById("rail4");
        this.x= this.game.width;
        this.y= this.game.height-this.height;
        this.railspecial=false;
    }
    update(deltaTime, speed, check){
        super.update(deltaTime, speed);
    }
}