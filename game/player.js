

export class Player {
    constructor(game){
        this.game=game;
        this.width=90;
        this.height=170;
        this.x=this.game.width/6-this.width;
        this.y=this.game.height/2-this.height;
        this.image =document.getElementById('player');
        this.frameX= 0;
        this.frameY=0;
        this.walkFrames= 20; //indicates the amount of frames are in the "walking" animation
        this.frameFallWidth=199;// falling frames have different lenght
        this.speed=0;
        this.vspeed=0;
        this.maxSpeed=5;
        this.gravity=1;
        this.jump=15;
        this.smalljump=10;
        this.hasjumped=false;
        this.terminalVelocity=20;
        this.gameRestart=false;
        this.onGround=false;
        this.onRail=false;

        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
    } 
    update(key_r, key_e, key_space, check, deltaTime                     //add key r to restart game
    ){
        // movement

        if((this.vspeed<this.terminalVelocity) && ((!this.onGround && !this.onRail))){
            this.vspeed+=this.gravity;
            // console.log("g")
        }

        if( this.vspeed>(this.game.height-(this.y+this.height)) && !check){
            this.vspeed=(this.game.height-(this.y+this.height));    //avoids the player from clipping in ground
        }


        if (this.y>=this.game.height-this.height){
            this.onGround=true;
            this.y=this.game.height-this.height;
            this.hasjumped=false;
        }else{this.onGround=false;}

       



        // console.log(this.y);
        if(this.onGround||this.onRail){
            this.vspeed=0;
            // console.log("groundrail");
        }

        if (key_space==1 && !this.gameRestart && !this.hasjumped){
            this.vspeed=-this.jump;
            this.hasjumped=true;
        }

        if (key_e==1 && !this.gameRestart && !this.hasjumped){
            this.vspeed=-this.smalljump;
            this.hasjumped=true;
        }

        this.y+= this.vspeed;
        this.x+=this.speed;
        if(this.speed>0 && this.onGround){
            this.speed-=0.5;
        }
        //Boundaries
        // if (this.x<0) this.x=0;
        // if (this.x>this.game.width-this.width) this.x=this.game.width-this.width;
        // if (this.y<0) this.y=0;
        

        if(this.onGround){
            this.frameY=0;
            if(this.frameTimer>this.frameInterval){


                if (this.frameX<this.walkFrames-1 && !this.gameRestart ){
                    this.frameX+=1;                 
                    this.frameTimer=0;
                }else{this.frameX=0;}
            }else{
                this.frameTimer+=deltaTime;
            }
        }else if(this.onRail){
            this.frameY=1;          //placeholder he currently uses the same frame he would use if he falls
            this.frameX=1;
        }else if (!this.onGround && !this.onRail){
            this.frameY=1;
            if(this.vspeed<0){
                this.frameX=0;          //changes frame of jump animation based on if hes falling or not
            }else{
                this.frameX=1;
            }
        }


        if (this.gameRestart){      //handles falling frames
            if (this.onGround){
                this.frameY=2;
                if (this.speed<=0){
                    this.frameX=2       
                }else{
                    this.frameX=1;
                }
            }else{
                this.frameY=2;
                this.frameX=0;
            }
        }

    }
    draw(context){
        context.fillStyle= "blue";
        context.shadowColor = "black";
        context.shadowBlur = 0;
        // context.fillRect(this.x, this.y, this.width, this.height);
        if(!this.gameRestart){   
            context.drawImage(this.image, this.width*this.frameX , this.height*this.frameY, this.width, this.height, 
            this.x, this.y, this.width, this.height);
        }else{
            context.drawImage(this.image, this.frameFallWidth*this.frameX , this.height*this.frameY, this.frameFallWidth, this.height, 
            this.x, this.y, this.frameFallWidth, this.height);
        }

    }

    defeat(){
        
        this.gameRestart=true;
    }
};