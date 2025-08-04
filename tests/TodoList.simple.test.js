/**
 * Simplified Jest unit tests for TodoList class
 * Testing the addTodo function and related functionality
 */

// Create a test environment
beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
        <div class="container">
            <h1>Todo List</h1>
            <div class="input-section">
                <input type="text" id="todoInput" placeholder="Enter a new task..." maxlength="100">
                <button id="addButton">Add Task</button>
            </div>
            <div class="todo-list-container">
                <ul id="todoList"></ul>
            </div>
            <div class="stats">
                <span id="totalTasks">Total: 0</span>
                <span id="completedTasks">Completed: 0</span>
            </div>
        </div>
    `;

    // Reset localStorage mock
    localStorage.clear();
    localStorage.getItem.mockReturnValue(null);
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();
});

// Simple TodoList class for testing
class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.init();
    }

    init() {
        this.todoInput = document.getElementById('todoInput');
        this.addButton = document.getElementById('addButton');
        this.todoList = document.getElementById('todoList');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');

        this.bindEvents();
        this.renderTodos();
        this.updateStats();
    }

    bindEvents() {
        // Add task button click
        this.addButton.addEventListener('click', () => this.addTodo());

        // Enter key press in input
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();

        if (text === '') {
            this.showNotification('Please enter a task!', 'error');
            return;
        }

        if (text.length > 100) {
            this.showNotification('Task is too long! Maximum 100 characters.', 'error');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();

        // Clear input and focus
        this.todoInput.value = '';
        this.todoInput.focus();

        this.showNotification('Task added successfully!', 'success');
    }

    renderTodos() {
        this.todoList.innerHTML = '';

        if (this.todos.length === 0) {
            this.todoList.innerHTML = `
                <li style="text-align: center; color: #6c757d; font-style: italic; padding: 20px;">
                    No tasks yet. Add your first task above!
                </li>
            `;
            return;
        }

        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" title="Delete task">×</button>
            `;

            this.todoList.appendChild(li);
        });
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;

        this.totalTasks.textContent = `Total: ${total}`;
        this.completedTasks.textContent = `Completed: ${completed}`;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Simplified notification for testing
        console.log(`${type}: ${message}`);
    }
}

describe('TodoList - addTodo Function (Simplified)', () => {
    let todoList;

    beforeEach(() => {
        // Create a new instance
        todoList = new TodoList();
    });

    describe('Adding a new todo', () => {
        test('should add a valid todo to the list', () => {
            // Arrange
            const todoText = 'Test todo item';
            todoList.todoInput.value = todoText;

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todos).toHaveLength(1);
            expect(todoList.todos[0].text).toBe(todoText);
            expect(todoList.todos[0].completed).toBe(false);
            expect(todoList.todos[0].id).toBeDefined();
            expect(todoList.todos[0].createdAt).toBeDefined();
        });

        test('should clear input field after adding todo', () => {
            // Arrange
            const todoText = 'Test todo item';
            todoList.todoInput.value = todoText;

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todoInput.value).toBe('');
        });

        test('should save todos to localStorage after adding', () => {
            // Arrange
            const todoText = 'Test todo item';
            todoList.todoInput.value = todoText;

            // Act
            todoList.addTodo();

            // Assert
            expect(localStorage.setItem).toHaveBeenCalledWith('todos', expect.any(String));

            // Verify the saved data
            const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1]);
            expect(savedData).toHaveLength(1);
            expect(savedData[0].text).toBe(todoText);
        });

        test('should update statistics after adding todo', () => {
            // Arrange
            const todoText = 'Test todo item';
            todoList.todoInput.value = todoText;

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.totalTasks.textContent).toBe('Total: 1');
            expect(todoList.completedTasks.textContent).toBe('Completed: 0');
        });
    });

    describe('Handling empty input', () => {
        test('should not add todo when input is empty', () => {
            // Arrange
            todoList.todoInput.value = '';

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todos).toHaveLength(0);
        });

        test('should not add todo when input contains only whitespace', () => {
            // Arrange
            todoList.todoInput.value = '   ';

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todos).toHaveLength(0);
        });
    });

    describe('Input validation', () => {
        test('should not add todo when input exceeds 100 characters', () => {
            // Arrange
            const longText = 'a'.repeat(101);
            todoList.todoInput.value = longText;

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todos).toHaveLength(0);
        });

        test('should trim whitespace from input', () => {
            // Arrange
            const todoText = '  Test todo with spaces  ';
            todoList.todoInput.value = todoText;

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todos).toHaveLength(1);
            expect(todoList.todos[0].text).toBe('Test todo with spaces');
        });
    });
});