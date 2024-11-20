const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS
app.use(cors());

// Serve static files with correct MIME types
app.use(express.static(path.join(__dirname, 'src'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html');
        }
    }
}));

// Specific routes for components
app.get('/components/*', (req, res) => {
    const filePath = path.join(__dirname, 'src', req.path);
    console.log('Requesting component:', filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).send('Component not found');
        }
    });
});

// Handle all other routes
app.get('*', (req, res) => {
    // Log the requested path
    console.log('Requested path:', req.path);
    
    if (req.path === '/') {
        res.sendFile(path.join(__dirname, 'src', 'index.html'));
    } else if (req.path.endsWith('.html')) {
        res.sendFile(path.join(__dirname, 'src', req.path));
    } else {
        res.sendFile(path.join(__dirname, 'src', 'index.html'));
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server root directory: ${__dirname}`);
    // Log the important paths
    console.log('Static files path:', path.join(__dirname, 'src'));
    console.log('Components path:', path.join(__dirname, 'src', 'components'));
}); 