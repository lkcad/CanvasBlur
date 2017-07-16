/**
 * Created by Good luck on 2017/7/16.
 */
var drawPaper = $("#draw_paper")[0];
var width = 800;
var height = 600;
var clippingRegion = {x: 200, y: 200, r: 44};
console.log(drawPaper);
drawPaper.width = width;
drawPaper.height = height;

var context = drawPaper.getContext("2d");

var image = new Image();
image.src = "image/image.jpg";

image.onload = function () {
    initCanvas();
};


function initCanvas() {
    clippingRegion = {x: Math.random() * 700 + 50, y: Math.random() * 500 + 50, r: 50};
    drawImage(image, clippingRegion);
}


function drawImage(image, clippingRegion) {
    context.clearRect(0, 0, drawPaper.width, drawPaper.height);
    context.save();
    SetClip(clippingRegion);
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, drawPaper.width, drawPaper.height);
    context.restore();

    function SetClip(clippingRegion) {
        context.beginPath();
        context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
        context.closePath();
        context.clip();
    }
}

$("#show").click(show);
$("#reset").click(reset);

function show() {

    var flag = setInterval(function () {
        clippingRegion.r += 20;
        drawImage(image, clippingRegion);
        if (clippingRegion.r > 1000) {
            clearInterval(flag)
        }
    }, 10);
}

function reset() {
    clippingRegion.x = Math.random() * 700 + 50;
    clippingRegion.y = Math.random() * 500 + 50;
    clippingRegion.r = 1000;
    var flag2 = setInterval(function () {
        clippingRegion.r -= 20;
        drawImage(image, clippingRegion);
        if (clippingRegion.r < 50) {
            clearInterval(flag2)
        }
    }, 10);
}
