const { google } = require('googleapis');
require('dotenv').config();

const auth = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/drive'],
    null
);

const driveService = google.drive({ 
    version: 'v3', 
    auth,
    timeout: 15000,
    // Force using Node's native crypto instead of OpenSSL
    cryptoOptions: {
        algorithm: 'RS256',
        useNativeCrypto: true
    }
});

module.exports = driveService;
