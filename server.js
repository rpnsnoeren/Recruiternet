const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('src'));

// Set correct MIME types
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.type('application/javascript');
    } else if (req.url.endsWith('.css')) {
        res.type('text/css');
    } else if (req.url.endsWith('.html')) {
        res.type('text/html');
    }
    next();
});

// Handle all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 