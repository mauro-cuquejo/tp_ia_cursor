// Jest setup file for DOM testing
// This file runs before each test file

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

// Set up the mock on both global and window objects
Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true
});

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
});

// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};