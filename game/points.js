import {Player} from "./player.js";

export class points{
    constructor(game){
        this.game=game;
        this.size=20;
        this.points=0;
        this.pointRail=0;
        this.pointRailSuppl=0;
        this.fade=0.00;
        this.colorStreak="rgb(255, 215, 0)";

        this.fps=60;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.string="";
    }
    update(deltaTime, special){
        

        if(this.frameTimer>this.frameInterval){
            //update number
            if(this.game.player.onRail==true && special &&!this.game.player.gameRestart){
                    this.points+=100;
                    this.pointRail+=100;
                    this.pointRailSuppl=this.pointRail;
                    this.fade=1;
                }else if(this.game.player.onRail==true &&!this.game.player.gameRestart){
                    this.points+=10;
                    this.pointRail+=10;
                    this.pointRailSuppl=this.pointRail;
                    this.fade=1;
                }else if (this.game.player.onGround){
                    this.pointRail=0;
                    this.fade-= 0.05;
                } else {
                    this.fade-= 0.01;
                }


            if(!this.game.player.gameRestart){  
                this.points+=1;
            }

            //position update in case digits increase
        }else{
            this.frameTimer+=deltaTime;
        }

        this.string=""+this.points+"";
        // console.log(this.string);
    }
    draw(context, special, record){
        const grad=context.createLinearGradient(0,0,280,this.fade);
            grad.addColorStop(0, "lightblue");
            grad.addColorStop(1, "darkblue");

        if(this.game.player.onRail==true && special && !this.game.player.gameRestart){
            context.font = "50px Monospace";            
            context.fillStyle = grad;
            context.shadowColor = grad;
            context.shadowBlur = 8;
            context.fillText(this.string, this.game.width-this.string.length*25 -20, 45);

            context.font = "30px Monospace";                    //change placement when have replaced placeholders
            context.fillText("+"+this.pointRail, 300, 140);

        }else if(this.game.player.onRail==true && !this.game.player.gameRestart){
            context.font = "50px Monospace";            
            context.fillStyle = "gold";
            context.shadowColor = "yellow";
            context.shadowBlur = 8;
            context.fillText(this.string, this.game.width-this.string.length*25 -20, 45);

            context.font = "30px Monospace";                    //change placement when have replaced placeholders
            context.fillText("+"+this.pointRail, 300, 140);

        }else{
            context.font = "50px Monospace";            
            context.fillStyle = "black";
            context.shadowColor = "black";
            context.shadowBlur = 0;
            context.fillText(this.string, this.game.width-this.string.length*25 -20, 45);

            if (this.game.player.onGround||this.pointRail==0){        
                context.fillStyle= "rgba(255, 0, 0, " + this.fade + ")";
                context.fillText("+"+this.pointRailSuppl, 300, 140);         //rail points
            }else{
                context.font = "30px Monospace";      
                context.fillStyle= "rgba(255, 215, 0, " + this.fade + ")";
                context.fillText("+"+this.pointRailSuppl, 300, 140);
            }

            if(this.game.player.gameRestart){   //draw game over
                
                context.fillStyle= "black";
                context.font = "80px Monospace";
                context.fillText("Game Over", this.game.width/2, this.game.height/2-50);

                context.font = "40px Monospace";
                context.fillText("Press [R] to restart", this.game.width/2+110, this.game.height/2-16);
            }
        }


        if(this.game.record!=0 && !this.game.player.gameRestart && this.points<=this.game.record){
                context.fillStyle= "black";
                context.shadowColor = "black";
                context.shadowBlur = 0;
                context.font = "20px Monospace";
                context.fillText("Record:"+ this.game.record, this.game.width-150, 70);

        }else if(this.points>this.game.record && this.game.record!=0){              //shows the record of the player (doesnt save between sessions)
                context.fillStyle= "darkgreen";
                context.shadowColor = "green";
                context.shadowBlur = 5;
                context.font = "20px Monospace";
                context.fillText("New record!", this.game.width-135, 70);
            }
    }



}