const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files (our frontend)
app.use(express.static(path.join(__dirname)));

// Proxy endpoint
app.post('/api/chat', async (req, res) => {
    const API_URL = 'https://grow.g1wins.com/api/pricing-engine/ai/chat?public=true';
    
    try {
        console.log('Proxying request to:', API_URL);
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'MortgageChat/1.0'
            },
            body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        console.log('API Response status:', response.status);
        
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(500).json({ 
            error: 'Proxy request failed', 
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Proxy server is running' });
});

// Only listen when running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════════════════════╗
║    g1brokerAgent - AI Chat Proxy Server                ║
║                                                        ║
║   Server running at: http://localhost:${PORT}            ║
║   Open this URL in your browser to use the chat UI     ║
╚════════════════════════════════════════════════════════╝
        `);
    });
}

// Export for Vercel serverless
module.exports = app;