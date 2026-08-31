export class cursorevents{
    constructor(){
        const canvas= document.getElementById('canvas1')
        
        this.cursorX=0;
        this.cursorY=0;

        this.mousedown=false;
        
        window.addEventListener('mousemove', e=>{
            const rect = canvas.getBoundingClientRect()
            var scaleX= canvas.width / rect.width;
            var scaleY= canvas.height / rect.height;
            this.cursorX=(e.clientX - rect.left)*scaleX;
            this.cursorY=(e.clientY - rect.top)*scaleY;
            // console.log(this.cursorX, this.cursorY);
        })
        
        window.addEventListener('mousedown', t=>{
            this.mousedown=true;
            console.log(this.mousedown);
        })

        window.addEventListener('mouseup', f=>{
            this.mousedown=false;
            console.log(this.mousedown);
        })
    }
}