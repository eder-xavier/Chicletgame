
let xbotao1, ybotao1;

let xbotao2, ybotao2;

let xbotao3, ybotao3;

//coords do cursor
let xcursor, ycursor;

//var de estados

let estado, cursor0;

//var gerais
let monoSynth;
let xpos, ypos;
let fonte,fonte2, fundomenu, fundo1, fundo2, fundo3, minhafoto;
let bird, cara, ceu, snd, som;
let score = 0;
let balas = []
let quedas = []

function preload(){
  
  ceu = loadImage('ceu.png');
  minhafoto = loadImage('minhafoto.png');
  fonte = loadFont('faroeste.otf');
  fonte2 = loadFont('fonte2.ttf');
  fundomenu = loadImage('menu.png');
  fundo1 = loadImage('fundo1.png');
  fundo2 = loadImage('fundo2.png');
  fundo3 = loadImage('fundo3.png');
  
  soundFormats('mp3');
  snd = loadSound('som.mp3');
  
}

function setup(){
  createCanvas(500, 500);
  
  
  
  xbotao1 = 200;
  ybotao1 = 110;

  xbotao2 = 200;
  ybotao2 = 190;
  
  xbotao3 = 200;
  ybotao3 = 270;
  
  xcursor = 200;
  ycursor = 110;
  
  estado = 1;
  
  cursor0 = 1;
  
  
  snd.play();
}

function draw(){
  rectMode(CENTER);
  if(estado == 1){
    menu();
  }
  if(estado == 2) {
    start();
}
  if(estado == 3) {
    instrucoes();
  }
  if(estado == 4) {
    creditos();

}
  if(estado == 5) {
    perdeu();

}
  if(estado == 6){
    menuf2();
  }
  if(estado == 7){
    start2();
  }

}

function keyPressed(){
  if(keyCode == UP_ARROW){
    if (cursor0 == 2){
      ycursor = ybotao1;
      cursor0 = 1;
      
    }
    if (cursor0 == 3) {
      ycursor = ybotao2;
      cursor0 = 2;
    }

  }
  if(keyCode == DOWN_ARROW && ycursor == ybotao2) {
      ycursor = ybotao3;
      cursor0 = 3;
      }
  if(keyCode == DOWN_ARROW && ycursor == ybotao1){
      ycursor = ybotao2;
      cursor0 = 2;
    }
  
  if(keyCode == ENTER) {
    if (estado == 1){ 
    if (cursor0 == 1) {
      estado = 2;
    }
    else if(cursor0 == 2) {
      estado = 3;
    }
    else if(cursor0 == 3) {
      estado = 4;
    }
    }
  }
  if (keyCode == ESCAPE){
    if(estado == 2 || estado == 3 || estado == 4 || estado == 5 || estado == 6 || estado == 7){
      if(estado == 2 || estado == 5 || estado == 6 || estado == 7){
        while(balas.length) {
           balas.pop();
      }
        while(quedas.length) {
           quedas.pop();
      }
      
      score = 0
      }
      
      estado = 1;
    }
  }
  
  if (keyCode == TAB){
    if(estado == 6){
      estado = 7;
  }}
    
}

function menu(){
  background(fundomenu);
  var texto1, texto2, texto3;

//cores
var branco = color('white');
var azul = color(0, 102, 153);
var azulao = color(4, 8, 70);

//nome
  
  stroke(branco)
  noFill();
  textSize(80);
  textFont(fonte2);
  text("BubbleGum",+10+75, +90+60);
  
  textSize(40);
  text("Game",+300+60, +90+100);



  
//desenho do botão1

  noFill()
  noStroke(220);
  textSize(40);
  rect(xbotao1, ybotao1, 90,50);
  fill(220);
  textFont(fonte2);
  texto1 = text("JOGAR", xbotao1-0-12, ybotao1+135+6);

  // Botão 2

  noFill()
  textSize(40);
  rect(xbotao2, ybotao2, 90, 50);
  fill(220);
  texto2 = text("INSTRUÇÕES",xbotao2-38-20,ybotao2+135+6);
  
  
// Botão 3

  noFill();
  textSize(40);
  rect(xbotao3, ybotao3, 90, 60);
  fill(220);
  texto3 = text("CRÉDITOS",xbotao3-20-20,ybotao3+135+6);

  noFill();
  stroke(branco);
  strokeWeight(3);
  var cus = rect(xcursor+50, ycursor+130, 230, 60, 10, 10);

}

function start(){
  
  background(fundo3);
  rectMode(CENTER);
   //spawn de cubos
  for (let i =1; i < 2; i++){
    let queda = {
      x: random(0, width),
      y: random(-95000, 0)
    };
    quedas.push(queda)
    fill('rgb(120,3,163)')
  }
  

  ellipse(mouseX, height -50, 25 )
  
  
  //jogador
  for(let bala of balas){
    fill('rgb(120,3,163)')
    bala.y -= 10
    var jog = ellipse(bala.x, bala.y, 18)

    
  }
  
  //inimigos
  for(let queda of quedas){
    queda.y += 2
    fill('brown');
    var q = rect(queda.x, queda.y, 15);
    if(queda.y  > height) {
      estado = 5;
    }

  }
  
  // colisões
  for(let queda of quedas){
    for(let bala of balas){
      if(dist(queda.x, queda.y, bala.x, bala.y) < 15){
        quedas.splice(quedas.indexOf(queda), 1)
        balas.splice(balas.indexOf(bala), 1)
        
      var quadrado = {
        x: random(0, width),
        y: random(-1, 0) 
      }
      quedas.push(quadrado)
      score = score + 1;
      if(score == 25) {
        estado = 6;
  }
      }
      }
    }



text(score, 15, 30)
}

function start2(){

  background(fundo3);
  rectMode(CENTER);
   //spawn de cubos
  for (let i =1; i < 2; i++){
    let queda = {
      x: random(0, width),
      y: random(-50000, 0)
    };
    quedas.push(queda)
    fill('#FFC107')
  }
  

  ellipse(mouseX, height -50, 25 )
  
  
  //jogador
  for(let bala of balas){
    fill('red')
    bala.y -= 10
    var jog = ellipse(bala.x, bala.y, 18)

    
  }
  
  //inimigos
  for(let queda of quedas){
    queda.y += 2
    fill('rgb(45,184,60)');
    var q = rect(queda.x, queda.y, 15);
    if(queda.y  > height) {
      estado = 5;
    }

  }
  
  // colisões
  for(let queda of quedas){
    for(let bala of balas){
      if(dist(queda.x, queda.y, bala.x, bala.y) < 15){
        quedas.splice(quedas.indexOf(queda), 1)
        balas.splice(balas.indexOf(bala), 1)
        
      var quadrado = {
        x: random(0, width),
        y: random(-1, 0) 
      }
      quedas.push(quadrado)
      score = score + 1;
        
      }
    }
  }
  textSize(28)
  text(score, 15, 30)

}

function instrucoes(){ 
  
  background(fundo2);
  
  noFill();
  noStroke();
  fill(220);
  textSize(50);
  textFont(fonte2);
  text("Instruções", 150, 85);
  
  noFill();
  noStroke();
  fill(220);
  textSize(21);
  text("Venha ao mundo dos doces e impeça os ", 100, 130);
  text("chocolates de cairem no chão! Como?", 100, 160);
  text("Atirando bolas de chiclete!", 150, 190);
  
  textSize(20);
  text("Guie o Lançador de chicletes com o mouse e utilize", 70, 250);
  text(" o botão esquerdo do mesmo para atirar", 100, 270);
  
  textSize(19)
  text("Além da diversão, este jogo possui também o objetivo", 69, 340);
  text("de instruir as pessoas a desenvolverem seus reflexos ", 69, 360);
  
  
  textSize(16);
  text('ESC para voltar',200, 444 );
} 

function mousePressed(){
  if (estado == 2 || estado == 7) {
    let bala = {
      x: mouseX,
      y: height - 50
    }
    balas.push(bala)
  }
}

function creditos(){
  
  //possivel cor boa para background: 210,105,30
  background (fundo2);
  
  noFill();
  noStroke();
  fill(220);
  textSize(50);
  textFont(fonte2);
  text("Créditos", 150, 90);
  
  noFill();
  noStroke();
  fill(220);
  textSize(26);
  text("Desenvolvedor", 90, 150);
  
  textSize(22);
  text("Éder Xavier", 90, 200);
  image(minhafoto, 250, 120);
  
  textSize(16);
  text('ESC para voltar', 200, 444);
  
}

function perdeu(){
  background(0, 0, 0);
  textFont(fonte2)
  fill('rgb(168,35,35)')
  
  textSize(40)
  text("Você perdeu!", 150, 200)
  
  textSize(22)
  text("ESC para voltar", 200, 444)

  text("Pontuação: " + score, 200, 400)
}

function menuf2(){
  
  background(0, 0, 0);
  textFont(fonte2)
  fill('#03A9F4')
  
  textSize(40)
  text("Fase 2 Desbloqueada", 150, 200)
  
  textSize(22)
  text("TAB para continuar", 200, 444)
  
   
      while(balas.length) {
           balas.pop();
      }
      while(quedas.length) {
           quedas.pop();
      }
      


}
  