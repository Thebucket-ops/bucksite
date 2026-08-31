export class inputMaster{
    constructor(){
        
        this.key_up=0;
        this.key_down=0;
        this.key_left=0;
        this.key_right=0;
        this.key_e=0;
        this.key_space=0;
        this.key_r=0;
        
        window.addEventListener('keydown', e=> {
            if(e.key==='ArrowUp'||e.key==='w'||e.key==='W'){this.key_up=1};
            if(e.key==='ArrowDown'||e.key==='s'||e.key==='S'){this.key_down=1};
            if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A'){this.key_left=1};
            if(e.key==='ArrowRight'||e.key==='d'||e.key==='D'){this.key_right=1};
            if(e.key==='e'||e.key==='E'){this.key_e=1};
            if(e.key===' '){this.key_space=1};
            if(e.key==='r'||e.key==='R'){this.key_r=1};

        });
        window.addEventListener('keyup', e => {
            if(e.key==='ArrowUp'||e.key==='w'||e.key==='W'){this.key_up=0};
            if(e.key==='ArrowDown'||e.key==='s'||e.key==='S'){this.key_down=0};
            if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A'){this.key_left=0};
            if(e.key==='ArrowRight'||e.key==='d'||e.key==='D'){this.key_right=0};   //note:issues arise when using multiple control modes at the same time
            if(e.key==='e'||e.key==='E'){this.key_e=0};
            if(e.key===' '){this.key_space=0};
            if(e.key==='r'||e.key==='R'){this.key_r=0};

        });

    }
}