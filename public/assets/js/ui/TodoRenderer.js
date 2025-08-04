/**
 * TodoRenderer class - handles DOM rendering and UI updates
 */
export class TodoRenderer {
    constructor(containerSelector = '#todoList') {
        this.container = document.querySelector(containerSelector);
        this.statsContainer = {
            total: document.querySelector('#totalTasks'),
            completed: document.querySelector('#completedTasks')
        };
    }

    /**
     * Render the todo list
     * @param {Array} todos - Array of todo items
     */
    renderTodos(todos) {
        if (!this.container) {
            console.error('Todo list container not found');
            return;
        }

        this.container.innerHTML = '';

        if (!todos || todos.length === 0) {
            this.renderEmptyState();
            return;
        }

        todos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            this.container.appendChild(todoElement);
        });
    }

    /**
     * Create a todo element
     * @param {Object} todo - Todo item object
     * @returns {HTMLElement} - The todo element
     */
    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.todoId = todo.id;

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <button class="delete-btn" title="Delete task">×</button>
        `;

        return li;
    }

    /**
     * Render empty state
     */
    renderEmptyState() {
        this.container.innerHTML = `
            <li style="text-align: center; color: #6c757d; font-style: italic; padding: 20px;">
                No tasks yet. Add your first task above!
            </li>
        `;
    }

    /**
     * Update statistics display
     * @param {number} total - Total number of todos
     * @param {number} completed - Number of completed todos
     */
    updateStats(total, completed) {
        if (this.statsContainer.total) {
            this.statsContainer.total.textContent = `Total: ${total}`;
        }
        if (this.statsContainer.completed) {
            this.statsContainer.completed.textContent = `Completed: ${completed}`;
        }
    }

    /**
     * Add event listeners to todo elements
     * @param {HTMLElement} todoElement - The todo element
     * @param {Object} callbacks - Object containing callback functions
     */
    addEventListeners(todoElement, callbacks) {
        const checkbox = todoElement.querySelector('.todo-checkbox');
        const deleteBtn = todoElement.querySelector('.delete-btn');
        const todoId = parseInt(todoElement.dataset.todoId);

        if (checkbox && callbacks.onToggle) {
            checkbox.addEventListener('change', () => callbacks.onToggle(todoId));
        }

        if (deleteBtn && callbacks.onDelete) {
            deleteBtn.addEventListener('click', () => callbacks.onDelete(todoId));
        }
    }

    /**
     * Update a specific todo element
     * @param {number} todoId - The ID of the todo to update
     * @param {Object} todo - Updated todo data
     */
    updateTodoElement(todoId, todo) {
        const todoElement = this.container.querySelector(`[data-todo-id="${todoId}"]`);
        if (todoElement) {
            todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            const checkbox = todoElement.querySelector('.todo-checkbox');
            const textSpan = todoElement.querySelector('.todo-text');

            if (checkbox) {
                checkbox.checked = todo.completed;
            }
            if (textSpan) {
                textSpan.textContent = todo.text;
            }
        }
    }

    /**
     * Remove a todo element
     * @param {number} todoId - The ID of the todo to remove
     */
    removeTodoElement(todoId) {
        const todoElement = this.container.querySelector(`[data-todo-id="${todoId}"]`);
        if (todoElement) {
            todoElement.remove();
        }
    }

    /**
     * Add a new todo element
     * @param {Object} todo - The todo to add
     * @param {Object} callbacks - Object containing callback functions
     */
    addTodoElement(todo, callbacks) {
        const todoElement = this.createTodoElement(todo);
        this.addEventListeners(todoElement, callbacks);
        this.container.appendChild(todoElement);
    }

    /**
     * Clear the todo list
     */
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get the container element
     * @returns {HTMLElement} - The container element
     */
    getContainer() {
        return this.container;
    }

    /**
     * Check if container exists
     * @returns {boolean} - True if container exists
     */
    hasContainer() {
        return !!this.container;
    }

    /**
     * Set focus to input field
     * @param {string} inputSelector - Input selector
     */
    focusInput(inputSelector = '#todoInput') {
        const input = document.querySelector(inputSelector);
        if (input) {
            input.focus();
        }
    }

    /**
     * Clear input field
     * @param {string} inputSelector - Input selector
     */
    clearInput(inputSelector = '#todoInput') {
        const input = document.querySelector(inputSelector);
        if (input) {
            input.value = '';
        }
    }
}