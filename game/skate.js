import {Player} from "./player.js";
export class Skate {
    constructor(game){
        this.game=game;
        this.speed=0;
        this.height=109;
        this.width=199;
        this.x=Math.floor(this.game.width/6-90);
        this.y=this.game.height-this.height;
        this.image =document.getElementById('player');
        this.frameX=3;
        this.frameY=2;
    }
    update(){
        if (this.game.player.gameRestart){
            this.x+=this.speed/2;
            console.log(this.x);
        }
    }
    draw(context){
        if (this.game.player.gameRestart && this.game.player.onGround){
            // context.fillRect(this.x, this.y, this.width, this.height);
                    context.fillStyle="black";
        context.shadowColor = "black";
        context.shadowBlur = 0;
            context.drawImage(this.image, this.width*this.frameX , 170*this.frameY, this.width, 170, 
            this.x, this.y, this.width,this.height); //why do i do this to me
            
        }
    }



}