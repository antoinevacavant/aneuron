
let w_1 = 0.5, w_2 = 0.2, w_3 = 0.3;

let x_1 = 2, x_2 = 4, x_3 = 1;

let sum = 0.;


let theta = 0.1;

let a = 0.;

let y = 0.;

let limit_x = 10;
let limit_theta = 5;
let step_x = 0.1;
let step_theta = 0.1;
let step_w = 0.05;

let myfont;

var btnx1_plus, btnx2_plus, btnx3_plus;
var btnx1_minus, btnx2_minus, btnx3_minus;

var btnw1_plus, btnw2_plus, btnw3_plus;
var btnw1_minus, btnw2_minus, btnw3_minus;

var btntheta_plus, btntheta_minus;

var btn_compute;

var btn_threshold;
var btn_sigmoid;
var btn_tanh;

var img_threshold;
var img_sigmoid;
var img_tanh;

function preload() {
  // Images for activations 
  img_threshold = loadImage("assets/threshold.png");
  img_sigmoid = loadImage("assets/sigmoid.png");
  img_tanh = loadImage("assets/tanh.png");
}

function setup() {
  createCanvas(1000, 1000);
  
  //background(255);
  
  textFont('Consolas');

  // Buttons for x_i 
  btnx1_plus= new SimpleButton(width/2-400, height/2-200, 40, 40);
  btnx1_plus.setText("+");
  btnx1_plus.setTextSize(30);
	
  btnx2_plus= new SimpleButton(width/2-400, height/2, 40, 40);
  btnx2_plus.setText("+");
  btnx2_plus.setTextSize(30);

  btnx3_plus= new SimpleButton(width/2-400, height/2+200, 40, 40);
  btnx3_plus.setText("+");
  btnx3_plus.setTextSize(30);

  btnx1_minus= new SimpleButton(width/2-440, height/2-200, 40, 40);
  btnx1_minus.setText("-");
  btnx1_minus.setTextSize(30);

  btnx2_minus= new SimpleButton(width/2-440, height/2, 40, 40);
  btnx2_minus.setText("-");
  btnx2_minus.setTextSize(30);

  btnx3_minus= new SimpleButton(width/2-440, height/2+200, 40, 40);
  btnx3_minus.setText("-");
  btnx3_minus.setTextSize(30);

  // Buttons for w_i 
  btnw1_plus= new SimpleButton(width/2-200, height/2-200, 40, 40);
  btnw1_plus.setText("+");
  btnw1_plus.setTextSize(30);

  btnw2_plus= new SimpleButton(width/2-200, height/2, 40, 40);
  btnw2_plus.setText("+");
  btnw2_plus.setTextSize(30);

  btnw3_plus= new SimpleButton(width/2-200, height/2+200, 40, 40);
  btnw3_plus.setText("+");
  btnw3_plus.setTextSize(30);

  btnw1_minus= new SimpleButton(width/2-240, height/2-200, 40, 40);
  btnw1_minus.setText("-");
  btnw1_minus.setTextSize(30);

  btnw2_minus= new SimpleButton(width/2-240, height/2, 40, 40);
  btnw2_minus.setText("-");
  btnw2_minus.setTextSize(30);

  btnw3_minus= new SimpleButton(width/2-240, height/2+200, 40, 40);
  btnw3_minus.setText("-");
  btnw3_minus.setTextSize(30);

  // Buttons for bias 
  btntheta_plus= new SimpleButton(width/2+60, height/2-40, 40, 40);
  btntheta_plus.setText("+");
  btntheta_plus.setTextSize(30);

  btntheta_minus= new SimpleButton(width/2+20, height/2-40, 40, 40);
  btntheta_minus.setText("-");
  btntheta_minus.setTextSize(30);

  // Button for calculation 
  btn_compute= new SimpleButton(width/2, height/2+400, 200, 70);
  btn_compute.setText("compute");
  btn_compute.setTextSize(35);

  // Buttons for activations 
  btn_threshold= new SimpleButton(width/2+280, height/2-400, 200, 70);
  btn_threshold.setToggleButton(true);
  btn_threshold.toggle();
  btn_threshold.setText("threshold");
  btn_threshold.setTextSize(35);

  btn_sigmoid= new SimpleButton(width/2+280, height/2-300, 200, 70);
  btn_sigmoid.setToggleButton(true);
  btn_sigmoid.setText("sigmoid");
  btn_sigmoid.setTextSize(35);

  btn_tanh= new SimpleButton(width/2+280, height/2-200, 200, 70);
  btn_tanh.setToggleButton(true);
  btn_tanh.setText("tanh");
  btn_tanh.setTextSize(35);  
}

function draw() {
  background(255);
  noStroke();
  smooth();

  // 2 half-ellipses 
  fill(255, 128, 33, 122.5);
  arc(width/2-20, height/2, 300, 200, HALF_PI, 3*HALF_PI);

  fill(251, 65, 36, 122.5);    
  arc(width/2+100, height/2, 300, 200, -HALF_PI, HALF_PI);

  // Texts 
  fill(0);
  //textFont(myfont, 30);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(nf(x_1,2,1), width/2-420, height/2-150);
  text("x_1", width/2-420, height/2-250);

  text(nf(x_2,2,1), width/2-420, height/2+50);
  text("x_2", width/2-420, height/2-50);

  text(nf(x_3,2,1), width/2-420, height/2+250);
  text("x_3", width/2-420, height/2+150);

  text(nf(w_1,1,1), width/2-220, height/2-150);
  text("w_1", width/2-220, height/2-250);

  text(nf(w_2,1,1), width/2-220, height/2+50);
  text("w_2", width/2-220, height/2-50);

  text(nf(w_3,1,1), width/2-220, height/2+250);
  text("w_3", width/2-220, height/2+150);

  text(nf(sum,1,3), width/2-80, height/2);

  text(theta, width/2+40, height/2+20);
  text("bias", width/2+40, height/2-100);

  text(a, width/2+160, height/2);

  text("y", width/2+400, height/2+40);
  text(nf(y,1,3), width/2+400, height/2-40);

  // Lines 
  stroke(78, 103, 200);
  strokeWeight(10);
  line(width/2-350, height/2-180, width/2-200, height/2-100);
  line(width/2-350, height/2, width/2-280, height/2);
  line(width/2-350, height/2+180, width/2-200, height/2+100);

  // Draw all buttons 
  btnx1_plus.draw(this);
  btnx2_plus.draw(this);
  btnx3_plus.draw(this);
  btnx1_minus.draw(this);
  btnx2_minus.draw(this);
  btnx3_minus.draw(this);

  btnw1_plus.draw(this);
  btnw2_plus.draw(this);
  btnw3_plus.draw(this);
  btnw1_minus.draw(this);
  btnw2_minus.draw(this);
  btnw3_minus.draw(this);

  btntheta_minus.draw(this);
  btntheta_plus.draw(this);

  btn_compute.draw(this);

  btn_threshold.draw(this);
  btn_sigmoid.draw(this);
  btn_tanh.draw(this);

  // Interacts buttons for x_i
  if (btnx1_plus.over(mouseX, mouseY) && mouseIsPressed) {
    if (x_1 < limit_x-0.01)
      x_1 += step_x;
    btnx1_plus.click(true);
  } else {
    btnx1_plus.click(false);
  }
   if (btnx2_plus.over(mouseX, mouseY) && mouseIsPressed) {
    if (x_2 < limit_x)
      x_2 += step_x;
    btnx2_plus.click(true);
  } else {
    btnx2_plus.click(false);
  }
  if (btnx3_plus.over(mouseX, mouseY) && mouseIsPressed) {
    if (x_3 < limit_x)
      x_3 += step_x;
    btnx3_plus.click(true);
  } else {
    btnx3_plus.click(false);
  }


  if (btnx1_minus.over(mouseX, mouseY) && mouseIsPressed) {
    if (x_1 > 0.0001)
      x_1 -= step_x;
    x_1 = abs(x_1);
    btnx1_minus.click(true);
  } else {
    btnx1_minus.click(false);
  }
  if (btnx2_minus.over(mouseX, mouseY) && mouseIsPressed) {
    if (x_2 > 0.001)
      x_2 -=  step_x;
    x_2 = abs(x_2);
    btnx2_minus.click(true);
  } else {
    btnx2_minus.click(false);
  }
  if (btnx3_minus.over(mouseX, mouseY) && mouseIsPressed) {
    if (x_3 > 0.001)
      x_3 -= step_x;
    x_3 = abs(x_3);
    btnx3_minus.click(true);
  } else {
    btnx3_minus.click(false);
  }

  // Interacts with w_i
  if (btnw1_plus.over(mouseX, mouseY) && mouseIsPressed) {
    if (w_1 < 1)
      w_1 += step_w;
    btnw1_plus.click(true);
  } else {
    btnw1_plus.click(false);
  }
  if (btnw2_plus.over(mouseX, mouseY) && mouseIsPressed) {
    if (w_2 < 1)
      w_2 += step_w;
    btnw2_plus.click(true);
  } else {
    btnw2_plus.click(false);
  }
  if (btnw3_plus.over(mouseX, mouseY) && mouseIsPressed) {
    if (w_3 < 1)
      w_3 += step_w;
    btnw3_plus.click(true);
  } else {
    btnw3_plus.click(false);
  }


  if (btnw1_minus.over(mouseX, mouseY) && mouseIsPressed) {
    if (w_1 > 0.001)
      w_1 -= step_w;
    w_1 = abs(w_1);
    btnw1_minus.click(true);
  } else {
    btnw1_minus.click(false);
  }
  if (btnw2_minus.over(mouseX, mouseY) && mouseIsPressed) {
    if (w_2 > 0.001)
      w_2 -=  step_w;
    btnw2_minus.click(true);
  } else {
    btnw2_minus.click(false);
  }
  if (btnw3_minus.over(mouseX, mouseY) && mouseIsPressed) {
    if (w_3 > 0.001)
      w_3 -= step_w;
    btnw3_minus.click(true);
  } else {
    btnw3_minus.click(false);
  }

  if (btn_compute.over(mouseX, mouseY) && mouseIsPressed) {
    compute();
  }

  // Interacts with bias 
  if (btntheta_minus.over(mouseX, mouseY) && mouseIsPressed) {
    if (theta > -limit_theta+0.001)
      theta -= step_theta;
    btntheta_minus.click(true);
  } else {
    btntheta_minus.click(false);
  }
  if (btntheta_plus.over(mouseX, mouseY) && mouseIsPressed) {
    if (theta < limit_theta-0.001)
      theta += step_theta;
    btntheta_plus.click(true);
  } else {
    btntheta_plus.click(false);
  }

  // Interacts with activation buttons 
  if (btn_threshold.over(mouseX, mouseY) && mouseIsPressed && !btn_threshold.isOn()) {
    btn_threshold.toggle();
    if (btn_sigmoid.isOn()) {
      btn_sigmoid.toggle();
    }
    if (btn_tanh.isOn()) {
      btn_tanh.toggle();
    }
  }
  if (btn_sigmoid.over(mouseX, mouseY) && mouseIsPressed && !btn_sigmoid.isOn()) {
    btn_sigmoid.toggle();
    if (btn_threshold.isOn()) {
      btn_threshold.toggle();
    }
    if (btn_tanh.isOn()) {
      btn_tanh.toggle();
    }
  }
  if (btn_tanh.over(mouseX, mouseY) && mouseIsPressed && !btn_tanh.isOn()) {
    btn_tanh.toggle();
    if (btn_threshold.isOn()) {
      btn_threshold.toggle();
    }
    if (btn_sigmoid.isOn()) {
      btn_sigmoid.toggle();
    }
  }
/*
  // Display images 
  image(img_threshold, width/2+80, height/2-435, 80, 80);
  image(img_sigmoid, width/2+80, height/2-335, 80, 80);
  image(img_tanh, width/2+80, height/2-235, 80, 80);

  // Display equation 
  textSize(20);
  textAlign(LEFT);
  fill(100);
  String str = "output: activfunc( w_1 * x_1  + w_2 * x_2  + w_3 * x_3  - (bias) ) = y";
  text(str, width/2-400, height/2 + 300);
   
  String str_eqn = "        ";
  if (btn_threshold.isOn()) {
    str_eqn = str_eqn + "threshold( ";
  }
  if (btn_sigmoid.isOn()) {
    str_eqn = str_eqn + "  sigmoid( ";
  }
  if (btn_tanh.isOn()) {
    str_eqn = str_eqn + "     tanh( ";
  }
  
  str_eqn = str_eqn + nf(w_1, 1, 1) + " * " + nf(x_1, 2, 1) + " + ";
  str_eqn = str_eqn + nf(w_2, 1, 1) + " * " + nf(x_2, 2, 1) + " + ";
  str_eqn = str_eqn + nf(w_3, 1, 1) + " * " + nf(x_3, 2, 1) + " - ";
  str_eqn = str_eqn + "(" + nfs(theta, 1, 1) + ")" + " ) = " + nf(y, 1, 3);
  text(str_eqn, width/2-400, height/2 + 340);
*/
}

// Compute values with inputs 
function compute() {
  sum = x_1*w_1 + x_2*w_2 + x_3*w_3; 
  a = sum - theta;
  if (btn_threshold.isOn()) {
    y = func_step(a);
  }
  if (btn_sigmoid.isOn()) {
    y = func_sigmoid(a);
  }
  if (btn_tanh.isOn()) {
    y = func_tanh(a);
  }
}

// Activation func: thresholding 
function func_step(x) {
  if (x < 0) {
    return 0;
  } else {
    return 1;
  }
}

// Activation func: sigmoid 
function func_sigmoid(x) {
  return 1. / (1+exp(-x));
}

// Activation func: tanh 
function func_tanh(x) {
  return 1 -  2./(exp(2*x)+1);
}