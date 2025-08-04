/**
 * TodoStorage class - handles localStorage operations for todo persistence
 */
export class TodoStorage {
    constructor(storageKey = 'todos') {
        this.storageKey = storageKey;
    }

    /**
     * Save todos to localStorage
     * @param {Array} todos - Array of todo items
     */
    saveTodos(todos) {
        try {
            const todoData = todos.map(todo => todo.toJSON ? todo.toJSON() : todo);
            localStorage.setItem(this.storageKey, JSON.stringify(todoData));
        } catch (error) {
            console.error('Error saving todos to localStorage:', error);
        }
    }

    /**
     * Load todos from localStorage
     * @returns {Array} - Array of todo items
     */
    loadTodos() {
        try {
            const storedData = localStorage.getItem(this.storageKey);
            if (!storedData) {
                return [];
            }

            const todoData = JSON.parse(storedData);
            return todoData.map(data => {
                // Handle both TodoItem instances and plain objects
                if (data.text !== undefined) {
                    return data;
                }
                return null;
            }).filter(Boolean);
        } catch (error) {
            console.error('Error loading todos from localStorage:', error);
            return [];
        }
    }

    /**
     * Clear all todos from localStorage
     */
    clearTodos() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.error('Error clearing todos from localStorage:', error);
        }
    }

    /**
     * Get the number of stored todos
     * @returns {number} - Number of stored todos
     */
    getTodoCount() {
        const todos = this.loadTodos();
        return todos.length;
    }

    /**
     * Check if localStorage is available
     * @returns {boolean} - True if localStorage is available
     */
    isAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
}