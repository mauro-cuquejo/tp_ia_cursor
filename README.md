# Todo List Application

A modern, modular Todo List application built with Node.js, Express, and vanilla JavaScript. Features a clean, responsive design with local storage persistence and comprehensive unit testing.

## 🚀 Features

- **Add, complete, and delete tasks**
- **Local storage persistence**
- **Real-time statistics**
- **Responsive design**
- **Input validation**
- **User notifications**
- **Modular architecture**
- **Comprehensive unit testing**

## 📁 Project Structure

```
tp_ia_cursor/
├── index.js                        # Node.js server
├── package.json                    # Project configuration
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── tests/                          # Unit tests
│   ├── setup.js                    # Jest setup configuration
│   ├── TodoList.test.js            # TodoList class tests
│   └── README.md                   # Test documentation
└── public/                         # Frontend assets
    ├── pages/                      # HTML pages
    │   └── index.html              # Main application page
    └── assets/                     # Static resources
        ├── css/                    # Stylesheets
        │   └── style.css           # Main application styles
        └── js/                     # JavaScript modules
            ├── app.js              # Application entry point
            ├── models/             # Data models
            │   └── TodoItem.js     # Individual todo item class
            ├── services/           # Business logic services
            │   ├── TodoList.js     # Main application controller
            │   └── TodoStorage.js  # Local storage service
            ├── ui/                 # User interface components
            │   ├── TodoRenderer.js # DOM rendering component
            │   └── NotificationManager.js # Notification system
            └── utils/              # Utility functions
                └── TodoValidator.js # Input validation utilities
```

## 🏗️ Architecture

The application follows a modular architecture with clear separation of concerns:

### **Models** (`assets/js/models/`)
- **TodoItem.js**: Represents individual todo items with properties and methods

### **Services** (`assets/js/services/`)
- **TodoList.js**: Main application controller that orchestrates all operations
- **TodoStorage.js**: Handles localStorage operations for data persistence

### **UI Components** (`assets/js/ui/`)
- **TodoRenderer.js**: Manages DOM rendering and UI updates
- **NotificationManager.js**: Handles user notifications and feedback

### **Utilities** (`assets/js/utils/`)
- **TodoValidator.js**: Provides input validation and data sanitization

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tp_ia_cursor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📜 Available Scripts

- **`npm start`**: Start the production server
- **`npm run dev`**: Start the development server with auto-reload
- **`npm test`**: Run all unit tests
- **`npm run test:watch`**: Run tests in watch mode

## 🧪 Testing

The project includes comprehensive unit tests using Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Structure
- **`tests/setup.js`**: Jest configuration and DOM environment setup
- **`tests/TodoList.test.js`**: Unit tests for the TodoList class
- **`tests/README.md`**: Detailed testing documentation

## 🎨 Features in Detail

### **Task Management**
- Add new tasks with validation
- Mark tasks as complete/incomplete
- Delete individual tasks
- Clear all tasks or completed tasks only

### **Data Persistence**
- Automatic saving to localStorage
- Data recovery on page reload
- Export/import functionality

### **User Experience**
- Real-time task statistics
- Responsive design for all devices
- Smooth animations and transitions
- Input validation with user feedback

### **Input Validation**
- Empty input prevention
- Maximum length validation (100 characters)
- Whitespace handling
- Data sanitization

## 🔧 Technical Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Testing**: Jest, jsdom
- **Architecture**: Modular ES6 modules
- **Storage**: Browser localStorage
- **Styling**: Custom CSS with responsive design

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] Add task categories/tags
- [ ] Implement task priority levels
- [ ] Add due dates and reminders
- [ ] Cloud synchronization
- [ ] Dark mode theme
- [ ] Keyboard shortcuts
- [ ] Drag and drop reordering

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Built with ❤️ using modern web technologies**