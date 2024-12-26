const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

// Use the newer GoogleAuth implementation
const auth = new GoogleAuth({
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_id: process.env.CLIENT_ID
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
    projectId: process.env.PROJECT_ID
});

const driveService = google.drive({ 
    version: 'v3', 
    auth: auth.getClient()
});

module.exports = driveService;
