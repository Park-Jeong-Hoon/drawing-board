const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("color");
const modeBtn = document.querySelector(".btns .mode");
const saveBtn = document.querySelector(".btns .save");
const thick = document.querySelector("#thick")

//canvas 가로 세로 길이
canvas.width = 1200;
canvas.height = 600;

const FST_COLOR = "black"; //초기 색상

const COLOR_ARR = Array.from(colors);
const SELECTED = "selected-color";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); //투명 배경색을 막기 위해서

ctx.strokeStyle = FST_COLOR; //그리기 색
ctx.fillStyle = FST_COLOR;   //채우기 색

ctx.lineWidth = 5.0; //선의 굵기

COLOR_ARR.forEach(color => {
    if(color.style.backgroundColor === FST_COLOR) {
        color.classList.add(SELECTED);
    }
});

let isdraw = false; //마우스가 눌리고 있는 상태인지의 여부
let isfill = false; //채우기 모드인지를 체크

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

function selectColor(event) { //색을 고르는 이벤트 핸들러 함수
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color; //그리기 색상
    ctx.fillStyle = color;   //채우기 색상    <-- 둘 다 모두 적용
    COLOR_ARR.forEach(color => color.classList.remove(SELECTED))
    event.target.classList.add(SELECTED); //선택된 색의 테두리부분 표시
}

function onModeClick() {
    if(isfill === false) { //isfill이 false 즉, 그리기 모드이면
        isfill = true; //isfill을 true로 하여 채우기 모드로 설정
        modeBtn.innerText = "그리기";
    } else { //채우기 모드인 상태이면
        isfill = false; //isfill을 false로 하여 채우기 모드를 해제
        modeBtn.innerText = "채우기";
    }
}

function startFilling() {
    if(isfill) { //채우기가 true면 화면을 가득 채움
        ctx.fillRect(0, 0, canvas.width, canvas.height) //캔버스 크기 만큼 채워줌
    }
}

function onSaveClick() { //이미지 파일로 저장
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = "Mypainting"; //파일명
    link.click();
}

function onThickClick(event) {
    const size = event.target.value;  //range인풋의 값으로 선의 굵기 결정
    ctx.lineWidth = size;
}
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("click", startFilling);
}

COLOR_ARR.forEach(color => color.addEventListener("click", selectColor)); //클래스명이 color인 모든 요소들을 배열로 가져와 각 요소에 이벤트리스너 적용

modeBtn.addEventListener("click", onModeClick);

saveBtn.addEventListener("click", onSaveClick);

thick.addEventListener("input", onThickClick);