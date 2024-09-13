const axios = require('axios');

const apiKey = 'cpISHHWMpZgFSqg5yg1R8Kqp4zCf2Jb9';
const externalUserId = 'raj';
const query = 'can you make it little simple';

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
async function submitQuery(sessionId) {
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

// Main function to execute the flow
async function main() {
  try {
    const sessionId = await createChatSession();
    const queryResponse = await submitQuery(sessionId);
    console.log('Query Response:', queryResponse);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();
