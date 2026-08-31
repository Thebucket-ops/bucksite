import { Player } from "./player.js";
export class medkit{
    constructor(game, x, y){
        this.game=game;
        this.width=75;
        this.height=75;
        this.x=x;
        this.y=y;
        this.remove=false;
        this.image=document.getElementById('medkit');//TO CHANGE
    }
    update(){
        if((this.game.player.x+this.game.player.width>this.x)&&(this.game.player.x<this.x+this.width)&&
    (this.game.player.y+this.game.player.height>this.y)&&(this.game.player.y<this.y+this.height)){
            this.game.player.health+=20;
            this.remove=true;
        }
    }
    draw(context){
        context.drawImage(this.image, 0, 0, 50, 50, 
            this.x, this.y, this.width, this.height);
    }
}

export class moreDamage{
    constructor(game, x, y){
        this.game=game;
        this.width=75;
        this.height=75;
        this.x=x;
        this.y=y;
        this.remove=false;
        this.image=document.getElementById('moreDamage');//TO CHANGE
    }
    update(){
        if((this.game.player.x+this.game.player.width>this.x)&&(this.game.player.x<this.x+this.width)&&
    (this.game.player.y+this.game.player.height>this.y)&&(this.game.player.y<this.y+this.height)){
            this.game.player.damage+=1;
            this.remove=true;
        }
    }
    draw(context){
        context.drawImage(this.image, 0, 0, 50, 50, 
            this.x, this.y, this.width, this.height);
    }
}

export class EXPLODE{
    constructor(game, x, y){
        this.game=game;
        this.width=75;
        this.height=75;
        this.x=x;
        this.y=y;
        this.remove=false;
        this.image=document.getElementById('EXPLODE');//TO CHANGE
    }
    update(){
        if((this.game.player.x+this.game.player.width>this.x)&&(this.game.player.x<this.x+this.width)&&
    (this.game.player.y+this.game.player.height>this.y)&&(this.game.player.y<this.y+this.height)
        ){
            this.game.explosive=true;
            this.remove=true;
        }
    }
    draw(context){
        context.drawImage(this.image, 0, 0, 50, 50, 
            this.x, this.y, this.width, this.height);
    }
}