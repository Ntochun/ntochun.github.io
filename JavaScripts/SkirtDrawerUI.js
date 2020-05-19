let container = document.querySelector("#container");
let draw = document.querySelector("#draw");
let result = document.querySelector("#result");
let back = document.querySelector("#back");
let temp = document.querySelector("#temp");
let color = document.querySelector("color");

let red = document.querySelector("#red");
let green = document.querySelector("#green");
let blue = document.querySelector("#blue");

let value= document.querySelector("#color_value");
red.addEventListener("change",function () {
    value.innerHTML = "red:" + red.value;
});