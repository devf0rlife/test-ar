const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


app.get('/runme', (req, res) => {
    res.status(200).send(`
        <html>
            <head>
                <title>Server Status</title>
            </head>
            <body>
                <h1>Server is running</h1>
                <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmo1MHpudXRnazBlY3A3a21mZ2J4czAzZ2R1NWtzanZoeTAybjdqNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UsdCejJEtzcBIkr7hY/giphy.webp" alt="GIF">
            </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
