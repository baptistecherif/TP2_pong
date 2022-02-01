"use strict";

let ball;
let paddle_player1;
let paddle_player2;
let buttons;
let scores;


const BODY_WIDTH = document.body.getBoundingClientRect().width;
const BODY_HEIGHT = document.body.getBoundingClientRect().height;

const BALL_SIZE = document.getElementById('ball').offsetHeight;
const BALL_START_POS_X = document.getElementById('ball').offsetLeft;
const BALL_START_POS_Y = document.getElementById('ball').offsetTop;

const PADDLE_WIDTH = document.getElementById('paddle_player1').offsetWidth;
const PADDLE_HEIGHT = document.getElementById('paddle_player1').offsetHeight;


function Paddle_player1() {
    this.id = "paddle_player1";
    this.y = document.getElementById('paddle_player1').offsetTop;
    this.vy = 50;
}

function Paddle_player2() {
    this.id = "paddle_player2";
    this.y = document.getElementById('paddle_player2').offsetTop;
    this.vy = 50;
}

function Ball() {
    this.id = "ball";
    this.x = document.getElementById('ball').offsetLeft;
    this.y = document.getElementById('ball').offsetTop;
    this.vx = 50;
    this.vy = 50;
}

function Scores(){
    this.id = "scores";
    this.score_player1 = 0;
    this.score_player2 = 0;
    document.getElementById('score_player1').innerHTML = 0;
    document.getElementById('score_player2').innerHTML = 0;
}

function Buttons() {
    this.player1_up = false;
    this.player1_down = false;
    this.player2_up = false;
    this.player2_down = false;
}

function place_objects(objects) {
    for (let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}

function track_player_input(event) {
    if (event.type == "keydown") {
        switch (event.key) {
            case "a": buttons.player1_up = true; break;
            case "q": buttons.player1_down = true; break;
            case "p": buttons.player2_up = true; break;
            case "m": buttons.player2_down = true; break;
        }
    }
    else if (event.type == "keyup") {
        switch (event.key) {
            case "a": buttons.player1_up = false; break;
            case "q": buttons.player1_down = false; break;
            case "p": buttons.player2_up = false; break;
            case "m": buttons.player2_down = false; break;
        }
    }
}

document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);

function init() {
    ball = new Ball();
    buttons = new Buttons();
    paddle_player1 = new Paddle_player1();
    paddle_player2 = new Paddle_player2();
    scores = new Scores();
    setInterval(update, 100);
}

function update() {
    if (buttons.player1_up && paddle_player1.y >= 0) {
        paddle_player1.y -= paddle_player1.vy;
    }
    if (buttons.player1_down && paddle_player1.y <= BODY_HEIGHT - PADDLE_HEIGHT) {
        paddle_player1.y += paddle_player1.vy;
    }

    if (buttons.player2_up && paddle_player2.y >= 0) {
        paddle_player2.y -= paddle_player2.vy;
    }
    if (buttons.player2_down && paddle_player2.y <= BODY_HEIGHT - PADDLE_HEIGHT) {
        paddle_player2.y += paddle_player2.vy;
    }


    if (ball.x <= PADDLE_WIDTH && ball.y <= paddle_player1.y + PADDLE_HEIGHT + (BALL_SIZE/2) && ball.y >= paddle_player1.y - (BALL_SIZE/2)) {
        ball.vx = -ball.vx;
    }

    if (ball.x + BALL_SIZE >= BODY_WIDTH - PADDLE_WIDTH && ball.y <= paddle_player2.y + PADDLE_HEIGHT + (BALL_SIZE/2) && ball.y >= paddle_player2.y - (BALL_SIZE/2)) {
        ball.vx = -ball.vx;
    }

    if (ball.y <= 0 || ball.y + BALL_SIZE >= BODY_HEIGHT) {
        ball.vy = -ball.vy;
    }

    if (ball.x <= 0 - BALL_SIZE) {
        ball.x = BALL_START_POS_X;
        ball.y = BALL_START_POS_Y;
        document.getElementById('score_player2').innerHTML = ++scores.score_player2;
    }

    if (ball.x >= BODY_WIDTH) {
        ball.x = BALL_START_POS_X;
        ball.y = BALL_START_POS_Y;
        document.getElementById('score_player1').innerHTML = ++scores.score_player1;
    }

    ball.x += ball.vx;
    ball.y += ball.vy;

    place_objects([ball, paddle_player1, paddle_player2]);
}

init();