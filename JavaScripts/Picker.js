let red_count = 114;
let green_count = 114;
let blue_count = 114;

let picker_container = document.querySelector("#colorPicker");

let picker = document.createElement("canvas");
picker.style.border = "1px solid black";
picker.width = 266;
picker.height = 300;

picker_container.appendChild(picker);

let picker_size = picker.getBoundingClientRect();

picker_context = picker.getContext("2d");

function colorBar(color, x, y, height) {
    let gradientBase = picker_context.createLinearGradient(x, 0, 256 + x, 0);
    gradientBase.addColorStop(0, "rgb(0,0,0)");
    gradientBase.addColorStop(1, color);
    picker_context.fillStyle = gradientBase;
    picker_context.fillRect(x, y, 256, height);
}

function selector(color, x, y, height) {
    picker_context.fillStyle = color;
    picker_context.beginPath();
    picker_context.moveTo(x, y);
    picker_context.lineTo(x - 3, y - 3);
    picker_context.lineTo(x + 3, y - 3);
    picker_context.moveTo(x, y + height);
    picker_context.lineTo(x - 3, y + height + 3);
    picker_context.lineTo(x + 3, y + height + 3);
    picker_context.closePath();
    picker_context.fill();
}

function result(r, g, b) {
    picker_context.clearRect(0, 0, 265, 86);
    colorBar("red", 5, 5, 10);
    selector("rgb(" + r + ",0,0)", r + 5, 5, 10);
    colorBar("green", 5, 22, 10);
    selector("rgb(0," + g + ",0)", g + 5, 22, 10);
    colorBar("blue", 5, 39, 10);
    selector("rgb(0,0," + r + ")", b + 5, 39, 10);
    picker_context.fillStyle = "black";
    picker_context.fillRect(4, 55, 258, 32);
    picker_context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    picker_context.fillRect(5, 56, 256, 30);
}

picker.addEventListener("click", function (e) {
    let ox = (e.pageX || e.clientX) - picker_size.x;
    let oy = (e.pageY || e.clientY) - picker_size.y;

    let color_count = 0;
    if (ox < 5){
        color_count = 0;
    }else if (ox > 261){
        color_count = 255;
    }else {
        color_count = ox -5;
    }
    if (oy > 5 && oy < 15) {
        red_count = color_count;
    }
    if (oy > 22 && oy < 32) {
        green_count = color_count;
    }
    if (oy > 39 && oy < 49) {
        blue_count = color_count;
    }
    result(red_count, green_count, blue_count);
});

result(red_count, green_count, blue_count);