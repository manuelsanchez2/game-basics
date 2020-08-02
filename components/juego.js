// Hemos importado la formula de Leon con la cual podemos no solo crear un elemento sino tbn meterle propiedades de una. Ademas, para poder dibujar en el canvas, necesitamos guardar el contexto de graficos 2D.

const canvas = document.querySelector('.juego');
const ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-50;
let movingX = 2;
let movingY = -2;

let ballRadius = 10;
let paddleHeight = 10; //esto es la altura de la paleta
let paddleWidth = 75; // esto es el ancho de la paleta
let paddleX = (canvas.width-paddleWidth)/2; //posicion en la que empieza a dibujarse

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownActivator, false);
document.addEventListener("keyup", keyUpActivator, false);

function keyDownActivator(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    } else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpActivator(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function createBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#ffce00";
    ctx.fill();
    ctx.closePath();
}

// Aqui tenemos el codigo para crear una paleta con la que golpear la bola. Se complica la cosa.
// Recordemos que para hacer un rectangulo necesitamos cuatro atributos: 


function createPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function loopCleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpieza
    createPaddle();    
    createBall(); // invoca la funcion de arriba y crea la bola en la posicion inicial
   
    if (x + movingX > canvas.width - ballRadius || x + movingX < ballRadius ) {
        movingX = -movingX;
    }

    if (y + movingY < ballRadius ) {
        movingY = -movingY;
    } else if (y + movingY > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            movingY = -movingY;
        }
        else {
            // alert("GAME OVER");
            document.location.reload();
        }
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += movingX; // x = x + 2
    y += movingY; // y = y - 2
  
    // Se vuelve a repetir todo pero con los valores de x e y cambiados y recordados para la siguiente vuelta del loop.
    
}


setInterval(loopCleanCanvas, 20); // cada 40 milisegundos se borra el lienzo.