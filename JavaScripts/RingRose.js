/***
 * 获取浏览器显示区域的尺寸。
 * @returns {{width: number, height: number}}
 */
function getDocumentSize() {
    let screen = document.createElement("div");
    screen.setAttribute("style",
        "width:100%;height:100%;position:fixed");
    document.body.append(screen);
    let rect = screen.getBoundingClientRect();
    screen.remove();
    return {width: rect.width, height: rect.height};
}

/***
 * 角度转弧度。
 * @param deg {number} 输入角度。
 * @returns {number} 输出弧度。
 * @constructor
 */
function Rad(deg) {
    return deg * Math.PI / 180;
}

/**
 * 将度分秒转化成度
 * @param degree {number}
 * @param minute {number}
 * @param second {number}
 * @returns {number}
 * @constructor
 */
function Degree(degree, minute, second) {
    return (degree + minute / 60 + second / 3600);
}

class RingRose {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.ringWidth = 30;
        this.insideRadius = 100;
        this.lineColor = "white";
        this.lineWidth = 2;
        this.segmentColor1 = "yellow";
        this.segmentColor2 = "red";
        this.segmentAngles = [12.857142, 38.571428, 38.571428, 38.571428,
            38.571428, 38.571428, 38.571428, 38.571428, 38.571428, 38.571428];
        this.segmentNames = ["K", "B1", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "B2"];
        this.cylinder = {count: 28, word: "U", start: 1, step: 1, firstAngle: 0};
    }

    setNameFont(fontWeight, fontSize, fontFamily, color) {
        this.context.font = fontWeight + " " + fontSize + "px " + fontFamily;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.strokeStyle = color;
        this.context.fillStyle = color
    }

    draw(color, fill) {
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = color;
        this.context.fillStyle = color
        fill ? this.context.fill() : this.context.stroke();
    }

    drawSegment(radius, crossAngle, color, fill) {
        crossAngle = Rad(crossAngle);
        this.context.beginPath();
        this.context.arc(0, 0, radius, 0, crossAngle, false);
        this.context.arc(0, 0, radius + this.ringWidth, crossAngle, 0, true);
        this.draw(color, fill);
    }

    drawRingBackground(radius) {
        this.context.save();
        let angle = 0, colorNumber = 0, colorArray = [this.segmentColor1, this.segmentColor2];
        for (let i = 0; i < this.segmentAngles.length; i++) {
            this.context.rotate(Rad(angle));
            colorNumber = colorNumber === 0 ? 1 : 0;
            this.drawSegment(radius, this.segmentAngles[i], colorArray[colorNumber], true);
            angle = this.segmentAngles[i];
        }
        this.context.restore();
    }

    drawRingLine(radius) {
        this.context.save();
        let angle = 0;
        for (let i = 0; i < this.segmentAngles.length; i++) {
            this.context.rotate(Rad(angle));
            this.drawSegment(radius, this.segmentAngles[i], this.lineColor, false);
            angle = this.segmentAngles[i];
        }
        this.context.restore();
    }

    drawSegmentNames(radius) {
        let angle = this.segmentAngles[0] / 2 + 90;
        this.setNameFont("bolder", 15, "Arial", "black");
        this.context.save();
        for (let i = 0; i < this.segmentNames.length; i++) {
            if (i !== 0) {
                angle += this.segmentAngles[i] / 2;
            }
            this.context.rotate(Rad(angle));
            this.context.fillText(this.segmentNames[i], 0, -(radius + this.ringWidth / 2));
            angle = this.segmentAngles[i] / 2;
        }
        this.context.restore();

    }

    drawRing(radius, angle) {
        this.context.save();
        this.context.rotate(-(Math.PI / 2 + Rad(this.segmentAngles[0] / 2)) + Rad(angle));
        this.drawRingBackground(radius);
        this.drawRingLine(radius);
        this.drawSegmentNames(radius);
        this.context.restore();
    }

    drawCylinders(radius) {
        this.context.beginPath();
        this.context.arc(0, 0, radius, 0, 2 * Math.PI);
        this.draw(this.lineColor, false);

        this.context.save();
        for (let i = 0; i < this.cylinder.count; i++) {
            this.context.rotate(Rad(360 / this.cylinder.count));
            this.context.beginPath();
            this.context.arc(0, -radius, 3, 0, 2 * Math.PI);
            this.draw("red", true);
            this.draw(this.lineColor, false);
        }
        this.context.restore();
    }

    drawCylinderNames(radius) {
        this.context.save();
        for (let i = 0; i < this.cylinder.count; i++) {
            this.context.beginPath();
            this.setNameFont("bold", this.ringWidth / 3, "Arial", this.lineColor);
            let number = this.cylinder.start + this.cylinder.step * i;
            this.context.fillText(this.cylinder.word + number, 0, -radius - this.ringWidth / 2);
            this.context.rotate(Rad(360 / this.cylinder.count));
        }
        this.context.restore();
    }

    drawRings(In, Out, cylinderName) {
        let singleCylinder = 360 / this.cylinder.count;
        this.drawRing(this.insideRadius, In * singleCylinder + this.cylinder.firstAngle);
        this.drawRing(this.insideRadius + this.ringWidth * 1.1, Out * singleCylinder + this.cylinder.firstAngle);

        this.context.save();
        this.context.rotate(Rad(this.cylinder.firstAngle));
        this.drawCylinders(this.insideRadius + this.ringWidth * 2.6);
        if (cylinderName)
            this.drawCylinderNames(this.insideRadius + this.ringWidth * 2.6);
        this.context.restore();
    }

    drawRose(x, y, ringIn, ringOut, cylinderName) {
        this.context.save();
        this.context.translate(x, y);
        this.drawRings(ringIn, ringOut, cylinderName);
        this.context.restore();
    }
}

//---------------
function createInput(parent, id, col, type, value) {
    let div = document.createElement("div");
    div.className = "col-" + col;
    let input = document.createElement("input");
    input.id = id;
    input.type = type;
    input.value = value
    div.append(input)
    parent.append(div);
}

function inputSegmentInfo(parent, number, segmentName, segmentAngle) {
    let div = document.createElement("div");
    div.className = "row";
    createInput(div, "nameSeg" + number, 3, "text", segmentName);
    createInput(div, "angleSeg" + number, 5, "number", segmentAngle);
    parent.append(div);
}

function setSegments(segmentNames, segmentAngles) {
    let segment = document.querySelector("#segments");
    segment.innerHTML = "";
    for (let i = 0; i < segmentAngles.length; i++) {
        inputSegmentInfo(segment, i, segmentNames[i], segmentAngles[i]);
    }
}

let canvas = document.querySelector("#canvas");
let rose = new RingRose(canvas);
let ringIn = 0, ringOut = 0;
// 绘制。
let screen = getDocumentSize();

function drawRingRose() {
    canvas.width = screen.width * 0.75;
    canvas.height = screen.height * 0.75;
    rose.insideRadius = canvas.width > canvas.height ? canvas.height / 2 : canvas.width / 2;
    rose.insideRadius -= rose.ringWidth * 3.5;
    rose.insideRadius = rose.insideRadius < 50 ? 50 : rose.insideRadius;
    rose.drawRose(canvas.width / 2, canvas.height / 2, ringIn, ringOut, true);
}

// 设置信息界面。

let ringOutName = document.querySelector("#ringOutName");
let ringInName = document.querySelector("#ringInName");
function showRingRotate(numOut, numIn){
    ringOutName.innerHTML = rose.cylinder.word + numOut;
    ringInName.innerHTML = rose.cylinder.word + numIn;
}
setSegments(rose.segmentNames, rose.segmentAngles);
showRingRotate(1,1);

drawRingRose();


document.querySelector("#changeSegCount").addEventListener("click", function () {
    let count = document.querySelector("#segCount").value;
    if (count > 3) {
        let names = ["K", "B1"];
        for (let i = 2; i < count - 1; i++) {
            names.push("A" + (i - 1));
        }
        names.push("B2");
        let angles = [];
        for (let i = 0; i < names.length; i++) {
            //angles.push("");
            angles.push(360 / count);
        }
        setSegments(names, angles);
    }
});

document.querySelector("#startDraw").addEventListener("click", function () {
    let count = document.querySelector("#segCount").value;
    if (count < 4) {
        return;
    }
    let names = [], angles = [];
    for (let i = 0; i < count; i++) {
        let temp = document.querySelector("#nameSeg" + i).value;
        names.push(temp);
        temp = document.querySelector("#angleSeg" + i).value;
        if (temp === "") {
            alert("请完成管片角度设置！");
            return;
        }
        angles.push(temp * 1);
    }
    let cylCount = document.querySelector("#cylCount").value;
    rose.cylinder.count = cylCount > 1 ? cylCount * 1 : 28;
    let cylStart = document.querySelector("#cylStart").value;
    rose.cylinder.start = cylStart >= 0 ? cylStart * 1 : 1;
    let cylStep = document.querySelector("#cylStep").value;
    rose.cylinder.step = cylStep >= 0 ? cylStep * 1 : 1;
    rose.cylinder.word = document.querySelector("#cylWord").value;
    let cylAngle = document.querySelector("#cylAngle").value;
    rose.cylinder.firstAngle = cylAngle >= 0 ? cylAngle * 1 : 0;
    rose.segmentNames = names;
    rose.segmentAngles = angles;
    ringIn = ringOut = 0;
    drawRingRose();

    showRingRotate(1, 1);
});

document.querySelector("#ringInL").addEventListener("click", function () {
    ringIn = ringIn - 1 < 0 ? rose.cylinder.count-1: ringIn - 1;
    console.log(rose.cylinder.count + " " + ringIn);
    drawRingRose();
    showRingRotate(ringOut+1, ringIn+1);
});

document.querySelector("#ringInR").addEventListener("click", function () {
    ringIn = ringIn + 1 > rose.cylinder.count -1? 0 : ringIn + 1;
    console.log(rose.cylinder.count + " " + ringIn);
    drawRingRose();
    showRingRotate(ringOut+1, ringIn+1);
});

document.querySelector("#ringOutL").addEventListener("click", function () {
    ringOut = ringOut - 1 < 0 ? rose.cylinder.count-1: ringOut - 1;
    console.log(rose.cylinder.count + " " + ringOut);
    drawRingRose();
    showRingRotate(ringOut+1, ringIn+1);
});

document.querySelector("#ringOutR").addEventListener("click", function () {
    ringOut = ringOut + 1 > rose.cylinder.count -1? 0 : ringOut + 1;
    console.log(rose.cylinder.count + " " + ringOut);
    drawRingRose();
    showRingRotate(ringOut+1, ringIn+1);
});