
//Almacenamos las tareas
const tasks = [];

//Cuenta regresiva
let time = 0;

//set interval(nos permite ejecutar un pedazo de código cada determinado tiempo)
let timer = null;

//5 min de descanso
let timerBreak = null;

//Inicilización en 0 tarea actual que se esta ejecutando.
let current = null;

//REFERENCIA A LOS ELEMENTOS HTML

//Botón enviar
const bAdd = document.querySelector('#bAdd');
//Botón Input Tareas
const itTask = document.querySelector('#itTask');
//Formulario
const form = document.querySelector('#form');

const taskName = document.querySelector("#time #taskName");

//CONTADOR EN LA PARTE SUPERIOR
renderTime();
renderTasks();


//EVENTOS
form.addEventListener('submit', e => {
    e.preventDefault();//se anula el funcionamiento nativo del form

    //Validamos si itTask es diferente a un string vacio.
    if(itTask.value != ''){
        createTask(itTask.value);//creamos tarea
        itTask.value = '';
        renderTasks();//renderizar tareas
    }

});

//FUNCIÓN DE CREAR TAREAS
function createTask(value){

    const newTask = {
        //id dinámico
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false,
    };
    //lo agregamos al arreglo
    tasks.unshift(newTask);

//El método unshift() agrega uno o más elementos al 
//inicio del array, y devuelve la nueva longitud del array.
}


//FUNCIÓN QUE TOMA CADA UNO DE LOS ELEMENTOS DE LAS TAREAS 
//Y LAS INSERTA EN UN HTML DE UN CONTENEDOR

function renderTasks(){
    //El map(); regeresa un arreglo de strings
    //convertimos en html
    const html = tasks.map((task) => {

        return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Done</span>`: `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
                <div class="title">${ task.title }</div>
            
            </div>

        
        `; 
    });

    const tasksContainer = document.querySelector("#tasks");
    //método join hace solo un string
    tasksContainer.innerHTML = html.join('');

   
    //BOTONES
    const startButtons = document.querySelectorAll('.task .start-button');
    //A cada botón le agragamos un addEventListener
    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            if(!timer){
                
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent = 'In progress...';

            }

        });
    });
}


//Calcular los 25' de la actividad principal
function startButtonHandler(id){
    time = 05;
    current = id;
    const taskIndex = tasks.findIndex(task => task.id === id);
    taskName.textContent = tasks[taskIndex].title;
    renderTime();

    //Formato de tiempo
    //setInterval me permite ejecutar una función de forma indef.
    timer = setInterval(() => {
        timerHandler(id);

    }, 1000);
}


function timerHandler(id){
    time --; //se decrementa en 1
    renderTime();//renderizamos el tiempo

    if( time == 0){
        clearInterval( timer );
        markCompleted(id);
        timer = null;
        renderTasks();
        startBreak();
        //current = null;
        //taskName.textContent = "";
        
    }
}

function startBreak(){
    time = 3;
    taskName.textContent = 'Break';
    renderTime();
    timerBreak = setInterval(() => {
        timerBreakHandler();

    }, 1000);

}

function timerBreakHandler(){
    time --; //se decrementa en 1
    renderTime();//renderizamos el tiempo

    if( time == 0){
        clearInterval( timerBreak );
        current = null;
        timerBreak = null;
        taskName.textContent = '';
        renderTasks();
        //startBreak();
    }
}

//Función que da formato a un número
function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt( time / 60 );
    const seconds = parseInt( time % 60 );

    //FORMATO
    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${ minutes }:${seconds < 10 ? "0" : ""}${seconds}`;

}

function markCompleted(id){
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}
