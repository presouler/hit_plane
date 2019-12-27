let bg =document.querySelector('.bg');
let avater = document.querySelector('.avater');
let bgW = bg.offsetWidth;
let bgH = bg.offsetHeight;
//
//
let enemy1 = "img/small.png";
let enemy2 = "img/middle.png";
let enemy3  = "img/big.png";
let enemys = [];
let bullets = [];
let Blues = [];
let bullet1 = "img/yellow_bullet.png";
let bullet2 = "img/blue_bullet.png";
let planeX = parseInt(getComputedStyle(avater).left);
let planeY = parseInt(getComputedStyle(avater).top);
let planeH = parseInt(getComputedStyle(avater).height);
let planeW = parseInt(getComputedStyle(avater).width);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Keymove///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("keydown",e => keyMove(e));
//创建主角///////////////////////////////////////////////
avater1 = new Airplane(planeX,planeY,20,avater);
//Mousemove///////////////////////////////////////////////
let temp = avater1.Mousemove.bind(avater1);// this无效必须绑定 bind()
let temp2 = avater1.mobileMove.bind(avater1);
let b1 ={};
avater.addEventListener("mousedown",event=>{
    avater1.shiftX = event.clientX - avater.offsetLeft;
    avater1.shiftY = event.clientY - avater.offsetTop;
    document.addEventListener("mousemove",temp)
    document.addEventListener("mouseup",handelStop);
});
function handelStop(){
    document.removeEventListener("mousemove",temp);
    document.removeEventListener("mouseup",handelStop);
    
}
//Mobilemove///////////////////////////////////////////////
avater.addEventListener('touchstart',event=>{
    const touch = event.touches[0];
    avater1.shiftX = touch.clientX - avater.offsetLeft;
    avater1.shiftY = touch.clientY - avater.offsetTop;


    avater.addEventListener('touchmove',temp2)
})
//Create enemys/////////////////////////////////////////////
////////////////////////////////////////////////////////////
function createEnemys(type,index){
    if (type==="small"){
        for(let i =0;i<index;i++){
            let left = getRandomleft();
            let speed =getRandomSpeed();
            let start =getRandomStart();
            let x = new Enemy (left,start,speed,enemy1);
            // x.Ereport();
            enemys.push(x);
        }
    }else if (type==="middle"){
        for(let i =0;i<index;i++){
            let left = getRandomleft();
            let speed =getRandomSpeed();
            let start =getRandomStart();
            let x = new Enemy (left,start,speed,enemy2);
            // x.Ereport();
            enemys.push(x);
        }
    }else{
        for(let i =0;i<index;i++){
            let left = getRandomleft();
            let speed =getRandomSpeed();
            let start =getRandomStart();
            let x = new Enemy (left,start,speed,enemy3);
            // x.Ereport();
            enemys.push(x);
        }
    
    }
    
}
function Enemy(Ex,Ey,Espeed,Eimg){
    this.Ex = Ex ;
    this.Ey = Ey;
    this.Espeed = Espeed;
    this.Eimg =Eimg;

    let img = document.createElement('img');
    img.src = this.Eimg;
    img.style.position="absolute";
    img.style.left=this.Ex +"px";
    img.style.top =this.Ey + "px";
    bg.append(img);
    this.Ewidth;
    this.el = img;

    // this.el.getBoundingClientRect().width;
    // let Ewidth=img.getBoundingClientRect();
    // this.Ereport = function(){
    //     this.Ewidth=this.el.getBoundingClientRect().width;
    // }
    this.Efly = function(){
        if(this.Ey>bgH){
            this.Ex = getRandomleft();
            img.style.left =this.Ex +"px";
            img.style.display = "block";
            this.el =img;
            this.Ey=0;
            this.Espeed =getRandomSpeed();

        }else{
        this.Ey=this.Ey+Espeed;
        img.style.top = this.Ey+"px";}
    }
    this.dele=function(){
        img.style.display="none";
        this.el = 0;
        
    }
    // setTimeout(this.dele.bind(this),3000);
    setInterval(this.Efly.bind(this),50);
}
function Airplane(x,y,speed,src){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.src = src;
    let count =0;
    let count2 =0;
    let timer;
    let timer2;

    this.shiftX;
    this.shiftY;
    this.getCoordinates= function(){
        return{ x:this.x,y:this.y}
    }
    this.getSpeed = function(){
        return{speed:this.speed};
    }
    this.getBulletCoor = function(){
        return {bx:this.x+(planeW/2)-1, by:this.y-8}
    }
    this.getBlueBullet =function(){
        return {Blx:this.x+(planeW/4)-5, Brx:this.x+(planeW*(3/4))+2,By:this.y-1}
    }
    this.Move=function(moveX,moveY){
        this.x += moveX;
        this.y += moveY; 
        avater.style.left = this.x +"px";
        avater.style.top = this.y +"px";
       
    }

    this.Mousemove=function(e){
        avater.style.left = event.clientX -this.shiftX  + 'px';
        avater.style.top = event.clientY -this.shiftY + 'px';
      
        this.x = event.clientX -this.shiftX ;
        this.y = event.clientY -this.shiftY ;

    }
    this.mobileMove=function(){
            console.log(this.shiftY);
            const touch =event.touches[0];

            avater.style.left = touch.pageX - this.shiftX +"px";
            avater.style.top  = touch.pageY - this.shiftY + "px";

            this.x = touch.pageX - this.shiftX ;
            this.y = touch.pageY - this.shiftY ;

    }
    this.createBlueB=function(index2){
        if(count2<index2){
             Blues[count]=new Bullet2(bullet2,30,this.getBlueBullet().Blx,this.getBlueBullet().Brx,this.getBlueBullet().By);
        
            count2++;
            timer2=setTimeout(this.createBlueB.bind(this), 100, index2);
        }else{
            clearTimeout(timer2);
        }
    }
    this.createBullets=function(index){
    
            if (count<index){
                bullets[count]=new Bullet(bullet1,30,this.getBulletCoor().bx,this.getBulletCoor().by);
                // console.log(this.getBulletCoor().bx);
                count++;
                timer=setTimeout(this.createBullets.bind(this), 100, index);
            }else{
                clearTimeout(timer);
            }
        
    }
   
}
function Bullet2(bType,bSpeed,blx,brx,by){
    this.bSpeed = bSpeed;
    this.bType = bType;
    this.blx = blx;
    this.brx = brx;
    this.by = by;

    let imgl  = document.createElement('img');
    imgl.src = bType;
    imgl.style.position="absolute";
    imgl.style.left=this.blx+"px";
    imgl.style.top =this.by+"px";
    bg.append(imgl);
    

    let imgr =document.createElement('img');
    imgr.src = bType;
    imgr.style.position="absolute";
    imgr.style.left=this.brx+"px";
    imgr.style.top =this.by+"px";
    bg.append(imgr);


    
    this.fly = function(){
        for (let item of Blues){}
        this.by -=this.bSpeed;
        if(this.by>0){
        imgr.style.top = this.by+"px";
        imgl.style.top = this.by+"px";}
        else{this.by = avater1.getBlueBullet().By;
            this.blx = avater1.getBlueBullet().Blx;
            this.brx = avater1.getBlueBullet().Brx;
            imgl.style.top =avater1.getBlueBullet().By +"px";
            imgr.style.top = avater1.getBlueBullet().By +"px";
            imgl.style.left =avater1.getBlueBullet().Blx +"px";
            imgr.style.left = avater1.getBlueBullet().Brx + "px";
            imgl.style.display = "block";
            imgr.style.display = "block";
        }
        
    }
    setInterval(this.fly.bind(this),30);
}
function Bullet(bType,bSpeed,bx,by){
    this.bSpeed = bSpeed;
    this.bType = bType;
    this.bx = bx;
    this.by = by;
    
    let img  = document.createElement('img');
    img.src = bType;
    img.style.position="absolute";
    img.style.left=this.bx+"px";
    img.style.top =this.by+"px";
    bg.append(img);
    this.bl = img;

    this.fly = function(){
        for (let item of bullets){}
        this.by -=this.bSpeed;
        if(this.by>0){
        img.style.top = this.by+"px";}
        else{this.by = avater1.getBulletCoor().by;
            this.bx = avater1.getBulletCoor().bx;
            img.style.top =avater1.getBulletCoor().by +"px";
            img.style.left =avater1.getBulletCoor().bx +"px";
            img.style.display = "block";
        }
        
    }
    this.dele=function(){
        img.style.display="none";
        this.b1=0;
        
    }
    setInterval(this.fly.bind(this),30);
}

function keyMove(e){
    e.preventDefault();
    let code = e.code;
 
    switch(code){
        
        case "KeyW" :
            avater1.Move(0,-avater1.getSpeed().speed);
            break;
        case "ArrowUp":
            avater1.Move(0,-avater1.getSpeed().speed);
            break;
        case "KeyD" :
            avater1.Move(avater1.getSpeed().speed,0);
            break;
        case "ArrowRight":
            avater1.Move(avater1.getSpeed().speed,0);
            break;
        case "KeyA":
            avater1.Move(-avater1.getSpeed().speed,0);
            break;
        case "ArrowLeft":
            avater1.Move(-avater1.getSpeed().speed,0);
            break;
        case "KeyS":
            avater1.Move(0,avater1.getSpeed().speed);
            break;
        case "ArrowDown":
            avater1.Move(0,avater1.getSpeed().speed);
            break;
   }

}

avater.ondragstart= ()=> false;//浏览器有自己拖放图像功能和其他一些自动运行可能与我们的产生冲突的元素。

function getRandomleft(){

    let x = Math.floor(Math.random()*bgW);
    x = (x-50)> 0 ? x-50:0; 
    return x;
}
function getRandomSpeed(){
    return Math.floor(Math.random()*10+13);
}
function getRandomStart(){
    return -Math.floor(Math.random()*1000+50);
}
createEnemys("small",10);
createEnemys("middle",2);
createEnemys("big",1);
function dataHandle(){
    if(Blues.length===0){
    for(let item of enemys){
        for (let bullet of bullets){
            let cond1 = item.el.width;
            let cond2 = item.el.height;
            let cond3 = bullet.bx >item.Ex;
            let cond4 = bullet.bx <item.Ex+item.el.width;
            let cond5 = bullet.by < item.Ey +item.el.height;
            let cond6 = bullet.by > item.Ey;
            if (cond1&&cond2&&cond3&&cond4&&cond5&&cond6){
                item.dele();
                bullet.dele();
            }
        }
       
    }
    }else{
        for(let item of enemys){
            for (let bullet of bullets){
                // let cond1 = item.el.width;
                // let cond2 = item.el.height;
                
                
                // let cond3 = bullet.bx-20 >item.Ex;

                // let cond4 = bullet.bx+20 <item.Ex+item.el.width;

                // let cond5 = bullet.by < item.Ey +item.el.height;
                // let cond6 = bullet.by > item.Ey;
                // let cond7 =bullet.bx-20 <item.Ex
                // let cond8 =bullet.bx+20>item.Ex;
                // let cond9=bullet.bx -20 <item.Ex+item.el.width;
                // let cond10=bullet.bx +20 >item.Ex+item.el.width;
                // let cond11 = (cond7&&cond8)||(cond9&&cond10); 
                // if (cond1&&cond2&&cond3&&cond4&&cond5&&cond6){
                //     item.dele();
                //     bullet.dele();
                // }
            }
           
        }

    }
}
avater1.createBullets(20);
avater1.createBlueB(10);
console.log(Blues[2]);
dataHandle();
setInterval(dataHandle,30);