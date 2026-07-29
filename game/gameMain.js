console.log("sup mah fellas");
//imports
import { Player } from "./player.js";
import { inputMaster } from "./input.js";
import { rail1, rail2, rail3, rail4, Rails } from "./rails.js";
import { points } from "./points.js";
//
window.addEventListener('load',function(){
    const canvas= document.getElementById('ominousbucket')
    const ctx = canvas.getContext('2d');
    
    canvas.width= 1366;     //TODO to change
    canvas.height=300;


    class Game{
        constructor(width,height){
            this.width=width;
            this.height=height;

            this.play=false;
            this.playButtonWidth=200;
            this.playButtonHeight=200;
            this.playButtonX=this.width/2 -(this.playButtonWidth/2);
            this.playButtonY=this.height/2 -(this.playButtonHeight/2);
            this.playButtonImage = document.getElementById("playbutt")

            this.player=new Player(this);
                        
            this.input= new inputMaster();
            //add fuunctions that call player, input, and enemies
            this.points= new points(this);

            this.obstacles= [];
            this.obstacleTimer=0;
            this.obstacleInterval=3000;
            this.obstacleDelay=7;

            this.obstacleSpeedTimer=0;
            this.obstacleSpeedInterval=5000;
            this.obstacleCap=5;
            this.obstacleSpeed=9;
            this.check=false;
            this.record=0;
            this.pointsspecial=false;
             
        }
        update(deltaTime){
            if(this.play){

            
            if(this.obstacleTimer>this.obstacleInterval && this.obstacleCap>this.obstacles.length){ 
                this.addRail();
                this.obstacleTimer=0;
                this.obstacleInterval=(Math.floor(Math.random()*this.obstacleDelay)*500)+500;
            }else{
                this.obstacleTimer+=deltaTime; 
            }

            if(this.obstacleSpeedTimer>this.obstacleSpeedInterval){ 
                this.obstacleSpeed+=1;
                this.obstacleSpeedTimer=0;
                if (this.obstacleDelay>=1){
                this.obstacleDelay-=0.1;
                }
            }else{
                this.obstacleSpeedTimer+=deltaTime; 
            }

            this.check=this.onRailcheck();
            this.yCheck= this.onRailYcheck();

            this.obstacles.forEach(rail => {
                rail.update(deltaTime, this.obstacleSpeed, this.check, this.yCheck);

                ////COLLISION WITH RAIL CHECK
                
                    if((((this.player.x+this.player.width)>rail.x) && (this.player.x<=(rail.x+rail.width)) &&
                     (((this.player.y+this.player.height<=rail.y))) && !this.player.gameRestart)){

                        if(((this.player.y+this.player.height)<rail.y) && (!this.player.onRail)){
                            if(this.player.vspeed>(this.height-(this.player.y+this.player.height+rail.height)-1)){
                                this.player.vspeed=(this.height-(this.player.y+this.player.height+rail.height)-1);    //avoids the player from clipping in ground
                            }
                        }

                        if((this.player.y+this.player.height)==rail.y){
                            this.player.onRail=true;
                            this.player.hasjumped=false;

                                if(rail.railspecial){
                                    this.pointsspecial=true;
                                }else{
                                    this.pointsspecial=false;
                                }

                            // console.log("onrail");              //note player falls down if rail has another rail
                                                                // right next to it thats lower
                        }else if (!this.yCheck){
                            this.player.onRail=false;
                            // console.log("notonrail");
                        }



                        
                    }else if (!this.check){
                        this.player.onRail=false;//
                    }
                    

                    if((((this.player.x+this.player.width)-rail.gracespace>rail.x) && (this.player.x<=(rail.x+rail.width)) &&
                        ((this.player.y+this.player.height>rail.y)) && !this.player.gameRestart)){
                        this.player.defeat();
                        this.player.speed= this.obstacleSpeed;
                    }

                ////////////////
                

                if (rail.x<-30-rail.width){
                    this.removeRail();              //REMOVE RAIL ONCE OUTSIDE
                }
            });

            this.player.update(this.input.key_up, this.input.key_down, 
            this.input.key_left, this.input.key_r, this.input.key_e,
            this.input.key_space, this.check, deltaTime);

            this.points.update(deltaTime, this.pointsspecial);



            ///Handle game restart
        if (this.player.gameRestart && this.input.key_r==1){
            //make the game restart
            this.player=new Player(this);
                            
            this.input= new inputMaster();      //make so that points can be saved
            if(this.points.points>this.record){this.record=this.points.points;}
            
            this.points= new points(this);

            this.obstacleTimer=0;
            this.obstacleInterval=3000;
            this.obstacleDelay=7;

            this.obstacleSpeedTimer=0;
            this.obstacleSpeedInterval=5000;
            this.obstacleCap=6;
            this.obstacleSpeed=9;
            this.obstacles= [];
        }
            ///

        }else{ //START MENU
                window.addEventListener("mouseover", event => {
                    var rect = canvas.getBoundingClientRect();
                    var x = event.clientX - rect.left;
                    var y = event.clientY - rect.top;

                    if ((x>=this.playButtonX&&x<=(this.playButtonX+this.playButtonWidth))
                    &&(y>=this.playButtonY&& y<=(this.playButtonY+this.playButtonHeight))
                    ){document.getElementById("ominousbucket").style.cursor = "pointer"; }else{     //change pointer style when play button hovered
                        document.getElementById("ominousbucket").style.cursor = "default"; 
                    }

                });
                window.addEventListener("click", c => {
                    var rect = canvas.getBoundingClientRect();
                    var x = event.clientX - rect.left;
                    var y = event.clientY - rect.top;                     //once clicked game starts

                    if ((x>=this.playButtonX&&x<=(this.playButtonX+this.playButtonWidth))
                    &&(y>=this.playButtonY&& y<=(this.playButtonY+this.playButtonHeight))
                    ){this.play=true;}

                });
             
        }
        }
        draw(context){
            if(this.play){
                this.player.draw(context);
                this.obstacles.forEach(rail => {rail.draw(context)});
                //draw player and enemies
                this.points.draw(context, this.pointsspecial, this.record);
            }else{
                context.fillStyle= "blue";
                // context.fillRect(this.playButtonX, this.playButtonY, this.playButtonWidth, this.playButtonHeight);
                context.drawImage(this.playButtonImage, this.playButtonX, this.playButtonY);
            }
        }
        // addRail(){
        addRail(){//Make it so based on how much time has passed, the enemies become stronger
            let random = Math.floor(Math.random()*4)+1;
            if (random==1){
                this.obstacles.push(new rail1(this));
            }
            if (random==2){
                this.obstacles.push(new rail2(this));
            }
            if (random==3){
                this.obstacles.push(new rail3(this));
            }
            if (random==4){
                this.obstacles.push(new rail4(this));
            }
            this.check=this.onRailcheck();
            console.log(this.obstacles);
            
        }

        removeRail(){
            this.obstacles.shift();
            // console.log(this.obstacles);    
        }

        onRailcheck(){
            for(let i=0; i < this.obstacles.length;i++){
            
                if(((this.player.x+this.player.width)>this.obstacles[i].x) && (this.player.x<=(this.obstacles[i].x+this.obstacles[i].width))){
                    
                    return true;
                    break;
                }  
            
            }
            return false;
            
        }
        onRailYcheck(){
            for(let i=0; i < this.obstacles.length;i++){
                

                if(((this.player.y+this.player.height)==this.obstacles[i].y)&&
                    (((this.player.x+this.player.width)>this.obstacles[i].x) && (this.player.x<=(this.obstacles[i].x+this.obstacles[i].width)) &&
                     (((this.player.y+this.player.height<=this.obstacles[i].y))) && !this.player.gameRestart)){
                    return true;
                    break;
                }
                return false;

            }
            // console.log("sss");
            return false;
            
        }
        // }
    }

    if (this.player.gameRestart && this.input.key_r==1){
        //make the game restart
        this.player=new Player(this);
                        
        this.input= new inputMaster();
            
        this.points= new points(this);
        this.obstacles= [];
    }
    const game = new Game(canvas.width, canvas.height);
    let lastTime=0;
    console.log(game);
    function animate(timeStamp){

        const deltaTime= timeStamp-lastTime;
        
        lastTime=timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);


})