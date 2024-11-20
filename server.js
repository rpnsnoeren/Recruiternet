const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, 'src')));

// Set correct MIME types
app.use((req, res, next) => {
    const ext = path.extname(req.url);
    switch (ext) {
        case '.js':
            res.type('application/javascript');
            break;
        case '.css':
            res.type('text/css');
            break;
        case '.html':
            res.type('text/html');
            break;
    }
    next();
});

// Handle component requests
app.get('/components/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', req.path));
});

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server root directory: ${__dirname}`);
}); 