"use strict";

const inputAdd = document.querySelector('.input_add');
const buttonAdd = document.querySelector('.button_add');
const ulTasks = document.querySelector('.allTasks');
const buttonDeleteAll = document.querySelector('.deleteAllTasks');

const buttonAllTasks = document.getElementById('button_allTasks');
const buttonOutTasks = document.getElementById('button_outstandingTasks');
const buttonComplTasks = document.getElementById('button_completedTasks');

const finishTasks = JSON.parse(localStorage.getItem('todo')) || [];
displayActualTask();


inputAdd.addEventListener("keydown", function(){
    if (event.keyCode === 13 || event.key === 'Enter') {
        if (!inputAdd.value) return;
        createTask();
        updateLocal();
        displayActualTask();
        inputAdd.value = '';
    }
});

buttonAdd.addEventListener('click', function(){
    if (!inputAdd.value) return;
    createTask();
    updateLocal();
    displayActualTask();
    inputAdd.value = '';
});


function randomNumberId() {
    return Math.random();
};

function createTask() {
    let newTask = {
        contant: inputAdd.value,
        check: false,
        edit: false,
        id: randomNumberId(),
    };
    finishTasks.push(newTask);
};


function updateLocal() {
    localStorage.setItem('todo', JSON.stringify(finishTasks));
};


function displayActualTask(){
    ulTasks.innerHTML = '';

    if (finishTasks.length > 0) {
        
        if (document.querySelector(".classAllTask")) {

            finishTasks.map(function(item){
                ulTasks.innerHTML += addTask(item);
            });
    
        } else if (document.querySelector(".classOutTask")) {
            
            let outstandingTasks = finishTasks.filter( elem => elem.check == false);
            outstandingTasks.map(function(item){
                ulTasks.innerHTML += addTask(item);
            });
            
        } else if (document.querySelector(".classComplTask")) {
    
            let completedTasks = finishTasks.filter( elem => elem.check == true) ;
            completedTasks.map(function(item){
                ulTasks.innerHTML += addTask(item);
            });
            
        }

    } else ulTasks.innerHTML = '??????, ??????-???? ?????????? ???? ??????';

    
}


function addTask(item) {
    return `
        <div class="task ${item.check ? 'task_active' : ''}" id="${item.id}">
            <div class="task_text ${item.check ? 'text_line' : ''}">${item.contant}</div>
            <div class="task_input&button">
                <button class="button_redact" onclick="clickRedact(${item.id})">????????????????</button>
                <input type="checkbox" class="checkbox" ${item.check ? 'checked' : ''} onclick="clickCheckbox(${item.id})">
                <button class="button_delete" onclick="clickButtonDelete(${item.id})">??????????????</button>
            </div>
        </div>
    `
};

function clickRedact(idEl) {
    let searchItem = finishTasks.find(item => item.id == idEl);
    
    document.getElementById(idEl).innerHTML = `
        <div class="task_text"><input autofocus type="text" class="inputNewValue" value='${searchItem.contant}' onchange='saveValue(${searchItem.id}, this.value)'></div>
        <div class="task_input&button">
            <button class="button_save" onclick="saveValue(${searchItem.id})">??????????????????</button>
            <button class="button_delete" onclick="clickButtonDelete(${searchItem.id})">??????????????</button>
        </div>
    `;
    
}

function saveValue(idEl, newValue) {
    let searchItem = finishTasks.find(item => item.id == idEl);
    let index = finishTasks.indexOf(searchItem);

    if (newValue) {
        finishTasks[index].contant = newValue;
    };

    document.getElementById(idEl).innerHTML = `
        <div class="task_text ${searchItem.check ? 'text_line' : ''}">${searchItem.contant}</div>
        <div class="task_input&button">
            <button class="button_redact" onclick="clickRedact(${searchItem.id})">????????????????</button>
            <input type="checkbox" class="checkbox" ${searchItem.check ? 'checked' : ''} onclick="clickCheckbox(${searchItem.id})">
            <button class="button_delete" onclick="clickButtonDelete(${searchItem.id})">??????????????</button>
        </div>
    ` 
    updateLocal();
}


function clickCheckbox(idEl){
    let searchItem = finishTasks.find(item => item.id == idEl);
    let index = finishTasks.indexOf(searchItem);
    finishTasks[index].check = !finishTasks[index].check;
    updateLocal();
    displayActualTask();
};


function clickButtonDelete(idEl){
    let searchItem = finishTasks.find(item => item.id == idEl);
    let index = finishTasks.indexOf(searchItem);
    finishTasks.splice(index, 1);
    updateLocal();
    displayActualTask();
};


buttonDeleteAll.onclick = function(){
    finishTasks = [];
    updateLocal();
    buttonAllTasks.classList.add("classAllTask", "activClass");
    buttonOutTasks.classList.remove("classOutTask", "activClass");
    buttonComplTasks.classList.remove("classComplTask", "activClass");
    displayActualTask();
};


buttonAllTasks.onclick = function(){
    buttonAllTasks.classList.add("classAllTask", "activClass");
    buttonOutTasks.classList.remove("classOutTask", "activClass");
    buttonComplTasks.classList.remove("classComplTask", "activClass");
    displayActualTask();
};

buttonOutTasks.onclick = function outTasks(){
    buttonAllTasks.classList.remove("classAllTask", "activClass");
    buttonOutTasks.classList.add("classOutTask", "activClass");
    buttonComplTasks.classList.remove("classComplTask", "activClass");
    displayActualTask();
};

buttonComplTasks.onclick = function ComplTasks(){
    buttonAllTasks.classList.remove("classAllTask", "activClass");
    buttonOutTasks.classList.remove("classOutTask", "activClass");
    buttonComplTasks.classList.add("classComplTask", "activClass");
    displayActualTask();
};

