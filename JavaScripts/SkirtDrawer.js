let size = container.getBoundingClientRect();

let size_d = draw.getBoundingClientRect();
let ctd = draw.getContext("2d");

let ctr = result.getContext("2d");

function fillImgData(context,height,array) {
    let imgData = context.createImageData(959,height);
    for (let i=0;i<imgData.data.length;i++){
        imgData.data[i] = array[0];
        imgData.data[i+1] = array[1];
        imgData.data[i+2] = array[2];
        imgData.data[i+3] = 255;
    }
    return imgData;
}

function drawBlock(start, end) {
    let height = start - end;
    let block = ctt.getImageData(0,0, 959, Math.abs(height));
    if (height > 0){
        ctr.putImageData(block,0, end);
    }else {
        ctr.putImageData(block,0, start);
    }
}

let c_count = 0;
let lineStart, lineEnd;
draw.addEventListener("click", function (e) {
    let ox = (e.pageX || e.clientX) - size_d.x;
    let oy = (e.pageY || e.clientY) - size_d.y;
    let data = ctt.getImageData(ox, oy, 1, 1).data;

    if (c_count === 0) {
        lineStart = oy;
        c_count = 1;
    ctd.strokeStyle = "black";
    if (data[3] === 0) {
        ctd.strokeStyle = "black";
    } else {
        ctd.strokeStyle = "rgb("+ 255 - data[0]+ ","+255 - data[1]+","+255 - data[2]+")";
    }
    ctd.beginPath();
    ctd.moveTo(0,oy);
    ctd.lineTo(959, oy);
    ctd.closePath();
    ctd.stroke();

    } else {
        lineEnd = oy;
        drawBlock(lineStart, lineEnd);
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