let temp = document.querySelector("#temp");
let ctt = temp.getContext("2d");

let p_container = document.querySelector("#picker_container");

let picker = document.createElement("canvas");
picker.id = "#color_picker";
picker.width = 286;
picker.height = 291;
p_container.appendChild(picker);
let p_size = picker.getBoundingClientRect();
let p_context = picker.getContext("2d");

let inputRGB = document.createElement("input");
inputRGB.type = "text";
inputRGB.style.width = 80+ "px";
inputRGB.style.height = 17+"px";
inputRGB.style.position = "absolute"
inputRGB.style.top = (p_size.y + 266) +"px";
inputRGB.style.left = 50+"px";
p_container.appendChild(inputRGB);


let inputHEX = document.createElement("input");
inputHEX.type = "text";
inputHEX.style.width = 80+ "px";
inputHEX.style.height = 17+"px";
inputHEX.style.position = "absolute"
inputHEX.style.top = p_size.y + 266 +"px";
inputHEX.style.left = 150+"px";
p_container.appendChild(inputHEX);

let inputBTN = document.createElement("input");
inputBTN.type = "button";
inputBTN.value = "+";
inputBTN.style.width = 20 + "px";
inputBTN.style.height = 20 +"px";
inputBTN.style.position = "absolute"
inputBTN.style.top = p_size.y + 266 +"px";
inputBTN.style.left = 250+"px";
p_container.appendChild(inputBTN);

let barColor = "255,0,0"
let resultColor = barColor;

function rgb2hex(rgb) {
    let aRgb = rgb instanceof Array ? rgb : (rgb.split(',') || [0, 0, 0]);
    let temp;
    return [
        (temp = Number(aRgb[0]).toString(16)).length === 1 ? ('0' + temp) : temp,
        (temp = Number(aRgb[1]).toString(16)).length === 1 ? ('0' + temp) : temp,
        (temp = Number(aRgb[2]).toString(16)).length === 1 ? ('0' + temp) : temp,
    ].join('');
}

function hex2rgb(hex) {
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return [
        parseInt(hex[0] + hex[1], 16),
        parseInt(hex[2] + hex[3], 16),
        parseInt(hex[4] + hex[5], 16),
    ].join();
}

function colorBar() {
    let gradientBar = p_context.createLinearGradient(0, 0, 0, 256);
    gradientBar.addColorStop(0, '#f00');
    gradientBar.addColorStop(1 / 6, '#f0f');
    gradientBar.addColorStop(2 / 6, '#00f');
    gradientBar.addColorStop(3 / 6, '#0ff');
    gradientBar.addColorStop(4 / 6, '#0f0');
    gradientBar.addColorStop(5 / 6, '#ff0');
    gradientBar.addColorStop(1, '#f00');

    p_context.fillStyle = gradientBar;
    p_context.fillRect(0, 0, 20, 256);
}

function colorBox(color) {
    p_context.clearRect(30,0,256,256);
    // 底色填充，也就是（举例红色）到白色
    let gradientBase = p_context.createLinearGradient(30, 0, 256 + 30, 0);
    gradientBase.addColorStop(1, color);
    gradientBase.addColorStop(0, 'rgba(255,255,255,1)');
    p_context.fillStyle = gradientBase;
    p_context.fillRect(30, 0, 256, 256);
    // 第二次填充，黑色到透明
    let my_gradient1 = p_context.createLinearGradient(0, 0, 0, 256);
    my_gradient1.addColorStop(0, 'rgba(0,0,0,0)');
    my_gradient1.addColorStop(1, 'rgba(0,0,0,1)');
    p_context.fillStyle = my_gradient1;
    p_context.fillRect(30, 0, 256, 256);
}

function setColorBar(height){
    p_context.clearRect(21, 0, 8, 259);
    p_context.fillStyle = "black";
    p_context.lineWidth = 1;
    p_context.beginPath();
    p_context.moveTo(21, height);
    p_context.lineTo(29,height-3);
    p_context.lineTo(29,height+3);
    p_context.closePath();
    p_context.fill();
}

function setColorBox(x,y, color){

    colorBox(color);
    p_context.strokeStyle = "black";
    p_context.lineWidth = 3;
    p_context.beginPath();
    p_context.moveTo(x-3, y);
    p_context.lineTo(x-1,y);
    p_context.stroke();
    p_context.beginPath();
    p_context.moveTo(x+3, y);
    p_context.lineTo(x+1,y);
    p_context.stroke();
    p_context.beginPath();
    p_context.moveTo(x, y-3);
    p_context.lineTo(x,y-1);
    p_context.stroke();
    p_context.beginPath();
    p_context.moveTo(x, y+3);
    p_context.lineTo(x,y+1);
    p_context.stroke();
}

function showResult(){
    p_context.fillStyle = "rgb(" + resultColor + ")";
    p_context.fillRect(10, 266, 20, 20);

    inputRGB.value = resultColor;
    inputHEX.value = rgb2hex(resultColor).toUpperCase();
}

colorBar(20);
setColorBar(0);
colorBox("red");
showResult();
ctt.fillStyle = "rgb("+resultColor+")";
ctt.fillRect(0,0,temp.width,temp.height);

picker.addEventListener("click", function (e) {
    let ox = (e.pageX || e.clientX) - p_size.x;
    let oy = (e.pageY || e.clientY) - p_size.y;

    if (ox > 0 && ox < 20 && oy >= 0 && oy < 256) {
        setColorBar(oy);
        let imageData = p_context.getImageData(ox, oy, 1, 1);
        let r = imageData.data[0];
        let g = imageData.data[1];
        let b = imageData.data[2];
        barColor = r + "," + g + "," + b;
        colorBox("rgb(" + barColor + ")")
    }

    if (ox > 30 && ox < 286 && oy > 0 && oy < 256){
        setColorBox(ox,oy,"rgb(" + barColor + ")");
        let imageData = p_context.getImageData(ox, oy, 1, 1);
        let r = imageData.data[0];
        let g = imageData.data[1];
        let b = imageData.data[2];
        resultColor =  r + "," + g + "," + b;
        showResult();
        ctt.fillStyle = "rgb("+resultColor+")";
        ctt.fillRect(0,0,temp.width,temp.height);
    }
});
