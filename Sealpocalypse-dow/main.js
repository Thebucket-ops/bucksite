console.log("sup mah fellas");

import { Player } from './player.js'
import { inputMaster } from './input.js'
import {  baseSeal } from './enemy1.js'
import { BoxBase } from './hurtbox.js'
import { cursorevents } from './cursorcords.js';
import { gameText, menuText } from './textmanager.js';
import { EXPLODE, medkit, moreDamage } from './powerups.js';

window.addEventListener('load',function(){

    const canvas= document.getElementById('canvas1')
    const ctx = canvas.getContext('2d');
    canvas.width=1920;
    canvas.height=1080;


    class Game {
        constructor(width,height){
            this.width=width;
            this.height=height;
            this.player=new Player(this);
            
            this.input= new inputMaster();
            this.powerups=[];
            this.cursorinputs= new cursorevents();
            

            this.drawlaser=false;

            this.enemies= [];
            this.enemyTimer=0;
            this.enemyInterval=2000;

            this.enemyCapInterval=5000;
            this.enemyCapTimer=0;
            this.enemyCap=10;
            this.bonusHp=0;// make so that moving on the game the enemies get more hpoints by moving this in the constructor 
            this.bonusSpeed=0;

            this.hitboxes=[];
            this.crosshair=document.getElementById('crosshair');
            this.crosshairAngle=0;

            this.guiImage=document.getElementById('GUI');

            this.alphastart=0;
            this.alphablack=1;
            this.gamestart=false;
            this.hudAlpha=0;
            this.startPressed=false;
            this.defeat=false;
            // this.restart=false;
            this.record=0;
            this.gameText= new gameText(this,this.record);
            this.menuText= new menuText(this);
            this.explosivePowerUp=0;
            this.explosive=false;

            this.deltaX=0;
            this.deltaY=0;

            this.randX=0;
            this.randY=0;
            
            this.points=0;
        }



        update(deltaTime){
            if(this.gamestart)
            {
            this.player.update(this.input.key_up, this.input.key_down, 
            this.input.key_left, this.input.key_right, this.input.key_e,
            this.input.key_space, deltaTime, this.cursorinputs.mousedown,this.cursorinputs.cursorX);
            if(this.hudAlpha<1){
                this.hudAlpha+=0.005
            }
            // this.drawline(this.cursorinputs.cursorX,this.cursorinputs.cursorY);
            this.getAimAngle()

            //Enemy handler
            if(this.enemyTimer>this.enemyInterval && Math.floor(this.enemyCap)>this.enemies.length){ 
                this.addEnemy();
                this.enemyTimer=0;
            }else{
                this.enemyTimer+=deltaTime; //MAKE SO THAT EVERY 5 SECONDS THE CAP INCREASES
            }

            this.enemies.sort((a,b)=>(a.y-b.y))//to render first the enemy at top so they dont look like they are one on top the other
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime, this.player.x, this.player.y);
            })

            this.powerups.forEach(powerUp=>{
                powerUp.update();
            })
            if(this.explosivePowerUp!=0){
                this.explosivePowerUp.update();
            }
            
            if(this.explosivePowerUp.remove){
                this.explosive=true;
                this.explosivePowerUp=0;
                this.player.attackCooldown+=100;// make the attack a bit slower once the powerup is aquired
            }
            this.checkObtainedPowerups();

            this.hitboxes.forEach(hit =>{
                hit.update(deltaTime)
                    if (hit.hashit && !hit.hitonce){
                        hit.dealDamage(hit.immunepl,hit.damage, hit.knockback, hit.lr);
                        hit.hitonce=true;
                    }

                if(hit.delete){ //hurtbox deletion code
                    var index= this.hitboxes.indexOf(hit);
                        this.hitboxes.splice(index, 1);
                }
            })

            if(this.player.attack){
                this.checkEnemyDamage();
                this.drawlaser=true;
            }else{
                this.drawlaser=false;
            }

            this.checkDeadEnemies();

            //INCREASE THE DIFFICULTY EVERY 5 SECONDS
            if(this.enemyCapTimer<this.enemyCapInterval){
                this.enemyCapTimer+=deltaTime;
            }else{
                this.enemyCapTimer=0;
                this.bonusHp+=0.15;
                this.enemyCap+=0.35;
                this.bonusSpeed+=0.1;
                if(this.player.attackCooldown>=250){
                    this.player.attackCooldown-=20;//the player shoots faster as the game progresses 
                }
            }

            if(this.explosive){
                this.crosshairAngle+=3;
                if(this.crosshairAngle==360){
                    this.crosshairAngle=0;
                }
            }else{
                this.crosshairAngle=0;
            }


            if(this.player.health<=0){
                this.defeat=true;
            }

            if(this.defeat==true&&this.input.key_r){
                if(this.record<this.points){
                    this.record=Math.floor(this.points);
                }
                this.gameRestart();
            }
            if(!this.defeat){this.points+=0.2;}
            
            this.gameText.update(this.player.health, this.points, this.defeat)
            }else{
                this.menuText.update(deltaTime,this.alphastart,this.startPressed);

                if(this.cursorinputs.mousedown&&((this.cursorinputs.cursorX<this.menuText.startx+this.menuText.startwidth)&&(
                    this.cursorinputs.cursorX>=this.menuText.startx))&&((this.cursorinputs.cursorY<this.menuText.starty+this.menuText.startheight)&&(
                        this.cursorinputs.cursorY>=this.menuText.starty
                    ))){
                        this.startPressed=true;
                    }

                if(this.startPressed){
                    document.getElementById('canvas1').style.cursor="none";
                    this.alphastart+=0.007;
                    if(this.menuText.readyGame){
                        this.alphablack-=0.0015;
                    }
                    if(this.alphablack<=0){
                        this.gamestart=true
                    }
                }else{
                    if(((this.cursorinputs.cursorX<this.menuText.startx+this.menuText.startwidth)&&(
                    this.cursorinputs.cursorX>=this.menuText.startx))&&((this.cursorinputs.cursorY<this.menuText.starty+this.menuText.startheight)&&(
                        this.cursorinputs.cursorY>=this.menuText.starty
                    ))){
                        document.getElementById('canvas1').style.cursor="pointer";
                    }else{
                        document.getElementById('canvas1').style.cursor="default";
                    }
                    
                }
                
            }



        }

        draw(context){//draw everything in game
            context.fillStyle="rgb(124, 153, 187)"
            context.fillRect(0,0,this.width,this.height);
            context.shadowBlur = 0;
            if(this.gamestart){
            this.powerups.forEach(powerUp=>{
                powerUp.draw(context);
            })
            this.player.draw(context);
            this.enemies.forEach(enemy=> {enemy.draw(context)});
            this.hitboxes.forEach(hit =>{
                hit.draw(context)
            });

            if(this.explosivePowerUp!=0){
                this.explosivePowerUp.draw(context);
            }

            //draw crosshair
            if(this.explosive){
                this.crosshair=document.getElementById('crosshairRed');
                
                // context.save();
                // context.translate(this.cursorX,this.cursorY);
                // context.rotate(this.crosshairAngle);
                context.shadowColor = "orange";
                context.shadowBlur = 7;
                context.drawImage(this.crosshair, 0, 0, 51, 51, 
                this.cursorinputs.cursorX-40, this.cursorinputs.cursorY-40, 81, 81);
                
                // context.restore();

            }else{
                this.crosshair=document.getElementById('crosshair');
                context.shadowColor = "yellow";
                context.shadowBlur = 7;
                context.drawImage(this.crosshair, 0, 0, 51, 51, 
                this.cursorinputs.cursorX-40, this.cursorinputs.cursorY-40, 81, 81);
            }

            //draw laser shot
            if (this.drawlaser){
                this.drawline(this.cursorinputs.cursorX,this.cursorinputs.cursorY);
            }
            this.drawGUI(context, this.hudAlpha);
            this.gameText.draw(context, this.hudAlpha);
            }else{
                this.player.draw(context);
                context.fillStyle="rgba(0,0,0,"+this.alphablack+")"
                context.fillRect(0,0,canvas.width,canvas.height)
                this.menuText.draw(context);
            }
        }

        addPowerUps(num, x, y){
            if(num==0){
                this.powerups.push(new medkit(this,x,y))
            }else if(num==1){
                this.powerups.push(new moreDamage(this,x,y))
            }else if(num==2){
                //big medkit or increase fire speed
            }else if(num==3){
                this.explosivePowerUp=new EXPLODE(this,x,y)
            }
        }
        checkObtainedPowerups(){
            this.powerups.forEach(powerUp=>{
                if(powerUp.remove){
                    var index = this.powerups.indexOf(powerUp);
                    this.powerups.splice(index,1);
                    this.points+=10;
                }
            })
        }

        addEnemy(){//Make it so based on how much time has passed, the enemies become stronger
            var ennumb= Math.floor(Math.random()*(Math.floor(this.enemyCap/10)+2))
            var i=0;
            for( i;(i<ennumb||this.enemies.length<this.enemyCap);i++){
                this.randomizeSpawnLocation();
                this.enemies.push(new baseSeal(this, this.bonusHp, this.randX, this.randY, this.bonusSpeed));      
            }
            console.log(this.enemies);
        }
        checkEnemyDamage(){
            this.enemies.forEach(enemy=>{
                if(this.explosive){
                    if((enemy.x+enemy.width>this.cursorinputs.cursorX-25)&&(enemy.x<this.cursorinputs.cursorX+25)&&
                    (enemy.y+enemy.height>this.cursorinputs.cursorY-25)&&(enemy.y<this.cursorinputs.cursorY+25)){
                        enemy.hp-=this.player.damage;
                        // console.log(enemy.hp);
                    }
                }else{
                    if(((enemy.x<this.cursorinputs.cursorX)&&(this.cursorinputs.cursorX<(enemy.x+enemy.width)))
                        &&((enemy.y<this.cursorinputs.cursorY)&&(this.cursorinputs.cursorY<(enemy.y+enemy.height))))
                    {
                        enemy.hp-=this.player.damage;
                        // console.log(enemy.hp);
                    }
                }

            })
        }

        checkDeadEnemies(){
            this.enemies.forEach(enemy=>{
                if(enemy.dead){//add timer to leave them dead for a bit before removing them?
                    var index = this.enemies.indexOf(enemy);
                   
                    if(this.points>1700){
                        var rand= Math.floor(Math.random()*18)
                        if(rand==1){
                        if(this.points>8000&&this.explosive==false&&this.explosivePowerUp==0){
                            this.addPowerUps(3,enemy.x+(enemy.width/2)-35,(enemy.y+enemy.height/2)-35)
                        }else{
                            var randUp= Math.floor(Math.random()*3)
                            this.addPowerUps(randUp, enemy.x+(enemy.width/2)-35,(enemy.y+enemy.height/2)-35);
                        }
                    }
                    }

                    this.enemies.splice(index,1);
                    this.points+=50;
                }
            })
        }

        gameRestart(){
            this.player=new Player(this);
            
            this.input= new inputMaster();
            this.powerups=[];
            
            this.defeat=false;
            this.restart=false;
            this.drawlaser=false;
            this.explosive=false;
            this.explosivePowerUp=0;
            this.enemies= [];
            this.enemyTimer=0;
            this.enemyInterval=2000;

            this.enemyCapInterval=5000;
            this.enemyCapTimer=0;
            this.enemyCap=10;
            this.bonusHp=0;// make so that moving on the game the enemies get more hpoints by moving this in the constructor 
            this.bonusSpeed=0;

            this.hitboxes=[];

            this.gameText= new gameText(this,this.record);
            // this.menuText= new menuText(this);

            this.deltaX=0;
            this.deltaY=0;

            this.randX=0;
            this.randY=0;
            
            this.points=0;
        }

        drawline(cursorX, cursorY){
            ctx.strokeStyle='rgb(238, 202, 0)';
            ctx.lineWidth=7;
            ctx.beginPath();
            if(this.player.speed==0&&this.player.vspeed==0){
                ctx.moveTo(this.player.x+(this.player.width/2)+40,this.player.y+(this.player.height/2));
            }else if(this.player.lr){
                ctx.moveTo(this.player.x+(this.player.width/2)+40,this.player.y+(this.player.height/2)-25);
            }else{
                ctx.moveTo(this.player.x+(this.player.width/2)-40,this.player.y+(this.player.height/2)-25);
            }

            ctx.lineTo(cursorX,cursorY);
            ctx.stroke();
        }

        drawGUI(context, alpha){
            const healthbarX=30;
            const healthbarY=288;
            const healthbarwidth=118;
            const healthbarheight=393;
            context.shadowColor = "white";
            context.shadowBlur = 0;
            if(this.player.health<=150){
                var healthbarRelative=(healthbarheight/150)*this.player.health;
            }else{
                var healthbarRelative=healthbarheight;
            }
            
            context.fillStyle="rgba(26, 202, 255, 0.33)"
                context.fillRect(healthbarX,healthbarY,healthbarwidth,healthbarheight);
            context.fillStyle="rgba(251, 255, 0,"+alpha+")"
            if(this.player.health>0){
                context.fillRect(healthbarX,healthbarY+healthbarheight,healthbarwidth,-healthbarRelative);
            }
            
            context.drawImage(this.guiImage,0,0,this.width,this.height);
            
        }

        getAimAngle(){

            this.deltaX=(this.player.x+(this.player.width/2))-this.cursorinputs.cursorX;
            this.deltaY=(this.player.y+(this.player.height/2))-this.cursorinputs.cursorY;
            this.angle= Math.tan(this.deltaY/this.deltaX);

            // console.log(this.deltaX+""+this.deltaY+""+this.angle);
        }

        randomizeSpawnLocation(){
            this.topbottom=Math.floor(Math.random()*3)-1 //outputs either -1,0,1
            this.leftright=Math.floor(Math.random()*3)-1

            if(this.topbottom==-1){
                this.randY=-100;
            }else if(this.topbottom==0){
                this.randY=Math.floor(Math.random()*this.height);
            }else{
                this.randY=this.height+100;
            }

            if(this.leftright==-1){
                this.randX=-150;
            }else if(this.randX==0&&this.randY!=0){
                this.randX=Math.floor(Math.random()*this.width);
            }else{
                this.randX=this.width+150;
            }
            
        }

        
    }

    const game = new Game(canvas.width, canvas.height);

    console.log(game);

    let lastTime=0;
    

    function animate(timeStamp){
        const deltaTime= timeStamp-lastTime;
        
        lastTime=timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});