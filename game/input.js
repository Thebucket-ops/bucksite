export class inputMaster{
    constructor(){
    
        this.key_e=0;
        this.key_space=0;
        this.key_r=0;
        
        window.addEventListener('keydown', e=> {

            
            if(e.key==='e'||e.key==='E'){this.key_e=1};
            if(e.key===' '){this.key_space=1};
            if(e.key==='r'||e.key==='R'){this.key_r=1};

        });
        window.addEventListener('keyup', e => {

            if(e.key==='e'||e.key==='E'){this.key_e=0};
            if(e.key===' '){this.key_space=0};
            if(e.key==='r'||e.key==='R'){this.key_r=0};
        });

    }
}