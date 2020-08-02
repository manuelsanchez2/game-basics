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

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 55;
let brickHeight = 10;
let brickPadding = 1.5;
let brickOffsetTop = 20;
let brickOffsetLeft = 10;

let score = 0;

// Ahora vamos a crear la funcion o array que prepare la disposicion de los ladrillos. Vamos a utilizar la funcion for y en el index vamos a utilizar c para las columnas y r para las filas. El maximo de length tipico que se utiliza en el for lo vamos a limitar con brickRowCount y brickColumnCount. Se habla de un bucle dentro y otro de fuera por dos razones.

/// bucle: 0, 0, 0, 0, 0
            // 0, 0, 0, 0, 0
//          0, 0, 0, 0, 0
// El ultimo ladrillo es el [2][4]. Nosotros lo que le decimos al programa con el bucle creado es que primero empiece a mirar la columna 0, que es la primera y que dentro de esa matriz o Array, haga la funcion de ir creando las columnas hasta que llegue al maximo, una vez termine empezara con la columna 1 y empezara a rellenar ladrillos hasta el [1][2]. Y asi hasta que esten todos listos.

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownActivator, false);
document.addEventListener("keyup", keyUpActivator, false);
document.addEventListener("mousemove", mouseMoveActivator, false);

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

function mouseMoveActivator(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    movingY = -movingY;
                    b.status = 0;  
                    score++;
                    if(score == 15) {
                        alert("YOU WIN, CONGRATULATIONS");
                        document.location.reload();
                    }
            }
            
            }
        }
    }
}

function createScore() {
    ctx.font = "10px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: "+ score, 8, 14);
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

function createBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();   
            }
        }
    }
}


function loopCleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpieza
    createBricks();
    createBall(); // invoca la funcion de arriba y crea la bola en la posicion inicial
    createPaddle();   
    createScore();
    collisionDetection(); 
   
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
            alert("GAME OVER");
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