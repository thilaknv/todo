const task = document.querySelector("#task");
const formBut = document.querySelector("#formDiv>button");

formBut.addEventListener('click', ()=>{
    if(task.value.length == 0){
        task.style.border = "2px solid red";
    }
});