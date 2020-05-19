let size = container.getBoundingClientRect();

console.log(size);

let size_d = draw.getBoundingClientRect();
let ctd = draw.getContext("2d");

let ctt = result.getContext("2d");


let block_color = "red";

function drawLine(context, y, c) {
    context.beginPath();
    context.strokeStyle = c;
    context.lineWidth = 1;
    context.moveTo(0, y);
    context.lineTo(draw.width, y);
    context.closePath();
    context.stroke();
}

function drawBlock(context, start, end, c) {
    let height = start - end;
    if (height >= 0) {
        for (let i = 0; i <= height; i++) {
            drawLine(context, start - i, c);
        }
    } else {
        for (let i = 0; i <= Math.abs(height); i++) {
            drawLine(context, start + i, c);
        }
    }
}

let c_count = 0;
let lineStart, lineEnd;
draw.addEventListener("click", function (e) {
    let ox = (e.pageX || e.clientX) - size_d.x;
    let oy = (e.pageY || e.clientY) - size_d.y;
    let data = ctt.getImageData(ox, oy, 1, 1).data;
    let c = "black";
    if (data[3] === 0) {
        c = "black";
    } else {
        c = "rgba(" + (255 - data[0]) + "," + (255 - data[1]) + "," + (255 - data[2]) + ",255)";
    }
    drawLine(ctd, oy, c);
    if (c_count === 0) {
        lineStart = oy;
        c_count = 1;
    } else {
        lineEnd = oy;
        drawBlock(ctt, lineStart, lineEnd, block_color);
        c_count = 0;
        ctd.clearRect(0, 0, draw.width, draw.height);
    }

});


/*
let imgData = context.getImageData(100, 100, 200, 200);

let line = 0;
let l_count = 0;
let count = 0;
for (let i = 0; i < imgData.data.length; i += 4) {
    count++;
    l_count++;
    if (l_count > 958){
        line ++;
        l_count = 0;
        if (line > 3){
            line = 0;
        }
    }
    if (count > 3) {
        count = 0;
    }
    switch (line) {
        case 0:
            if (count === 0 || count === 3) {
                imgData.data[i + 3] = 0;
            }
            break;
        case 1:
            if (count === 3 || count === 4) {
                imgData.data[i + 3] = 0;
            }
            break;
        case 2:
            if (count === 2 || count === 3) {
                imgData.data[i + 3] = 0;
            }
            break;
        case 3:
            if (count === 1 || count === 2) {
                imgData.data[i + 3] = 0;
            }
            break;
    }
}

context.strokeRect(500, 99, 202, 202);
temp_ctx.putImageData(imgData, 0, 0);
context.drawImage(temp, 500,100);

context.translate(700,100);
context.rotate(Math.PI /2);
context.drawImage(temp, 0,0);
*/