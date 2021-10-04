let dt = 0.1;
let raindrops = [];
let ndrops = 100;
let maxdrops = 800;
let colmin = 50;
let colmax = 250;
let dcol = colmax-colmin;
let g = 100;
let b = 100;
g = 0;
b = 0;
let ddcol = 10;
let frame = 0;

function rm(arr,idx){
  arr[idx] = arr[arr.length-1];
  arr.pop();
}

function setup() {
  createCanvas(600, 600);
  background(30);
  for(let i=0; i<ndrops; ++i){
    let drop = new raindrop();
    drop.y = random() * height;
    raindrops.push(drop);
  }
}

function single_force (x,y,X,Y,s=100) {
  let dx = X - x;
  let dy = Y - y;
  let r = sqrt(dx*dx+dy*dy);
  return {
    x: -s*dx/r/r,
    y: -s*dy/r/r 
  }
}

function add_force(f1,f2) {
  return {
    x: f1.x + f2.x,
    y: f1.y + f2.y
  }
}

function total_force(x,y) {
  let f = {x:0,y:0};
  f = add_force(f, single_force(x, 
                                y,
                                width/2,
                                height/4+height/6*sin(2*PI*frame/1000)));
  f = add_force(f, single_force(x, y, -10, height/2+height/4*cos(2*PI*frame/1000),s=400));
  f = add_force(f, single_force(x, y, width+10, height/2+height/4*cos(2*PI*frame/1000),s=400));
  return f
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
    self.color = [dcol*Math.round(random()) + colmin,g,b,random()*255];//255];//random()*255];
    self.width = random()*10;
  }
  
  step() {
    let self = this;
    let F = total_force(self.x, self.y);
    self.vy += self.mg * dt + F.y*dt;
    self.vx += F.x *dt;
    self.oldx = self.x;
    self.oldy = self.y;
    self.y += self.vy * dt + self.vynoise * sqrt(dt) * (2*random()-1);
    self.x += self.vx + self.xnoise * sqrt(dt) * (2*random()-1);//self.vx * dt;// ;
      
    if (self.x < 0)
    {
      self.x = - self.x;
      self.vx = -self.vx;
    }
    if (self.x > width)
    {
      self.x = 2*width - self.x;
      self.vx = -self.vx;
    }
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
    //fill(self.color);
    //stroke([0,0,0,1]);
    //rect(self.x, self.y, self.width*(self.y+100)/height*10, self.y/10);
    //ellipse(self.x, self.y, self.width, self.y/10);
    stroke(self.color);
    strokeWeight(self.width);
    line(self.oldx, self.oldy, self.x, self.y);

  }
}

function draw() {
  //background(255);
  //g += ddcol * (2*Math.random()-1);
  //b += ddcol * (2*Math.random()-1);
    
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
  ++frame;
  frame = frame % 10000;
}
