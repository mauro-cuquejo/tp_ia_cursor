/**
 * NotificationManager class - handles notification display
 */
export class NotificationManager {
    constructor() {
        this.notificationQueue = [];
        this.isDisplaying = false;
    }

    /**
     * Show a notification
     * @param {string} message - The message to display
     * @param {string} type - The type of notification (success, error, info)
     * @param {number} duration - Duration in milliseconds (default: 3000)
     */
    show(message, type = 'info', duration = 3000) {
        const notification = this.createNotification(message, type);
        this.displayNotification(notification, duration);
    }

    /**
     * Show success notification
     * @param {string} message - The message to display
     */
    showSuccess(message) {
        this.show(message, 'success');
    }

    /**
     * Show error notification
     * @param {string} message - The message to display
     */
    showError(message) {
        this.show(message, 'error');
    }

    /**
     * Show info notification
     * @param {string} message - The message to display
     */
    showInfo(message) {
        this.show(message, 'info');
    }

    /**
     * Create notification element
     * @param {string} message - The message to display
     * @param {string} type - The type of notification
     * @returns {HTMLElement} - The notification element
     */
    createNotification(message, type) {
        // Remove existing notification
        this.removeExistingNotification();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        return notification;
    }

    /**
     * Display notification with animation
     * @param {HTMLElement} notification - The notification element
     * @param {number} duration - Duration in milliseconds
     */
    displayNotification(notification, duration) {
        document.body.appendChild(notification);

        // Auto-remove after duration
        setTimeout(() => {
            this.hideNotification(notification);
        }, duration);
    }

    /**
     * Hide notification with animation
     * @param {HTMLElement} notification - The notification element
     */
    hideNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }

    /**
     * Remove existing notification
     */
    removeExistingNotification() {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
    }

    /**
     * Clear all notifications
     */
    clearAll() {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }

    /**
     * Add CSS animations for notifications
     */
    static addAnimations() {
        if (document.querySelector('#notification-animations')) {
            return; // Already added
        }

        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}