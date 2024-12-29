document.addEventListener('DOMContentLoaded', () => {
    const todoListElement = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const newItemText = document.getElementById('new-item-text');
    const newItemDueDate = document.getElementById('new-item-due-date');

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoListElement.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = `${todo.text} (Due: ${todo.dueDate || 'No due date'})`;
            if (todo.done) {
                li.style.textDecoration = 'line-through';
            }
            const markDoneButton = document.createElement('button');
            markDoneButton.textContent = 'Mark Done';
            markDoneButton.onclick = () => markDone(index);
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeItem(index);
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editItem(index);
            li.appendChild(markDoneButton);
            li.appendChild(removeButton);
            li.appendChild(editButton);
            todoListElement.appendChild(li);
        });
    }

    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addItem(text, dueDate) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text, dueDate, done: false });
        saveTodos(todos);
        loadTodos();
    }

    function markDone(index) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[index].done = !todos[index].done;
        saveTodos(todos);
        loadTodos();
    }

    function removeItem(index) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.splice(index, 1);
        saveTodos(todos);
        loadTodos();
    }

    function editItem(index) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const newText = prompt('Edit item text:', todos[index].text);
        if (newText !== null) {
            todos[index].text = newText;
            const newDueDate = prompt('Edit due date (YYYY-MM-DD):', todos[index].dueDate);
            if (newDueDate !== null) {
                todos[index].dueDate = newDueDate;
            }
            saveTodos(todos);
            loadTodos();
        }
    }

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addItem(newItemText.value, newItemDueDate.value);
        newItemText.value = '';
        newItemDueDate.value = '';
    });

    loadTodos();
});