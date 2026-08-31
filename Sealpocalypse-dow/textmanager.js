export class gameText{
    constructor(game, record){
        this.game=game;
        this.hp=150;
        this.points=0;
        this.pastRecord=record;
        this.defeatscreen=false;
        this.redtimer=0;
        this.string="";
    }
    update(hp, points, defeat, deltaTime){
        this.hp=hp;
        this.points=points;
        this.defeat=defeat;
        this.string=""+Math.floor(this.points)+"";
    }
    draw(context, alpha){

        context.shadowColor = "yellow";
        if(this.hp<=30){
            this.redtimer+=1;
            if((this.redtimer%this.hp)>=this.hp/2){
                context.fillStyle="rgba(255, 0, 0,"+alpha+")";
                context.shadowColor = "rgba(255, 0, 0,"+alpha+")";
            }else{
                context.fillStyle="rgba(102, 102, 102,"+alpha+")";
                context.shadowColor = "rgba(102, 102, 102,"+alpha+")";
            }
        }else{this.redtimer=0;}

        if(this.hp<=0){
                context.fillStyle="rgb(102, 102, 102,"+alpha+")"
                context.shadowColor = "rgba(255, 0, 0,"+alpha+")";
                this.hp=0;
        }
        if(this.hp>150){
            context.fillStyle= "rgba(0, 13, 194,"+alpha+")";
            context.shadowColor = "rgba(23, 38, 248,"+alpha+")";
        }
        
        context.font = "bold 60px Quantico";
        
        context.shadowBlur = 9;
        context.fillText(this.hp, 115,this.game.height/2+120
        );

        //draw points
        context.fillStyle= "rgba(234, 248, 255,"+alpha+")";
        context.font = "80px Monospace";
        context.shadowColor = "rgba(234, 248, 255,"+alpha+")";
        context.shadowBlur = 8;
        context.fillText(Math.floor(this.points), this.game.width-(30+this.string.length*40),75);
        //draw record
        if(this.points>this.pastRecord&& this.pastRecord!=0){
            context.fillStyle= "rgba(40, 202, 35,"+alpha+")";
            context.font = "35px Monospace";
            context.shadowColor = "rgba(40, 202, 35,"+alpha+")";
            context.shadowBlur = 6;
            context.fillText("New Record!", this.game.width-(60+7*25),143);
        }else if(this.pastRecord!=0){
            context.fillStyle= "rgb(255, 102, 0,"+alpha+")";
            context.font = "35px Monospace";
            context.shadowColor = "rgb(255, 102, 0,"+alpha+")";
            context.shadowBlur = 6;
            context.fillText("Record: "+this.pastRecord, this.game.width-(70+9*25),143);
        }

        if(this.defeat){
            context.fillStyle= "black";
            context.font = "bold 90px Quantico";
            // context.fontWeight="700"
            // context.fontStyle="Italic"
            context.shadowColor = "black";    
            context.shadowBlur = 0;
            context.fillText("Game Over", this.game.width/2, this.game.height/2-300);

            context.font = "60px Monospace";
            context.fillText("Press [R] to restart", this.game.width/2+110, this.game.height/2-216);
        }
        
    }
}

export class menuText{
    constructor(game){
        this.game=game;
        this.alpha=0.005;
        this.readyGame=false;
        this.startwidth=500;
        this.startheight=170;
        this.startx=(this.game.width/2)-(this.startwidth/2);
        this.starty=(this.game.height/2)-(this.startheight/2);
    }
    update(deltaTime,alpha,startgame){

        if(!startgame&&this.alpha<1){
            this.alpha+=0.005;
        }

        if(startgame && this.alpha>0){
            this.alpha-=alpha;
        }

        if(this.alpha<=0){
            this.readyGame=true;// WHEN THIS TRUE MAKE BLACK BOX DISAPPEAR GRADUALLY
        }

    }
    draw(context){
        context.fillStyle= "rgba(238, 255, 0,"+this.alpha+")";
        context.font = "130px Bungee Spice";
        context.shadowColor = "rgba(4, 0, 255,"+this.alpha+")";    
        context.shadowBlur = 12;
        context.fillText("SEALPOCALYPSE", 410, this.game.height/2-200);
//cool fonts: BBH Bartle Bungee Spice Anta

        //start button
        context.fillStyle="rgba(0, 153, 133,"+this.alpha+")";
        context.fillRect(this.startx, this.starty, this.startwidth, this.startheight);
        context.fillStyle="rgba(187, 230, 0,"+this.alpha+")";
        context.fillRect(this.startx+4, this.starty+4, this.startwidth-8, this.startheight-8);

        context.fillStyle= "rgba(0, 0, 0,"+this.alpha+")";
        context.font = "bold 80px Quantico";
        context.shadowColor = "rgba(4, 0, 255,"+this.alpha+")";    
        context.shadowBlur = 3;
        context.fillText("PLAY", this.startx+140, this.starty+110);

        context.font = "bold 40px Quantico";
        context.fillStyle= "rgba(212, 219, 255,"+this.alpha+")";
        context.shadowColor = "rgba(196, 193, 255,"+this.alpha+")";    
        context.fillText("MOVE: WASD/arrow keys", this.startx+670, 950);
        context.fillText("SHOOT: left mouse click", this.startx+670, 1000);
    }
}