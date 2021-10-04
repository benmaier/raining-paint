let dt = 0.1;
let raindrops = [];
let ndrops = 100;
let maxdrops = 500;
let colmin = 30;
let colmax = 230;
let dcol = colmax-colmin;
let g = 100;
let b = 100;
let ddcol = 10;

function rm(arr,idx){
  arr[idx] = arr[arr.length-1];
  arr.pop();
}

function setup() {
  createCanvas(600, 600);
  background(255);
  for(let i=0; i<ndrops; ++i){
    let drop = new raindrop();
    drop.y = random() * height;
    raindrops.push(drop);
  }
}

class raindrop {
  
  constructor() {
    let self = this;
    self.x = random() * width;
    self.y = 0;
    self.vy = 0;
    self.vx = 0;
    self.mg = 10;
    self.vynoise = 1;
    self.vxnoise = 0.01;
    self.xnoise = 10;
    self.g = g;
    self.b = b;
    self.color = [dcol*Math.round(random()) + colmin,g,b,random()*255];
    self.width = random()*4;
  }
  
  step() {
    let self = this;
    self.vy += self.mg * dt;
    self.vx += self.xnoise * sqrt(dt) * (2*random()-1);
    self.y += self.vy * dt + self.vynoise * sqrt(dt) * (2*random()-1);
    self.x += self.xnoise * sqrt(dt) * (2*random()-1);//self.vx * dt;// ;
      
    if (self.x < 0)
      self.x = - self.x;
    if (self.x > width)
      self.x = 2*width - self.x;
    
  }
  
  isout() {
    let self = this;
    return self.y > height;
  }
  
  reset() {
    let self = this;  
    self.vy = 0;
    self.y = 0;
  }
  
  draw() {
    let self = this;
    fill(self.color);
    stroke([0,0,0,1]);
    rect(self.x, self.y, self.width, self.y/10);
  }
}

function draw() {
  //background(255);
  g += ddcol * (2*Math.random()-1);
  b += ddcol * (2*Math.random()-1);
  
  if (g<colmin)
    g = 2*colmin - g;
  if (g>colmax)
    g = 2*colmax - g;
  if (b<colmin)
    b = 2*colmin - b;
  if (b>colmax)
    b = 2*colmax - b;
  for(let i=0; i<raindrops.length; ++i){
    raindrops[i].step();
    raindrops[i].draw();
    if (raindrops[i].isout()){
      rm(raindrops, i);
      raindrops.push(new raindrop());
      //raindrops[i].reset();
    }
  }
  if ((random()<0.3) && (raindrops.length<maxdrops) ) {
    raindrops.push(new raindrop());
  }
}
