// varaible of which todoList to display

let displayingFileName = 'general'

const todoListsNames = JSON.parse(localStorage.getItem('navBarListings')) || [];




// event listeners

document.querySelector('.add-button').addEventListener('click', addTodo)

document.querySelector('.todoget').addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        enterFunction();
    }
})

document.querySelector('.nameNewList-js').addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        createNewList();
    }
})

document.querySelector('.fileName-js').addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        createNewList();
    }
})

  


// Displaying the popup to add a new list.

document.querySelector('.addNewList').addEventListener('click', newListPopup)

function newListPopup(){
    if(document.querySelector('.newListInfo').classList.contains('displayPopup')){
        document.querySelector('.newListInfo').classList.remove('displayPopup')
    }else{
        document.querySelector('.newListInfo').classList.add('displayPopup')
    }
}

document.querySelector('.nav-button').addEventListener('click', displayNav)

function displayNav(){

    if(document.querySelector('.nav-bar').classList.contains('displayNav')){
        document.querySelector('.nav-bar').classList.remove('displayNav')
    }else{
        document.querySelector('.nav-bar').classList.add('displayNav');
        displayTodoInNav();
    }


}


// basic functionality of the website.
 
    // displaing the todo

function renderList(){

    let dispResult = '';  
    
    todoList.forEach(function(todoObject, index){

        const { name } = todoObject;
        const { dueDate } = todoObject;

        dispResult += `<div class="css-todoDispArea">
                            <div>${name}</div> <div>${dueDate}</div> <div><button class="js-delete-button"> Delete</button></div> <input type="checkbox">
                          
                        </div>`

    })

    /* this is the for() loop the todoList.forEach() is basically doing
    
    for(let i = 0; i < todoList.length; i++){
        const todoObject = todoList[i]

        const { name } = todoObject;
        const { dueDate } = todoObject;

        dispResult += `<div class="css-todoDispArea">
                            <div>${name}</div> <div>${dueDate}</div> <div><button onclick="todoList.splice(${i}, 1); renderList();"> Delete</button></div>
                        </div>`

    } */

    document.querySelector('.todoDisplay').innerHTML = dispResult;

    document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) =>{
        deleteButton.addEventListener('click', () =>{
            todoList.splice(index, 1);
            
            localStorage.setItem(displayingFileName, JSON.stringify(todoList));

            renderList();
        })
    })
}




    // adding a todo 

let todoList = JSON.parse(localStorage.getItem(displayingFileName)) || []

function addTodo(){

    if(document.querySelector('.todoget').value === ''){
        alert(`Add Todo.\n\nThe field is empty!`)
        return;
    }
    

    todoList.push({
        name: document.querySelector('.todoget').value,
        dueDate: document.querySelector('.todoDate').value  
    }) 
    
    renderList();

    document.querySelector('.todoget').value = null;
    document.querySelector('.todoDate').value = null;  

    localStorage.setItem(displayingFileName, JSON.stringify(todoList))
}


 
function enterFunction(){
    if(event.key === 'Enter'){
        addTodo()
    }
}

//diplaying new todo list name in the nav bar

document.querySelector('.saveBtn').addEventListener('click', createNewList)

function createNewList(){

    if(document.querySelector('.nameNewList-js').value === '' || document.querySelector('.fileName-js').value === "" ){
        alert('Input Field(s) are empty!')
        return;
    }


    todoListsNames.push({
        todoName : document.querySelector('.nameNewList-js').value,
        localSave : document.querySelector('.fileName-js').value
    })



    displayTodoInNav();

    document.querySelector('.newListInfo').classList.remove('displayPopup');
    document.querySelector('.nameNewList-js').value = null;
    document.querySelector('.fileName-js').value = null;
}

function displayTodoInNav(){
    let navDisplaying = '';

    todoListsNames.forEach((newTodoObject, index) =>{  // index is for a deleting the current todoList 
        const { todoName } = newTodoObject;

        navDisplaying += `<div class="navTodoListings"><div class="todoName-InNavBar">${todoName}</div> <div class="optionsBtn-container"><svg class="threeDots"  height="24" viewBox="0 0 24 24" width="24"  style="display: block; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg> <button class="todoListing-DeleteBtn">Remove</button></div></div>`;

        
    })

    localStorage.setItem('navBarListings', JSON.stringify(todoListsNames));

    document.querySelector('.nav-bar').innerHTML = navDisplaying;

    document.querySelectorAll('.todoName-InNavBar').forEach((navListing, index) =>{


            navListing.addEventListener('click', () =>{

                todoList = [];

                let currentClickedTodo = todoListsNames[index];

                const { localSave } = currentClickedTodo;

                const { todoName } = currentClickedTodo;

                document.querySelector('.newListInfo').classList.remove('displayPopup');
                
                document.querySelector('.nav-bar').classList.remove('displayNav');
                
                document.querySelector('.currentTodoName').innerHTML =  todoName;

                displayingFileName = localSave;

                dispResult = '';

                todoList = JSON.parse(localStorage.getItem(displayingFileName)) || [];

                renderList();

               
        })
    })

    document.querySelectorAll('.optionsBtn-container').forEach((optnBtn, index) => {

        optnBtn.addEventListener('click', () =>{
            const n = 2;

            if(optnBtn.querySelector(':nth-child('+n+')').classList.contains('displayingTodoListing-DeleteBtn')){
                optnBtn.querySelector(':nth-child('+n+')').classList.remove('displayingTodoListing-DeleteBtn')
            }else{
                optnBtn.querySelector(':nth-child('+n+')').classList.add('displayingTodoListing-DeleteBtn')
            }
        })

    })


    document.querySelectorAll('.todoListing-DeleteBtn').forEach((deletingTodos, index) =>{

        deletingTodos.addEventListener('click', () =>{
            todoListsNames.splice(index, 1);

            localStorage.setItem('navBarListings', JSON.stringify(todoListsNames));

            displayTodoInNav();

        })
        
        
    })
}


renderList();







