'use strict';

// Import dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

// Environment variables
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

// App setup
const app = express();

// Security middleware
app.use(helmet());

// Structured logging middleware
app.use(morgan('combined'));

// Root Endpoint - async route
app.get('/', async (req, res, next) => {
  try {
    const message = '🚀 (-: Hello FS2025 DevOps Course! :-) 🚀';
    res.status(200).json({
      status: 'success',
      message,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
    timestamp: new Date().toISOString(),
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error(`❌ ${err.stack}`);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

// Start the server
const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log('🛑 Initiating graceful shutdown...');
  server.close(() => {
    console.log('👋 Server stopped gracefully');
    process.exit(0);
  });

  // Forceful shutdown after 5s
  setTimeout(() => {
    console.error('❗ Forceful shutdown after timeout');
    process.exit(1);
  }, 5000);
};

// Signal handling for graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
