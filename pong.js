function Ball() {
    this.id = "ball";
    this.x = 0;
    this.y = 0;
    this.vx = 50;
    this.vy = 50;
}
function place_objects(objects) {
    for(let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}
function update() {
    if (ball.x < 0 || ball.x > document.body.getBoundingClientRect().width + 64 )
        ball.vx = - ball.vxq

    ball.x += ball.vx;
    ball.y += ball.vy;
    place_objects([ball]);
}
let ball;
function init() {
    ball = new Ball();
    setInterval(update, 100);
}

init();