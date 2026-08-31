
import { Player } from "./player.js";

export class BoxBase{
    constructor(game, x, y, damage, knockback,lr){
        this.game= game;
        this.x=x;
        this.y=y;
        this.width=150;       //  Values to define placement/size
        this.height=150;
        this.image=document.getElementById('Hurtbox');
        this.damage=damage;
        this.knockback=knockback

        this.fps=14;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.hashit=false;
        this.frames=0;
        
        this.delete=false;
        this.immunepl=true;
        this.hitonce=false;
        this.lr=lr;
    }
    update(deltaTime){
        if (!this.game.player.immune){
            this.immunepl=false
        }else{this.immunepl=true}
        
        if(this.frameTimer<100){

            if(((this.x+this.width)>=this.game.player.x&&(this.game.player.x+this.game.player.width>this.x))&&
            ((this.y+this.height)>=this.game.player.y&&(this.game.player.y+this.game.player.height>this.y))
            &&!this.immunepl
            )
            {
                this.hashit=true;
                
            }

        this.frameTimer+=deltaTime;
        }else{
            
            this.delete=true;
        }       

        // if (this.hashit&&!this.hitonce){
            
        //     dealDamage(this.immunepl,this.damage, this.knockback, true); //NOTE change true
        //     this.hitonce=true;
        // }
        

    }
    draw(context){
        if(this.lr){
            context.drawImage(this.image, 50, 0, 50, 50, 
             this.x, this.y, this.width, this.height);
        }else{
            context.drawImage(this.image, 0, 0, 50, 50, 
             this.x, this.y, this.width, this.height);
        }
    }
    
     dealDamage(immune, dmg, knockback, lr){
     if (!immune){
         this.game.player.PlayerHurt(dmg, knockback, lr);
     }else{
         this.game.player.PlayerHurt(0, knockback, lr);
     }
     }//this dont work
}

