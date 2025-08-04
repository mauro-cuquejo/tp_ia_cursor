/**
 * TodoList class - main application controller
 * Orchestrates all todo operations and UI interactions
 */
import { TodoItem } from '../models/TodoItem.js';
import { TodoStorage } from './TodoStorage.js';
import { TodoValidator } from '../utils/TodoValidator.js';
import { TodoRenderer } from '../ui/TodoRenderer.js';
import { NotificationManager } from '../ui/NotificationManager.js';

export class TodoList {
    constructor() {
        this.todos = [];
        this.storage = new TodoStorage();
        this.renderer = new TodoRenderer();
        this.notifications = new NotificationManager();

        // DOM elements
        this.todoInput = document.getElementById('todoInput');
        this.addButton = document.getElementById('addButton');

        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Add notification animations
        NotificationManager.addAnimations();

        // Load existing todos
        this.loadTodos();

        // Bind event listeners
        this.bindEvents();

        // Render initial state
        this.render();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Add task button click
        if (this.addButton) {
            this.addButton.addEventListener('click', () => this.addTodo());
        }

        // Enter key press in input
        if (this.todoInput) {
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
    }

    /**
     * Add a new todo
     */
    addTodo() {
        if (!this.todoInput) return;

        const text = this.todoInput.value;
        const validation = TodoValidator.validateText(text);

        if (!validation.isValid) {
            this.notifications.showError(validation.error);
            return;
        }

        const todoItem = new TodoItem(text);
        this.todos.push(todoItem);

        this.saveTodos();
        this.render();

        // Clear input and focus
        this.renderer.clearInput();
        this.renderer.focusInput();

        this.notifications.showSuccess('Task added successfully!');
    }

    /**
     * Toggle todo completion status
     * @param {number} id - Todo ID
     */
    toggleTodo(id) {
        const todo = this.findTodoById(id);
        if (todo) {
            todo.toggle();
            this.saveTodos();
            this.render();
        }
    }

    /**
     * Delete a todo
     * @param {number} id - Todo ID
     */
    deleteTodo(id) {
        const index = this.findTodoIndexById(id);
        if (index > -1) {
            this.todos.splice(index, 1);
            this.saveTodos();
            this.render();
            this.notifications.showInfo('Task deleted!');
        }
    }

    /**
     * Update todo text
     * @param {number} id - Todo ID
     * @param {string} newText - New text
     */
    updateTodo(id, newText) {
        const validation = TodoValidator.validateText(newText);
        if (!validation.isValid) {
            this.notifications.showError(validation.error);
            return false;
        }

        const todo = this.findTodoById(id);
        if (todo) {
            todo.updateText(newText);
            this.saveTodos();
            this.render();
            return true;
        }
        return false;
    }

    /**
     * Find todo by ID
     * @param {number} id - Todo ID
     * @returns {TodoItem|null} - Found todo or null
     */
    findTodoById(id) {
        return this.todos.find(todo => todo.id === id) || null;
    }

    /**
     * Find todo index by ID
     * @param {number} id - Todo ID
     * @returns {number} - Index or -1 if not found
     */
    findTodoIndexById(id) {
        return this.todos.findIndex(todo => todo.id === id);
    }

    /**
     * Get all todos
     * @returns {Array} - Array of todos
     */
    getAllTodos() {
        return [...this.todos];
    }

    /**
     * Get completed todos
     * @returns {Array} - Array of completed todos
     */
    getCompletedTodos() {
        return this.todos.filter(todo => todo.completed);
    }

    /**
     * Get incomplete todos
     * @returns {Array} - Array of incomplete todos
     */
    getIncompleteTodos() {
        return this.todos.filter(todo => !todo.completed);
    }

    /**
     * Get statistics
     * @returns {Object} - Statistics object
     */
    getStats() {
        const total = this.todos.length;
        const completed = this.getCompletedTodos().length;
        const incomplete = this.getIncompleteTodos().length;

        return {
            total,
            completed,
            incomplete,
            completionRate: total > 0 ? (completed / total) * 100 : 0
        };
    }

    /**
     * Clear all todos
     */
    clearAllTodos() {
        this.todos = [];
        this.saveTodos();
        this.render();
        this.notifications.showInfo('All tasks cleared!');
    }

    /**
     * Clear completed todos
     */
    clearCompletedTodos() {
        this.todos = this.getIncompleteTodos();
        this.saveTodos();
        this.render();
        this.notifications.showInfo('Completed tasks cleared!');
    }

    /**
     * Load todos from storage
     */
    loadTodos() {
        const storedTodos = this.storage.loadTodos();
        this.todos = storedTodos.map(todoData => TodoItem.fromJSON(todoData));
    }

    /**
     * Save todos to storage
     */
    saveTodos() {
        this.storage.saveTodos(this.todos);
    }

    /**
     * Render the todo list and update UI
     */
    render() {
        // Render todos
        this.renderer.renderTodos(this.todos);

        // Add event listeners to rendered elements
        this.addEventListenersToRenderedTodos();

        // Update statistics
        const stats = this.getStats();
        this.renderer.updateStats(stats.total, stats.completed);
    }

    /**
     * Add event listeners to rendered todo elements
     */
    addEventListenersToRenderedTodos() {
        const todoElements = this.renderer.getContainer()?.querySelectorAll('.todo-item');
        if (!todoElements) return;

        todoElements.forEach(todoElement => {
            this.renderer.addEventListeners(todoElement, {
                onToggle: (id) => this.toggleTodo(id),
                onDelete: (id) => this.deleteTodo(id)
            });
        });
    }

    /**
     * Export todos to JSON
     * @returns {string} - JSON string
     */
    exportTodos() {
        return JSON.stringify(this.todos.map(todo => todo.toJSON()), null, 2);
    }

    /**
     * Import todos from JSON
     * @param {string} jsonString - JSON string
     * @returns {boolean} - Success status
     */
    importTodos(jsonString) {
        try {
            const todoData = JSON.parse(jsonString);
            if (!Array.isArray(todoData)) {
                throw new Error('Invalid format: expected array');
            }

            // Validate each todo
            for (const data of todoData) {
                const validation = TodoValidator.validateTodoObject(data);
                if (!validation.isValid) {
                    throw new Error(`Invalid todo: ${validation.error}`);
                }
            }

            this.todos = todoData.map(data => TodoItem.fromJSON(data));
            this.saveTodos();
            this.render();
            this.notifications.showSuccess('Todos imported successfully!');
            return true;
        } catch (error) {
            this.notifications.showError(`Import failed: ${error.message}`);
            return false;
        }
    }
}