// Hemos importado la formula de Leon con la cual podemos no solo crear un elemento sino tbn meterle propiedades de una. Ademas, para poder dibujar en el canvas, necesitamos guardar el contexto de graficos 2D.

const canvas = document.querySelector('.juego');
const ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-50;
let movingX = 2;
let movingY = -2;

let ballRadius = 10;

function createBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function loopCleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpieza
    createBall(); // invoca la funcion de arriba y crea la bola en la posicion inicial
    
    if (x + movingX > canvas.width - ballRadius || x + movingX < ballRadius ) {
        movingX = -movingX;
    }

    if (y + movingY > canvas.height - ballRadius || y + movingY < ballRadius ) {
        movingY = -movingY;
    }

    x += movingX; // x = x + 2
    y += movingY; // y = y - 2
  
    // Se vuelve a repetir todo pero con los valores de x e y cambiados y recordados para la siguiente vuelta del loop.
}
setInterval(loopCleanCanvas, 40); // cada 40 milisegundos se borra el lienzo.