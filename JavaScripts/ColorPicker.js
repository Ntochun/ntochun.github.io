let picker = document.querySelector("#color_picker");
let p_context = picker.getContext("2d");

picker.width = 286;
picker.height = 286;

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
    if(hex.length === 3) {
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

console.log(rgb2hex("122,233,56")+"\n"+hex2rgb("ff00ff"))

colorBar(20);
colorBox("red")