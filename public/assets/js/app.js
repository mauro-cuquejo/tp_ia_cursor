/**
 * Main application entry point
 * Initializes the TodoList application when DOM is loaded
 */
import { TodoList } from './services/TodoList.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Create and initialize the TodoList application
        const todoApp = new TodoList();

        // Make it available globally for debugging (optional)
        window.todoApp = todoApp;

        console.log('Todo List application initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Todo List application:', error);

        // Show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc3545;
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 10000;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <h3>Application Error</h3>
            <p>Failed to initialize the Todo List application.</p>
            <p>Please refresh the page or check the console for details.</p>
        `;
        document.body.appendChild(errorDiv);
    }
});