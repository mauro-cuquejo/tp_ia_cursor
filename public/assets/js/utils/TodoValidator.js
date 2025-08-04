/**
 * TodoValidator class - handles validation logic for todo items
 */
export class TodoValidator {
    static MIN_LENGTH = 1;
    static MAX_LENGTH = 100;

    /**
     * Validate todo text
     * @param {string} text - The text to validate
     * @returns {Object} - Validation result with isValid and error properties
     */
    static validateText(text) {
        const trimmedText = text.trim();

        if (!trimmedText) {
            return {
                isValid: false,
                error: 'Please enter a task!'
            };
        }

        if (trimmedText.length > this.MAX_LENGTH) {
            return {
                isValid: false,
                error: `Task is too long! Maximum ${this.MAX_LENGTH} characters.`
            };
        }

        if (trimmedText.length < this.MIN_LENGTH) {
            return {
                isValid: false,
                error: 'Task must have at least one character.'
            };
        }

        return {
            isValid: true,
            error: null
        };
    }

    /**
     * Validate todo ID
     * @param {number} id - The ID to validate
     * @returns {Object} - Validation result
     */
    static validateId(id) {
        if (!id || typeof id !== 'number' || id <= 0) {
            return {
                isValid: false,
                error: 'Invalid todo ID'
            };
        }

        return {
            isValid: true,
            error: null
        };
    }

    /**
     * Validate todo object structure
     * @param {Object} todo - The todo object to validate
     * @returns {Object} - Validation result
     */
    static validateTodoObject(todo) {
        if (!todo || typeof todo !== 'object') {
            return {
                isValid: false,
                error: 'Invalid todo object'
            };
        }

        const requiredFields = ['id', 'text', 'completed', 'createdAt'];
        for (const field of requiredFields) {
            if (!(field in todo)) {
                return {
                    isValid: false,
                    error: `Missing required field: ${field}`
                };
            }
        }

        // Validate individual fields
        const textValidation = this.validateText(todo.text);
        if (!textValidation.isValid) {
            return textValidation;
        }

        const idValidation = this.validateId(todo.id);
        if (!idValidation.isValid) {
            return idValidation;
        }

        if (typeof todo.completed !== 'boolean') {
            return {
                isValid: false,
                error: 'Completed field must be a boolean'
            };
        }

        if (typeof todo.createdAt !== 'string' || !this.isValidDate(todo.createdAt)) {
            return {
                isValid: false,
                error: 'Invalid createdAt date'
            };
        }

        return {
            isValid: true,
            error: null
        };
    }

    /**
     * Check if a date string is valid
     * @param {string} dateString - The date string to validate
     * @returns {boolean} - True if the date is valid
     */
    static isValidDate(dateString) {
        const date = new Date(dateString);
        return date.toString() !== 'Invalid Date';
    }

    /**
     * Sanitize text input
     * @param {string} text - The text to sanitize
     * @returns {string} - Sanitized text
     */
    static sanitizeText(text) {
        if (typeof text !== 'string') {
            return '';
        }
        return text.trim();
    }

    /**
     * Check if text contains only whitespace
     * @param {string} text - The text to check
     * @returns {boolean} - True if text contains only whitespace
     */
    static isWhitespaceOnly(text) {
        return text.trim().length === 0;
    }
}