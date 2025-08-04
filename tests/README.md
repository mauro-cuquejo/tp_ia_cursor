# Todo List Tests

This directory contains Jest unit tests for the Todo List application.

## Test Structure

- `setup.js` - Jest setup file for DOM testing environment
- `TodoList.test.js` - Unit tests for the TodoList class

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## Test Coverage

### TodoList.addTodo() Function Tests

#### Adding New Todos
- ✅ Adds valid todo to the list
- ✅ Clears input field after adding
- ✅ Saves todos to localStorage
- ✅ Updates statistics correctly
- ✅ Generates unique IDs for each todo
- ✅ Handles maximum length (100 characters)

#### Empty Input Handling
- ✅ Rejects empty input
- ✅ Rejects whitespace-only input
- ✅ Rejects tab-only input
- ✅ Rejects newline-only input

#### Input Validation
- ✅ Rejects input exceeding 100 characters
- ✅ Trims whitespace from input

#### Todo Object Structure
- ✅ Creates todo with correct properties (id, text, completed, createdAt)
- ✅ Sets completed to false for new todos
- ✅ Sets valid ISO string for createdAt

#### Multiple Todos
- ✅ Adds multiple todos correctly
- ✅ Updates statistics for multiple todos

## Test Environment

The tests use:
- **Jest** as the testing framework
- **jsdom** for DOM simulation
- **localStorage** mocking for persistence testing
- **Console** mocking to reduce test noise

## Test Patterns

Each test follows the **Arrange-Act-Assert** pattern:
1. **Arrange**: Set up test data and conditions
2. **Act**: Execute the function being tested
3. **Assert**: Verify the expected outcomes

## Adding New Tests

To add new tests:

1. Create a new test file in the `tests/` directory
2. Follow the existing naming convention: `*.test.js`
3. Use descriptive test names that explain the expected behavior
4. Group related tests using `describe()` blocks
5. Use `beforeEach()` for test setup when needed

## Example Test Structure

```javascript
describe('Function Name', () => {
    beforeEach(() => {
        // Setup code
    });

    test('should do something specific', () => {
        // Arrange
        const input = 'test data';

        // Act
        const result = functionToTest(input);

        // Assert
        expect(result).toBe(expectedValue);
    });
});
```