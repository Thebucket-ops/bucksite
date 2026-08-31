import { Player } from "./player.js";
import { BoxBase } from "./hurtbox.js";




        


//remember to import them
export class baseSeal{
    constructor(game, hp, x, y, speed){
        this.image=document.getElementById('Enemy1')
        this.game=game;
        this.width=120;
        this.height=90;

        this.x=x;
        this.y=y;

        this.frameX=0;
        this.frameY=0;
        this.walkframes=7;
        this.attackframes=6;
        this.fps=14;
        this.attackframeInterval=1000/this.fps;
        this.lr=false;
        this.hitboxcreated=false;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;

        this.id=0; //defines the type of enemy

        this.basespeed=1+speed;

        this.deltaX=0;
        this.deltaY=0;
        this.damage=3;
        this.knockback=10;
        this.hp=3+hp; //base hp + hp that increases as time goes on
        this.dead=false;
        this.distance=0;

        this.vspeed=0;
        this.xspeed=0;
        this.isAttacking=false;
        this.attacktime=800;
        this.attacktimer=0;

    }
    update(deltaTime, playerX, playerY){
        this.deltaX=playerX+this.game.player.width/2-(this.x+this.width/2);
        this.deltaY=playerY+this.game.player.height/2-(this.y+this.height/2);
        this.distance=Math.sqrt((this.deltaX*this.deltaX)+(this.deltaY*this.deltaY))
        // this.angle=Math.atan2(this.deltaY,this.deltaX)*(180/Math.PI);
        // console.log(this.angle);
        

        if (this.x+(this.width/2)<this.game.player.x+(this.game.player.width/2)){
            if (((this.game.player.x-30<this.x+this.width)&&(this.game.player.y-30<this.y+this.width)&&(this.game.player.y+this.game.player.height+30>this.y))
                 || this.isAttacking){
                this.attack(this.x+this.width-30, this.y-30, this.damage, this.knockback, deltaTime, this.lr)
            }
        }else{

            if (((this.game.player.x+this.game.player.width+30>this.x)&&(this.game.player.y-30<this.y+this.width)&&(this.game.player.y+this.game.player.height+30>this.y))
             || this.isAttacking){
                this.attack(this.x-120, this.y-30, this.damage, this.knockback, deltaTime, this.lr);
            }
        }

        if(!this.isAttacking){
                this.xspeed=this.basespeed*(this.deltaX/this.distance);
                this.vspeed=this.basespeed*(this.deltaY/this.distance);
                // console.log(this.deltaX)
        }

    

        if(this.attacktimer>this.attacktime){
                this.isAttacking=false;
                this.hitboxcreated=false;
                this.attacktimer=0;
        }



        if(this.frameTimer>this.frameInterval&&!this.isAttacking){
            this.frameY=0;
            this.frameTimer=0;
            this.frameX+=1;
            if(this.frameX>=this.walkframes){
                this.frameX=0;
            }
            //check if start attack
        }else if(this.frameTimer>this.attackframeInterval&&this.isAttacking){
            this.frameY=2;
            this.frameTimer=0;
            this.frameX+=1;
            if(this.frameX>=this.attackframes){
                this.frameX=0;
            }
        }else{
            this.frameTimer+=deltaTime;
        }

        


        if(this.isAttacking || this.game.player.health<=0){
            this.xspeed=0;
            this.vspeed=0;
        }
        
        if(this.x>this.game.player.x+(this.game.player.width/2)){
            if(this.isAttacking){
                this.frameY=3;
            }else{
                this.frameY=1;
            }
        }

        if(this.x>this.game.player.x+(this.game.player.width/2)&&!this.isAttacking){
            this.lr=false;
        }else if(!this.isAttacking){
            this.lr=true;
        }

        this.x+=this.xspeed;
        this.y+=this.vspeed;

        if(this.hp<=0){this.dead=true}
        
    }

    attack(x, y, damage, knock, deltaTime,lr){
            if(!this.isAttacking){
                this.isAttacking=true;
                this.frameX=0;
            }
            if(this.frameX==4&&!this.hitboxcreated){
                this.game.hitboxes.push(new BoxBase(this.game, x, y, damage, knock, lr));
                this.hitboxcreated=true;
            }
            this.attacktimer+=deltaTime;
    }

    draw(context){
        if(this.lr){
            context.drawImage(this.image, this.width*this.frameX, this.height*this.frameY+1, this.width-1, this.height+1, 
            this.x, this.y, this.width, this.height);
        }else{
            context.drawImage(this.image, this.width*this.frameX+1, this.height*this.frameY+1, this.width-1, this.height+1, 
            this.x, this.y, this.width, this.height);
        }
    }
}

export class sprinter extends baseSeal{
    constructor(game, hp, x, y, speed){
        super(game, hp, x, y, speed);
        this.hp=(hp+3)*2
        this.basespeed=2.5+speed;
        this.id=1;
    }
    update(deltaTime, playerX, playerY){
        super.update(deltaTime, playerX, playerY);
    }
    draw(context){
        context.shadowColor="rgb(179, 255, 0)"
        context.shadowBlur=6;
        if(this.lr){
            context.drawImage(this.image, this.width*this.frameX, this.height*this.frameY+1, this.width-1, this.height+1, 
            this.x, this.y, this.width, this.height);
        }else{
            context.drawImage(this.image, this.width*this.frameX+1, this.height*this.frameY+1, this.width-1, this.height+1, 
            this.x, this.y, this.width, this.height);
        }
        context.shadowBlur=0;
    }
}

export class damager extends baseSeal{
    constructor(game, hp, x, y, speed){
        super(game, hp, x, y, speed);
        this.hp=(hp+3)+5
        this.basespeed=1+speed*0.5;
        this.damage=7;
        this.id=2;
        this.knockback=20;
    }
    update(deltaTime, playerX, playerY){
        super.update(deltaTime, playerX, playerY);
    }
    draw(context){
        context.shadowColor="rgb(223, 65, 44)"
        context.shadowBlur=6;
        if(this.lr){
            context.drawImage(this.image, this.width*this.frameX, this.height*this.frameY+1, this.width-1, this.height+1, 
            this.x, this.y, this.width, this.height);
        }else{
            context.drawImage(this.image, this.width*this.frameX+1, this.height*this.frameY+1, this.width-1, this.height+1, 
            this.x, this.y, this.width, this.height);
        }
        context.shadowBlur=0;
    }
}

export class behemoth extends baseSeal{
    constructor(game, hp, x, y, speed){
        super(game, hp, x, y, speed);
        this.hp=(hp+3)*14
        this.basespeed=1+speed*0.3;
        this.damage=5;
        this.id=3;
        this.width=160;
        this.height=120;
        this.knockback=30;
    }
    update(deltaTime, playerX, playerY){
        super.update(deltaTime, playerX, playerY);
    }
    draw(context){
        context.shadowColor="rgb(36, 40, 255)"
        context.shadowBlur=6;
        if(this.lr){
            context.drawImage(this.image, 120*this.frameX, 90*this.frameY+1, 120-1, 90+1, 
            this.x, this.y, this.width, this.height);
        }else{
            context.drawImage(this.image, 120*this.frameX+1, 90*this.frameY+1, 120-1, 90+1, 
            this.x, this.y, this.width, this.height);
        }
        context.shadowBlur=0;
    }
}