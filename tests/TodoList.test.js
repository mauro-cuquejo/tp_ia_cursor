/**
 * Jest unit tests for TodoList class
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

// TodoList class for testing (extracted from the actual implementation)
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

        // Input focus for better UX
        this.todoInput.addEventListener('focus', () => {
            this.todoInput.style.borderColor = '#667eea';
        });

        this.todoInput.addEventListener('blur', () => {
            this.todoInput.style.borderColor = '#e1e5e9';
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

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
        }
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index > -1) {
            this.todos.splice(index, 1);
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification('Task deleted!', 'info');
        }
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

            // Add event listeners
            const checkbox = li.querySelector('.todo-checkbox');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

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

describe('TodoList - addTodo Function', () => {
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

        test('should generate unique IDs for each todo', () => {
            // Arrange
            todoList.todoInput.value = 'First todo';
            todoList.addTodo();

            todoList.todoInput.value = 'Second todo';
            todoList.addTodo();

            // Assert
            expect(todoList.todos).toHaveLength(2);
            expect(todoList.todos[0].id).not.toBe(todoList.todos[1].id);
        });

        test('should handle todo with maximum length (100 characters)', () => {
            // Arrange
            const longText = 'a'.repeat(100);
            todoList.todoInput.value = longText;

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todos).toHaveLength(1);
            expect(todoList.todos[0].text).toBe(longText);
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

        test('should not add todo when input contains only tabs', () => {
            // Arrange
            todoList.todoInput.value = '\t\t\t';

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todos).toHaveLength(0);
        });

        test('should not add todo when input contains only newlines', () => {
            // Arrange
            todoList.todoInput.value = '\n\n\n';

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

    describe('Todo object structure', () => {
        test('should create todo with correct properties', () => {
            // Arrange
            const todoText = 'Test todo';
            todoList.todoInput.value = todoText;

            // Act
            todoList.addTodo();

            // Assert
            const todo = todoList.todos[0];
            expect(todo).toHaveProperty('id');
            expect(todo).toHaveProperty('text');
            expect(todo).toHaveProperty('completed');
            expect(todo).toHaveProperty('createdAt');

            expect(typeof todo.id).toBe('number');
            expect(typeof todo.text).toBe('string');
            expect(typeof todo.completed).toBe('boolean');
            expect(typeof todo.createdAt).toBe('string');
        });

        test('should set completed property to false for new todos', () => {
            // Arrange
            const todoText = 'Test todo';
            todoList.todoInput.value = todoText;

            // Act
            todoList.addTodo();

            // Assert
            expect(todoList.todos[0].completed).toBe(false);
        });

        test('should set createdAt to valid ISO string', () => {
            // Arrange
            const todoText = 'Test todo';
            todoList.todoInput.value = todoText;

            // Act
            todoList.addTodo();

            // Assert
            const createdAt = new Date(todoList.todos[0].createdAt);
            expect(createdAt.toString()).not.toBe('Invalid Date');
        });
    });

    describe('Multiple todos', () => {
        test('should add multiple todos correctly', () => {
            // Arrange & Act
            const todos = ['First todo', 'Second todo', 'Third todo'];

            todos.forEach(todoText => {
                todoList.todoInput.value = todoText;
                todoList.addTodo();
            });

            // Assert
            expect(todoList.todos).toHaveLength(3);
            expect(todoList.todos[0].text).toBe('First todo');
            expect(todoList.todos[1].text).toBe('Second todo');
            expect(todoList.todos[2].text).toBe('Third todo');
        });

        test('should update statistics correctly for multiple todos', () => {
            // Arrange & Act
            const todos = ['First todo', 'Second todo', 'Third todo'];

            todos.forEach(todoText => {
                todoList.todoInput.value = todoText;
                todoList.addTodo();
            });

            // Assert
            expect(todoList.totalTasks.textContent).toBe('Total: 3');
            expect(todoList.completedTasks.textContent).toBe('Completed: 0');
        });
    });
});