# Todo List Application

A beautiful and modern todo list application built with Node.js, Express, HTML, CSS, and JavaScript. This application allows users to create, manage, and track their tasks with a responsive design and smooth animations.

## Features

- ✨ **Modern UI/UX**: Beautiful gradient design with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 💾 **Local Storage**: Tasks are automatically saved to browser's local storage
- ✅ **Task Management**: Add, complete, and delete tasks
- 📊 **Statistics**: Real-time tracking of total and completed tasks
- 🔔 **Notifications**: User-friendly notifications for actions
- ⌨️ **Keyboard Support**: Press Enter to add tasks
- 🎨 **Smooth Animations**: Slide-in effects and hover animations

## Project Structure

```
todo-list/
├── package.json          # Node.js project configuration
├── index.js             # Express server file
├── public/              # Static files directory
│   ├── index.html       # Main HTML file
│   ├── style.css        # CSS styles
│   └── script.js        # JavaScript functionality
└── README.md           # Project documentation
```

## Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Adding Tasks
- Type your task in the input field
- Click the "Add Task" button or press Enter
- Tasks are automatically saved to local storage

### Managing Tasks
- **Complete a task**: Click the checkbox next to the task
- **Delete a task**: Click the "×" button on the right side of the task
- **View statistics**: See total and completed tasks at the bottom

### Features
- **Input validation**: Empty tasks and tasks longer than 100 characters are not allowed
- **Persistent storage**: Your tasks remain even after closing the browser
- **Responsive design**: Works on all screen sizes
- **Smooth animations**: Visual feedback for all interactions

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Storage**: Browser Local Storage
- **Development**: Nodemon for auto-restart during development

## Browser Support

This application works on all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Local Storage API

## Customization

You can easily customize the application by modifying:

- **Colors**: Edit the CSS variables in `style.css`
- **Animations**: Modify the keyframe animations
- **Functionality**: Extend the JavaScript class in `script.js`
- **Styling**: Update the CSS classes and selectors

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for any improvements or bug fixes.