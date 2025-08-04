/**
 * TodoItem class - represents a single todo item
 */
export class TodoItem {
    constructor(text, id = null) {
        this.id = id || Date.now();
        this.text = text;
        this.completed = false;
        this.createdAt = new Date().toISOString();
    }

    /**
     * Toggle the completion status of the todo item
     */
    toggle() {
        this.completed = !this.completed;
        return this.completed;
    }

    /**
     * Mark the todo item as completed
     */
    complete() {
        this.completed = true;
    }

    /**
     * Mark the todo item as incomplete
     */
    uncomplete() {
        this.completed = false;
    }

    /**
     * Update the text of the todo item
     * @param {string} newText - The new text for the todo item
     */
    updateText(newText) {
        this.text = newText.trim();
    }

    /**
     * Check if the todo item is valid
     * @returns {boolean} - True if the todo item is valid
     */
    isValid() {
        return this.text && this.text.trim().length > 0 && this.text.length <= 100;
    }

    /**
     * Convert the todo item to a plain object for storage
     * @returns {Object} - Plain object representation
     */
    toJSON() {
        return {
            id: this.id,
            text: this.text,
            completed: this.completed,
            createdAt: this.createdAt
        };
    }

    /**
     * Create a TodoItem from a plain object
     * @param {Object} data - Plain object data
     * @returns {TodoItem} - New TodoItem instance
     */
    static fromJSON(data) {
        const todoItem = new TodoItem(data.text, data.id);
        todoItem.completed = data.completed;
        todoItem.createdAt = data.createdAt;
        return todoItem;
    }
}