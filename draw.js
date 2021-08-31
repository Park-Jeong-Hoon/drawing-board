const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//canvas 가로 세로 길이
canvas.width = 1200;
canvas.height = 600;

//칠하는 색
ctx.strokeStyle = "black";

//마우스가 눌리고 있는 상태인지의 여부
let isdraw = false;

function startDrawing() { //마우스가 눌리면 그리기 시작
    isdraw = true;
}

function stopDrawing() {  //마우스가 떼지면 그리기 멈춤
    isdraw = false;
}

function onMouseMove(event) { //마우스 움직일 때
    const x = event.offsetX;
    const y = event.offsetY;
    if(!isdraw) { //마우스 눌리지 않은 상태
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {      //마우스 눌린 상태
        ctx.lineTo(x, y);
        ctx.stroke(); //이거 해줘야 화면에 나타남
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
}