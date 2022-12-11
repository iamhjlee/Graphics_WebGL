const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById('jsRange')
const fill = document.getElementById("fill")
const save = document.getElementById("save")

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// defualt값으로 초기화
ctx.strokeStyle = "#2c2c2c"
ctx.fillStyle = "#2c2c2c"
ctx.lineWidth =0.5;

let painting = false;
let filling = false;

function startPainting(event) {
  painting = true;
}

function stopPainting() {
  ctx.closePath();  // 하위 경로의 시작점과 연결
  painting = false;
}

function onMouseMove(event) {
  // canvas 안에서만 마우스의 움직임에 따라 좌표를 얻음(screen의 좌표는 clientX,Y참조)
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {            //마우스 이동(클릭X)지점으로 beginpath 및 해당좌표 붓 이동
    ctx.beginPath();        // 출발점을 계속 초기화
    ctx.moveTo(x, y);       // 출발점을 (x,y)로 옮김
  }else {                    //line생성
    ctx.lineTo(x, y);       // 도착점을 좌표로 옮김
    ctx.stroke();           // 그림
  }
}

handleCanvasClick = () => {
  if(filling){
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // console.log(e)
  }
}

handleCM = (e) => {
  // console.log(e)
  e.preventDefault();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);    //마우스 좌표따라 path생성
  canvas.addEventListener("mousedown", startPainting);  //painting=true, onMouseMove함수로 인해 path 생성
  canvas.addEventListener("mouseup", stopPainting);     //painting=flase
  canvas.addEventListener("mouseleave", stopPainting);  //painting=flase
  canvas.addEventListener("click",handleCanvasClick);   //paint -> fill 변경
  canvas.addEventListener("contextmenu", handleCM);     //마우스 우클릭 방지
}

if(range){
  // line width조정
  range.addEventListener("input",handleRangeChange);
}

handleRangeChange = (e) =>{
  const size = e.target.value;
  ctx.lineWidth = size;
}

// console.log(Array.from(colors));
if(colors){
  Array.from(colors).forEach(color => color.addEventListener("click",changeColor))
  fill.addEventListener("click",handleModeClick)
}

function changeColor(event) {
  const bgColor = event.target.style.backgroundColor;
  // console.log(bgColor);
  ctx.strokeStyle = bgColor;
  ctx.fillStyle=ctx.strokeStyle;
}

function handleModeClick(){
  if(filling === true) {
    filling = false;
    fill.innerText = "Fill";
  }else{
    filling = true;
    fill.innerText="Paint";
  }
}

if(save){
  save.addEventListener("click",handleSaveClick)
}

//save
handleSaveClick = () => {
  // const image = canvas.toDataURL("image/jpeg"); //jpeg로 저장
  const image = canvas.toDataURL();                //png로 저장
  const link = document.createElement("a");
  link.href = image;
  link.download = "PainJS[EXPORT]";
  // console.log(link);
  link.click();
}
