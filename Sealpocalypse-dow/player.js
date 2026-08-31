export class Player {
    constructor(game){
        this.game=game;
        this.width=30*2;
        this.height=60*2;
        this.spriteWidth=90;
        this.spriteHeight=180;
        this.x=this.game.width/2-this.width;
        this.y=this.game.height/2-this.height;
        this.image =document.getElementById('player');

        this.speed=0;
        this.vspeed=0;
        this.maxSpeed=5;
        this.friction=1;

        this.health=150;
        this.immune=false;
        this.lr=true;
        this.fps=12;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.walkFrames=6;
        this.frameX=0;
        this.frameY=0;

        this.enraged=false;
        this.kills=0;
        this.damage=5;
        this.immunetime=1000;
        this.immunetimer=0;

        this.attack=false;
        this.attackTimer=0;
        this.attackCooldown=900;
    }
    update(key_up, key_down, key_left, key_right,
        key_e, key_space, deltaTime, mousedown, cursorX
    ){
        // movement
        this.x+= this.speed;
        this.y+= this.vspeed;

        if(this.immunetimer<this.immunetime){
            this.immunetimer+=deltaTime;
            this.immune=true;
            console.log(this.immune);
        }else{
            console.log(this.immune);
            this.immune=false;
        }

        if((key_right||key_left)&&this.health>0){
            this.speed=(this.maxSpeed*key_right)-(this.maxSpeed*key_left); //add friction
        }else{
            this.speed= this.speed - (Math.sign(this.speed)*this.friction)
        }
        
        if((key_down||key_up)&&this.health>0){
            this.vspeed=(this.maxSpeed*key_down)-(this.maxSpeed*key_up);
        }else{
            this.vspeed= this.vspeed - (Math.sign(this.vspeed)*this.friction)
        }
        
        
        //Boundaries
        if (this.x<0) this.x=0;
        if (this.x>this.game.width-this.width) this.x=this.game.width-this.width;
        if (this.y<0) this.y=0;
        if (this.y>this.game.height-this.height)this.y=this.game.height-this.height;

        //attacking
        
        if (mousedown && this.attackTimer>=this.attackCooldown && this.health>0){// add attack cooldown
            this.attack=true;
            this.attackTimer=0;
        }else{
            this.attack=false;
        }
        if(this.attackTimer<=this.attackCooldown){
            this.attackTimer+=deltaTime;
        }

        if(this.frameTimer>this.frameInterval){
            this.frameTimer=0;
            if (this.speed!=0 || this.vspeed!=0){
                if(cursorX>=this.x+this.width/2){
                    this.lr=true;
                    this.frameY=1;
                    if(this.speed>=0){
                        this.frameX++;
                        if (this.frameX>=this.walkFrames){
                            this.frameX=0;
                        } 
                    }else{
                        this.frameX--;
                        if (this.frameX==-1){
                            this.frameX=this.walkFrames-1;
                        }
                    }
                }else{
                    this.lr=false;
                    this.frameY=2;
                    if(this.speed>=0){
                        this.frameX--;
                        if (this.frameX==-1){
                            this.frameX=this.walkFrames-1;
                        }
                    }else{
                        this.frameX++;
                        if (this.frameX>=this.walkFrames){
                            this.frameX=0;
                        } 
                    }
                }
            }else{
                this.frameY=0;
                this.frameX++;
                if(this.frameX>1){
                    this.frameX=0;
                }
            }
        }else{this.frameTimer+=deltaTime;}

    }
    draw(context){
        
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.spriteWidth*this.frameX, this.spriteHeight*this.frameY,
             this.spriteWidth, this.spriteHeight, 
            this.x-15, this.y-30, this.spriteWidth, this.spriteHeight);

 
        
    }

    PlayerHurt(dmg, knockback, lr){
        this.health-=dmg;
        //handle knockback
        if(lr){
            this.speed=knockback;
        }else{
            this.speed=-knockback;
        }
        this.immunetimer=0;

    }
};