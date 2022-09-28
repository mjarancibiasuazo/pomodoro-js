
//Almacenamos las tareas
const tasks = [];

//Cuenta regresiva
let time = 0;

//set interval(nos permite ejecutar un pedazo de código cada determinado tiempo)
let timer = null;

//5 min de descanso
let timerBreak = null;

//Inicilización en 0 tarea ctual que se esta ejecutando.
let current = null;

//REFERENCIA A LOS ELEMENTOS HTML

//Botón enviar
const bAdd = document.querySelector('#bAdd');
//Botón Input Tareas
const itTask = document.querySelector('#itTask');
//Formulario
const form = document.querySelector('#form');

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
        completed: false
    };
    //lo agregamos al arreglo
    tasks.unshift(newTask);

//El método unshift() agrega uno o más elementos al 
//inicio del array, y devuelve la nueva longitud del array.
}


//FUNCIÓN QUE TOMA CADA UNO DE LOS ELEMENTOS DE LAS TAREAS 
//Y LAS INSERTA EN UN HTML DE UN CONTENEDOR

function renderTask(){
    //El map(); regeresa un arreglo de strings
    const html = tasks.map(task => {

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
}



