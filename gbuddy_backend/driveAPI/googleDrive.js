const { google } = require('googleapis');
const https = require('https');
require('dotenv').config();

const credentials = {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universal_domain: process.env.UNIVERSAL_DOMAIN
};

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive'],
    clientOptions: {
        crypto: { useOpenSSL: false },
        timeout: 10000, // 10 seconds timeout
        retry: true,    // Enable retries
        retryConfig: {
            retries: 3,
            factor: 2,
            minTimeout: 1000,
            maxTimeout: 10000
        }
    }
});

const driveService = google.drive({ 
    version: 'v3', 
    auth,
    timeout: 10000
});

module.exports = driveService;
