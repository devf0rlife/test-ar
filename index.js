const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const apiKey = 'cpISHHWMpZgFSqg5yg1R8Kqp4zCf2Jb9';
const externalUserId = 'raj';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to create chat session
async function createChatSession() {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: [],
        externalUserId: externalUserId
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data.data.id; // Extract session ID
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
}

// Function to submit query
async function submitQuery(sessionId, query) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: query,
        pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
        responseMode: 'sync'
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting query:', error);
    throw error;
  }
}

// Route to handle the chat flow with query in the body
app.post('/chat', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required in the request body' });
  }

  try {
    const sessionId = await createChatSession();
    const queryResponse = await submitQuery(sessionId, query);
    res.json(queryResponse);
  } catch (error) {
    res.status(500).json({ error: 'Error processing the request' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
